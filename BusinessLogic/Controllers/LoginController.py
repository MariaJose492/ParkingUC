from Config.DatabaseConnection import personCollection
from fastapi import HTTPException
import bcrypt

async def login(email: str, password: str):
    user = await personCollection.find_one({"email": email})
    
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    
    if user["charge"] not in ["Administrador", "Vigilante"]:
        raise HTTPException(status_code=403, detail="Acceso denegado: rol no autorizado")
    
    if not bcrypt.checkpw(password.encode("utf-8"), user["password"].encode("utf-8")):
        raise HTTPException(status_code=401, detail="Contraseña incorrecta")
    
    return {
        "id": str(user["_id"]),
        "email": user["email"],
        "name": user.get("name", "Usuario"),
        "charge": user["charge"]
    }
