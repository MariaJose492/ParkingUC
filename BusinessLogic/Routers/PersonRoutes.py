from fastapi import APIRouter, HTTPException
from Models.person import Person
from Controllers.PersonController import createPersonController

router = APIRouter()

# Ruta para crear una persona
@router.post("/createPerson/")
async def createPersonRoute(person: Person):
    try:
        person_id = await createPersonController(person)
        return {"message": "Persona creada con éxito", "person_id": person_id}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
