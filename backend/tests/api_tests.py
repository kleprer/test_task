from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_get_by_unknown_user():
    response = client.get("/sun123/clients/", params={"password":"purupuru27"})
    assert response.status_code == 200
    assert len(response.json()) == 0 

def test_get_by_known_user():
    response = client.get("/timoha2007/clients", params={"password":"mashedpotatoes"})
    assert response.json()[2]["birthday"] == "2001.01.01"
    print(response.json())
