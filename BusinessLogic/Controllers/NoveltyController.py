from fastapi import HTTPException
from bson import ObjectId
from pydantic import ValidationError
from Config.DatabaseConnection import noveltyCollection, registerCollection, personCollection
from Models.novelty import Novelty
from datetime import datetime, timedelta
from Models.person import Person
import httpx

# Function to create a novelty
async def createNoveltyController(noveltyData: Novelty):
    try:
        noveltyData = Novelty(**noveltyData.dict())

        # Verificar que todas las placas existan en registerCollection
        for plate in noveltyData.vehiclePlate:
            existing_register = await registerCollection.find_one({
                "vehiclePlate": plate,
                "dateTimeExit": None
                })
            if not existing_register:
                raise HTTPException(
                    status_code=400, 
                    detail=f"La placa {plate} no existe en los registros activos o ya registró su salida"
                )
        # Si todas las placas existen, crear la novedad
        newNovelty = noveltyData.dict()
        result = await noveltyCollection.insert_one(newNovelty)

        # Obtener el código de la persona desde el registro
        person_code = existing_register["personCode"]
        # Buscar a la persona en la colección de personas
        person_doc = await personCollection.find_one({"code": person_code})
        if person_doc is None:
            raise HTTPException(
                status_code=404,
                detail=f"No se encontró una persona con el código {person_code}"
            )
        # Convertir el documento de la persona a un objeto Person
        person = Person(**person_doc)

        phone = '57' + person.phone
        fecha_actual = datetime.now().strftime("%d/%m/%Y")  # Formato día/mes/año
        message_Send = (
            f"Día {fecha_actual}\n\n"
            f"Señor(a) {person.name} {person.lastName}, le informamos que su vehículo presenta la siguiente novedad:\n\n"
            f"\"{noveltyData.description}\"\n\n"
            f"Por favor, hágase presente en el lugar.\n\n"
            f"Atentamente,\n"
            f"PARKING UC"
        )

        # Consumir el microservicio de envío de mensajes
        async with httpx.AsyncClient() as client:
            payload = {
                "phone": phone,       
                "message": message_Send
            }
            response = await client.post("http://localhost:3002/send-message", json=payload)
            response.raise_for_status()

        return str(result.inserted_id)

    except ValidationError as e:
        errors = [{"field": err["loc"][-1], "message": "Error de validación"} for err in e.errors()]
        raise HTTPException(status_code=400, detail=errors)
    

# Function to list all novelties
async def listNoveltyController():
    novelties = await noveltyCollection.find().to_list(length=None)
    return [{**Novelty(**novelty).dict(), "_id": str(novelty["_id"])} for novelty in novelties]

# * Function to get a novelty by id
async def getNoveltyById(noveltyId: str):
    novelty = await noveltyCollection.find_one({"_id": ObjectId(noveltyId)})
    if novelty:
        novelty["_id"] = str(novelty["_id"])
    return novelty

# Function to delete a Novelty
# Function to delete a Novelty
async def deleteNoveltyController(noveltyId: str):
    novelty = await getNoveltyById(noveltyId)
    if not novelty:
        raise HTTPException(status_code=404, detail="Novedad no encontrado")
    date = novelty.get("date")

    current_time = datetime.now()
    time_diff = current_time - date
    if time_diff <= timedelta(days=2):  # Usar timedelta directamente
        raise HTTPException(
            status_code=400, detail="No se puede eliminar una novedad con menos de 2 días de antigüedad")

    result = await noveltyCollection.delete_one({"_id:": noveltyId})
    return result.deleted_count > 0