from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_get_all():
    response = client.get("/users/")
    assert response.status_code == 200
    assert response.json()[0]['full_name'] == "Иванов Иван Иванович"
    assert len(response.json()) == 5

def test_get_by_unknown_user():
    response = client.get("/sun123/clients/", params={"password":"purupuru27"})
    assert response.status_code == 200
    assert len(response.json()) == 0

def test_get_by_known_user():
    response = client.get("/timoha2007/clients/", params={"password":"mashedpotatoes"})
    assert response.status_code == 200
    assert response.json()[3]["id"] == 13



