from fastapi import HTTPException
from bson import ObjectId
from Config.DatabaseConnection import personCollection
from Models.person import Person
from bson import ObjectId


async def createPersonController(personData: Person):
    newPerson = personData.dict()
    result = await personCollection.insert_one(newPerson)
    return str(result.inserted_id)


async def updatePersonController(person_id: str, updateData: dict):

    if not updateData:
        raise HTTPException(status_code=400, detail="No data provided for update")

    update_fields = {}
    if 'phone' in updateData:
        update_fields['phone'] = updateData['phone']
    if 'email' in updateData:
        update_fields['email'] = updateData['email']

    if not update_fields:
        raise HTTPException(status_code=400, detail="No valid fields provided for update")

    result = await personCollection.update_one(
        {"_id": ObjectId(person_id)},
        {"$set": update_fields}
    )

    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Person not found or no changes made")

    return {"message": "Person updated successfully"}

async def listPersonController():
    persons = await personCollection.find().to_list(length=None)
    return [Person(**person).dict() for person in persons]