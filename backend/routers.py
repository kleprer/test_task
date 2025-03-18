from fastapi import APIRouter, Depends
import user_models, client_models
from typing import Annotated, List
from sqlalchemy.orm import Session
from database import new_session, engine

router = APIRouter()

def get_db():
    db = new_session()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

user_models.Base.metadata.create_all(bind = engine)
client_models.Base.metadata.create_all(bind = engine)


@router.post("/{user}/clients/", response_model=client_models.ClientModel)
async def create_client(user: str, client: client_models.ClientBase, db: db_dependency):
    db_client = client_models.Client(**client.model_dump())
    db.add(db_client)
    db.commit()
    db.refresh(db_client)
    return db_client


@router.post("/users/", response_model=user_models.UserModel)
async def create_user(user: user_models.UserBase, db: db_dependency):
    db_user = user_models.User(**user.model_dump())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


@router.get("/users/", response_model=List[user_models.UserModel])
async def get_users(db: db_dependency):
    users = db.query(user_models.User).all()
    return users
    

@router.get("/{user}/clients/", response_model=List[client_models.ClientModel])
async def get_clients(user: str, password: str, db: db_dependency):
    user_clients = []
    clients = db.query(client_models.Client).all()
    users = db.query(user_models.User).all()
    the_user = ''
    for u in users:
        if u.login == user and u.password == password:
            the_user = u.full_name
        
    for client in clients:
        if client.user_in_charge == the_user:
            user_clients += {client}
    return user_clients


@router.get("/clients/{client_id}", response_model=client_models.ClientModel)
async def get_client_by_id(client_id: int, status: str, db: db_dependency):
    the_client = {}
    clients = db.query(client_models.Client).all()
    for c in clients:
        if c.id == client_id:
            the_client = c
            the_client.status = status
    db.commit()
    db.refresh(the_client)
    return the_client
