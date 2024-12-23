from Models.person import Person
from Controllers.PersonController import *
from fastapi import APIRouter, HTTPException

router = APIRouter()

# Path to create a person
@router.post("/createPerson/")
async def createPersonRoute(person: Person):
    try:
        person_id = await createPersonController(person)
        return {"message": "Persona creada con éxito", "person_id": person_id}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


# Route to update a person's phone and/or email address
@router.put("/updatePerson/{person_id}")
async def updatePersonRoute(person_id: str, updateData: dict):
    try:
        result = await updatePersonController(person_id, updateData)
        return result
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
# Path to list all persons
@router.get("/listPersons/")
async def listPersonsRoute():
    try:
        persons = await listPersonController()
        return persons
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
# route to eliminate a person if they have records with an exit greater than 15 days
@router.delete("/deletePerson/{personId}")
async def deletePersonRoute(personId: str):
    try:
        result = await deletePersonController(personId)
        return result
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Path to get person by code
@router.get("/getPerson/{personCode}")
async def getPersonByCodeRoute(personCode: int):
    try:
        person = await getPersonByCode(personCode)
        if not person:
            raise HTTPException(
                status_code=404, detail="Persona no encontrada")
        return person
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))