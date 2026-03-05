from pydantic import BaseModel

class UserRegister(BaseModel):
    fullName: str
    email: str
    trid: str
    department: str
    role: str
    password: str


class UserLogin(BaseModel):
    trid: str
    password: str