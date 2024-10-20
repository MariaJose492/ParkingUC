from fastapi import FastAPI
from Routers import PersonRoutes

app = FastAPI()

# Registrar rutas
app.include_router(PersonRoutes.router)

@app.get("/")
async def root():
    return {"message": "Hello World"}
