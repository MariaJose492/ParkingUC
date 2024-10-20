import os
from fastapi import FastAPI
from config.DatabaseConnection import personCollection

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

# Ruta de verificación de conexión
@app.get("/test-db-connection/")
async def test_db_connection():
    try:
        # Intentar contar documentos en la colección de usuarios (o cualquier otra)
        count = await personCollection.count_documents({})
        return {"message": "Conexión exitosa", "documents_in_users_collection": count}
    except Exception as e:
        return {"message": "Error en la conexión", "error": str(e)}
