from database import Base
from pydantic import BaseModel
from sqlalchemy import Column, Integer, String, ForeignKey


class Client(Base):
    __tablename__ = 'clients'
    
    id = Column(Integer, primary_key=True, index=True)
    account_number = Column(Integer)
    first_name = Column(String(50))
    last_name = Column(String(50))
    middle_name = Column(String(50))
    birthday = Column(String(10))
    itn = Column(Integer, unique=True)
    user_in_charge = Column(String(150), ForeignKey("users.full_name"))
    status = Column(String(50), default = "Не в работе")

class ClientBase(BaseModel):
    account_number: int
    first_name: str
    last_name: str
    middle_name: str
    birthday: str
    itn: int
    user_in_charge: str
    status: str

class ClientModel(ClientBase):
    id: int

    class Config:
        from_attributes = True