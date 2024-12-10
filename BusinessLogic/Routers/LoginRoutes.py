from fastapi import APIRouter
from Controllers.LoginController import login
from Models.login import LoginRequest

router = APIRouter()

@router.post("/login")
async def login_route(request: LoginRequest):

    user_data = await login(request.email, request.password)
    return {"message": "Inicio de sesión exitoso", "user": user_data}
