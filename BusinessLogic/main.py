from fastapi import FastAPI
from Routers import PersonRoutes, RegisterRoutes
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

# Configurar orígenes permitidos
# Origen del frontend Angular en desarrollo
# Alternativa si usas otra IP local
# Agrega más orígenes si es necesario
origins = [
    "http://localhost:8100",  
    "http://127.0.0.1:8100",  
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,             # Orígenes permitidos
    allow_credentials=True,            # Permitir credenciales (si es necesario)
    allow_methods=["*"],               # Métodos HTTP permitidos
    allow_headers=["*"],               # Encabezados permitidos
)

# Registrar rutas
app.include_router(PersonRoutes.router)
app.include_router(RegisterRoutes.router)

@app.get("/")
async def root():
    return {"message": "Hello World"}
