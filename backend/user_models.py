from database import Base
from pydantic import BaseModel
from sqlalchemy import Column, Integer, String


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key = True, index = True)
    full_name = Column(String(150))
    login = Column(String(50))
    password = Column(String(50))

class UserBase(BaseModel):
    full_name: str
    login: str
    password: str

class UserModel(UserBase):
    id: int

    class Config: 
        from_attributes = True