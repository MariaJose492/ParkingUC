from fastapi import FastAPI
from Routers import PersonRoutes, RegisterRoutes, NoveltyRoutes, ProcessingRoutes, LoginRoutes


>>>>>>> 6d86799cf82e23d6a4dfd9b63ed4c19c0c6dec41
from fastapi.middleware.cors import CORSMiddleware
import pytesseract

app = FastAPI()

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
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
    # allow_origins=origins,             # Orígenes permitidos
    allow_origins=["*"],
    allow_credentials=True,            # Permitir credenciales (si es necesario)
    allow_methods=["*"],               # Métodos HTTP permitidos
    allow_headers=["*"],               # Encabezados permitidos
)

# Registrar rutas
app.include_router(PersonRoutes.router)
app.include_router(RegisterRoutes.router)
app.include_router(NoveltyRoutes.router)
app.include_router(ProcessingRoutes.router, prefix="/api/v1", tags=["Processing"])
<<<<<<< HEAD
# app.include_router(PlateProcessingRoutes.router, prefix="/api/v1", tags=["Processing"])  
# app.include_router(AuthRoutes.router, prefix="/api", tags=["Auth"])
app.include_router(LoginRoutes.router)

@app.get("/")
async def root():
    return {"message": "Hello World"}
from fastapi import FastAPI
from Routers import PersonRoutes, RegisterRoutes, NoveltyRoutes, ProcessingRoutes, LoginRoutes
from fastapi.middleware.cors import CORSMiddleware
import pytesseract

app = FastAPI()

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
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
app.include_router(NoveltyRoutes.router)
app.include_router(ProcessingRoutes.router, prefix="/api/v1", tags=["Processing"])
app.include_router(LoginRoutes.router, prefix="/api", tags=["Auth"])
=======

# app.include_router(PlateProcessingRoutes.router, prefix="/api/v1", tags=["Processing"])  
# app.include_router(AuthRoutes.router, prefix="/api", tags=["Auth"])
app.include_router(LoginRoutes.router)
>>>>>>> 6d86799cf82e23d6a4dfd9b63ed4c19c0c6dec41

@app.get("/")
async def root():
    return {"message": "Hello World"}
