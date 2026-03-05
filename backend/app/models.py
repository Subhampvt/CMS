# backend/app/models.py
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime
from sqlalchemy.sql import func
from .database import PrimaryBase, SecondaryBase

# ==========================================
# PRIMARY DATABASE MODELS (Employee API Directory)
# ==========================================
class PrimaryEmployee(PrimaryBase):
    __tablename__ = "employees"
    
    tr_id = Column(String, primary_key=True, index=True) # PK
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    dept = Column(String, nullable=False)


# ==========================================
# SECONDARY DATABASE MODELS (CMS Application)
# ==========================================
class User(SecondaryBase):
    __tablename__ = "usertable"
    
    user_id = Column(Integer, primary_key=True, index=True) # 1st Col: PK
    tr_id = Column(String, unique=True, index=True)         # 2nd Col: Logically FK to Primary DB
    email = Column(String, unique=True, index=True)
    name = Column(String)
    role = Column(String)
    has_root_access = Column(Boolean, default=False)
    password_hash = Column(String)                          # Essential to allow secure login
    
class FileCodeUpload(SecondaryBase):
    __tablename__ = "file_code_uploads"
    
    file_id = Column(Integer, primary_key=True, index=True) # 1st Col: PK
    uploader_id = Column(Integer, ForeignKey("usertable.user_id")) # 2nd Col: FK
    status = Column(String, default="Pending")
    file_path = Column(String)
    department_tag = Column(String)

class ChangeRequest(SecondaryBase):
    __tablename__ = "change_requests"
    
    cr_id = Column(Integer, primary_key=True, index=True)   # 1st Col: PK
    request_id = Column(Integer, ForeignKey("file_code_uploads.file_id")) # 2nd Col: FK
    justification = Column(String)
    status = Column(String, default="Open")

class CodeReviewVote(SecondaryBase):
    __tablename__ = "code_reviews_voting"
    
    vote_id = Column(Integer, primary_key=True, index=True) # 1st Col: PK
    file_id = Column(Integer, ForeignKey("file_code_uploads.file_id")) # 2nd Col: FK
    reviewer_id = Column(Integer, ForeignKey("usertable.user_id"))     # 3rd Col: Additional FK
    vote_decision = Column(String) # e.g., "Approved", "Rejected"
    mandatory_connect = Column(Boolean, default=False)

class AuditLog(SecondaryBase):
    __tablename__ = "audit_logs"
    
    log_id = Column(Integer, primary_key=True, index=True)  # 1st Col: PK
    user_id = Column(Integer, ForeignKey("usertable.user_id")) # 2nd Col: FK server side
    action_category = Column(String)
    action_detail = Column(String)
    # A crucial addition for an audit log
    timestamp = Column(DateTime(timezone=True), server_default=func.now())