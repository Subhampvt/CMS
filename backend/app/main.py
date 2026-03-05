import hashlib
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from .database import primary_engine, secondary_engine, get_primary_db, get_secondary_db
from . import models, schemas

# Create all tables on startup in BOTH databases
models.PrimaryBase.metadata.create_all(bind=primary_engine)
models.SecondaryBase.metadata.create_all(bind=secondary_engine)

app = FastAPI(title="CMS Secure Backend API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)

def hash_password(password: str):
    return hashlib.sha256(password.encode()).hexdigest()

@app.get("/")
def read_root():
    return {"message": "CMS Backend Dual-Database Connected Successfully!"}

# ==========================================================
# 🧹 DATABASE SEEDER: Cleans old data & sets up test accounts
# ==========================================================
@app.post("/api/seed-database")
def seed_database(
    db: Session = Depends(get_secondary_db), 
    primary_db: Session = Depends(get_primary_db)
):
    # 1. Clear out old test data 
    primary_db.query(models.PrimaryEmployee).delete()
    db.query(models.User).delete()
    primary_db.commit()
    db.commit()

    # 2. Define the exact test users, forcing "dept1" and separating the Admin password
    test_users = [
        {"trid": "ISTRAC000", "name": "Admin User", "email": "admin@istrac.gov.in", "role": "admin", "dept": "dept1", "password": "admin123"},
        {"trid": "ISTRAC001", "name": "Chief Approver", "email": "chief@istrac.gov.in", "role": "chefcmb", "dept": "dept1", "password": "pass123"},
        {"trid": "ISTRAC002", "name": "Reviewer One", "email": "cmb1@istrac.gov.in", "role": "cmb", "dept": "dept1", "password": "pass123"},
        {"trid": "ISTRAC003", "name": "Standard Submitter", "email": "user1@istrac.gov.in", "role": "user", "dept": "dept1", "password": "pass123"}
    ]

    # 3. Inject them into BOTH databases
    for u in test_users:
        # A. Add to Official Directory (Primary DB)
        official_emp = models.PrimaryEmployee(
            tr_id=u["trid"], name=u["name"], email=u["email"], dept=u["dept"]
        )
        primary_db.add(official_emp)
        
        # B. Auto-Register them in the CMS (Secondary DB)
        cms_user = models.User(
            tr_id=u["trid"], 
            email=u["email"], 
            name=u["name"], 
            role=u["role"], 
            password_hash=hash_password(u["password"]), # Dynamically hashes the correct password
            has_root_access=(u["role"] in ["chefcmb", "admin"])
        )
        db.add(cms_user)

    # 4. Save everything
    primary_db.commit()
    db.commit()

    return {"message": "Success! Database seeded with secure Admin and standard test accounts assigned to dept1."}

# ==========================================================
# 🚀 REAL ROUTE: Register User into Secondary CMS DB
# ==========================================================
@app.post("/api/register")
def register_user(
    user: schemas.UserRegister, 
    db: Session = Depends(get_secondary_db), 
    primary_db: Session = Depends(get_primary_db)
):
    # 1. CROSS-DATABASE CHECK: Verify official employee records
    official_employee = primary_db.query(models.PrimaryEmployee).filter(models.PrimaryEmployee.tr_id == user.trid).first()
    
    if not official_employee:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, 
            detail="Registration Failed: TR ID not found in the Official Employee Directory."
        )
        
    # Verify the email provided in React matches the official email in Primary DB
    if official_employee.email.lower() != user.email.lower():
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, 
            detail="Registration Failed: Email does not match official TR ID records."
        )

    # 2. LOCAL CHECK: Verify if they already have a CMS account
    existing_user = db.query(models.User).filter(models.User.tr_id == user.trid).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="User with this TR ID is already registered in the CMS."
        )

    # 3. CREATE ACCOUNT: Save to Secondary CMS Database
    new_user = models.User(
        tr_id=user.trid,
        email=user.email,
        name=user.fullName,
        role=user.role,
        password_hash=hash_password(user.password),
        has_root_access=(user.role == "chefcmb")
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User registered successfully!", "user_id": new_user.user_id}

# ==========================================================
# 🔐 LOGIN ROUTE: Authenticate via Secondary CMS DB
# ==========================================================
@app.post("/api/login")
def login_user(user: schemas.UserLogin, db: Session = Depends(get_secondary_db)):
    # 1. Search for user by TR ID (Primary identifier) or Email
    db_user = db.query(models.User).filter(
        (models.User.tr_id == user.trid) | (models.User.email == user.trid)
    ).first()
    
    # 2. Check if user exists
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail="Invalid TR ID/Email or Password"
        )

    # 3. Verify the hashed password
    incoming_password_hash = hash_password(user.password)
    if db_user.password_hash != incoming_password_hash:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail="Invalid TR ID/Email or Password"
        )

    # 4. Return success and basic user info
    return {
        "message": "Login successful",
        "user": {
            "name": db_user.name,
            "role": db_user.role,
            "trid": db_user.tr_id,
            "has_root_access": db_user.has_root_access
        }
    }