import os
from dotenv import load_dotenv
import motor.motor_asyncio

# Cargar el archivo .env
load_dotenv()

# Obtener la conexión de la variable de entorno
mongo_uri = os.getenv("MONGO_CONNECTION")

# Crear el cliente de MongoDB
client = motor.motor_asyncio.AsyncIOMotorClient(mongo_uri)

# Conectar a la base de datos
db = client["parkingUC"]

# Acceder a la colección
personCollection = db["person"]

# Acceder a la colección registro
registerCollection = db["register"]