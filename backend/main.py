from fastapi import FastAPI, HTTPException, Depends
from typing import Annotated, List
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import new_session, engine
import models
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    'http://localhost:3000'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']

)

class UserBase(BaseModel):
    full_name: str
    login: str
    password: str

class UserModel(UserBase):
    id: int

    class Config: 
        from_attributes = True

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

def get_db():
    db = new_session()
    try:
        yield db
    finally:
        db.close()
    


db_dependency = Annotated[Session, Depends(get_db)]

models.Base.metadata.create_all(bind = engine)

@app.post("/users/", response_model=UserModel)
async def create_user(user: UserBase, db: db_dependency):
    db_user = models.User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.post("/{user}/clients/", response_model=ClientModel)
async def create_client(user: str, client: ClientBase, db: db_dependency):
    db_client = models.Client(**client.dict())
    db.add(db_client)
    db.commit()
    db.refresh(db_client)
    return db_client

@app.get("/users/", response_model=List[UserModel])
async def get_users(db: db_dependency):
    users = db.query(models.User).all()
    return users

@app.get("/{user}/clients/", response_model=List[ClientModel])
async def get_clients(user: str, password: str, db: db_dependency):
    user_clients = []
    clients = db.query(models.Client).all()
    users = db.query(models.User).all()
    the_user = ''
    for u in users:
        if u.login == user and u.password == password:
            the_user = u.full_name
        
    for client in clients:
        if client.user_in_charge == the_user:
            user_clients += {client}
    return user_clients


@app.get("/clients/{client_id}", response_model=ClientModel)
async def get_client_by_id(client_id: int, status: str, db: db_dependency):
    the_client = {}
    clients = db.query(models.Client).all()
    for c in clients:
        if c.id == client_id:
            the_client = c
            the_client.status = status
    db.commit()
    db.refresh(the_client)
    return the_client

