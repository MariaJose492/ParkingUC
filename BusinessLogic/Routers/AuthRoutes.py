# # authroutes.py
# from fastapi import APIRouter, HTTPException
# from passlib.context import CryptContext
# from Config.DatabaseConnection import personCollection  
# from Models.person import Person 

# router = APIRouter()

# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# def verify_password(plain_password: str, hashed_password: str) -> bool:
#     return pwd_context.verify(plain_password, hashed_password)

# @router.post("/login")
# async def login_user(user: dict):
  
#     email = user.get("email")
#     password = user.get("password")

#     if not email or not password:
#         raise HTTPException(status_code=400, detail="Email y password son requeridos")

#     existing_user = await personCollection.find_one({"email": email})
    
#     if not existing_user:
#         raise HTTPException(status_code=400, detail="Usuario no encontrado")
   

#     if not verify_password(password, existing_user['password']):
#         raise HTTPException(status_code=400, detail="Contraseña incorrecta")
    
#     return {"message": "Inicio de sesión exitoso", "username": existing_user["username"]}
