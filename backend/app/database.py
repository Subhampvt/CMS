from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# 1. PRIMARY DATABASE (PostgreSQL)
PRIMARY_DB_URL = "postgresql://postgres:Subham2606@localhost:5432/primary_db"
primary_engine = create_engine(PRIMARY_DB_URL)
PrimarySessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=primary_engine)
PrimaryBase = declarative_base()

# 2. SECONDARY DATABASE (PostgreSQL)
SECONDARY_DB_URL = "postgresql://postgres:Subham2606@localhost:5432/secondary_cms_db"
secondary_engine = create_engine(SECONDARY_DB_URL)
SecondarySessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=secondary_engine)
SecondaryBase = declarative_base()

# Dependency tools for FastAPI routes
def get_primary_db():
    db = PrimarySessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_secondary_db():
    db = SecondarySessionLocal()
    try:
        yield db
    finally:
        db.close()