from fastapi import FastAPI
from Routers import PersonRoutes, RegisterRoutes

app = FastAPI()

# Registrar rutas
app.include_router(PersonRoutes.router)
app.include_router(RegisterRoutes.router)

@app.get("/")
async def root():
    return {"message": "Hello World"}
