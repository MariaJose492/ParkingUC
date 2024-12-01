from fastapi import HTTPException
from bson import ObjectId
from pydantic import ValidationError
from Config.DatabaseConnection import noveltyCollection, registerCollection
from Models.novelty import Novelty

# Function to create a novelty
async def createNoveltyController(noveltyData: Novelty):
    try:
        noveltyData = Novelty(**noveltyData.dict())
        
        # Verificar que todas las placas existan en registerCollection
        for plate in noveltyData.vehiclePlate:
            existing_register = await registerCollection.find_one({"vehiclePlate": plate})
            if not existing_register:
                raise HTTPException(
                    status_code=400, 
                    detail=f"La placa {plate} no existe en los registros"
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

# Function to delete a Novelty
async def deleteNoveltyController(noveltyId: str):
    try:
        result = await noveltyCollection.delete_one({"_id": ObjectId(noveltyId)})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Novedad no encontrada")
        return {"message": "Novedad eliminada con éxito"}
    except ValidationError as e:
        errors = [{"field": err["loc"][-1], "message": "Error de validación"} for err in e.errors()]
        raise HTTPException(status_code=400, detail=errors)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))