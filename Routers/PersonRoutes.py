from fastapi import APIRouter, HTTPException
from Models.person import Person
from Controllers.PersonController import createPerson

router = APIRouter()

# Ruta para crear una persona
@router.post("/createPerson/")
async def createPerson(person: Person):
    try:
        person_id = await createPerson(person)
        return {"message": "Persona creada con éxito", "person_id": person_id}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
