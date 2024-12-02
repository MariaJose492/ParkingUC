from fastapi import HTTPException
from bson import ObjectId
from pydantic import ValidationError
from Config.DatabaseConnection import noveltyCollection, registerCollection
from Models.novelty import Novelty
from datetime import datetime, timedelta

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