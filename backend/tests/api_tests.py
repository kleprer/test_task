from fastapi.testclient import TestClient

import sys
sys.path.append("C:/Users/irish/dev/github.com/refactor2/test_task/backend/src")
from main import app

client = TestClient(app)

def get_unknown_user():
    response = client.get(
        "/sun123/clients/",
        params={"password":"purupuru27"}
        )
    assert response.status_code == 200
    assert len(response.json()) == 0 

def get_known_user():
    response = client.get(
        "/timoha2007/clients/",
        params={"password":"mashedpotatoes"}
        )
    assert response.status_code == 200
    assert response.json()[2]["birthday"] == "2001.01.01"

def get_all():
    response = client.get("/users/")
    assert response.status_code == 200
    assert response.json()[0]['full_name'] == "Иванов Иван Иванович"
    assert len(response.json()) == 6
