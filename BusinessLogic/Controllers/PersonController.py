from fastapi import HTTPException
from bson import ObjectId
from Config.DatabaseConnection import personCollection, registerCollection
from Models.person import Person
from bson import ObjectId
from datetime import datetime, timedelta

# Function to create a person
async def createPersonController(personData: Person):
    newPerson = personData.dict()
    result = await personCollection.insert_one(newPerson)
    return str(result.inserted_id)


# Function to update a person by id
async def updatePersonController(personId: str, updateData: dict):
    if not updateData:
        raise HTTPException(
            status_code=400, detail="No se proporcionaron datos para la actualización.")

    update_fields = {}
    if 'phone' in updateData:
        update_fields['phone'] = updateData['phone']
    if 'email' in updateData:
        update_fields['email'] = updateData['email']
    if not update_fields:
        raise HTTPException(
            status_code=400, detail="No se proporcionaron campos válidos para la actualización.")

    result = await personCollection.update_one(
        {"_id": ObjectId(personId)},
        {"$set": update_fields}
    )

    if result.modified_count == 0:
        raise HTTPException(
            status_code=404, detail="Persona no encontrada o no se realizaron cambios")

    return {"message": "Datos actualizados con éxito"}

# Function to list all persons
async def listPersonController():
    persons = await personCollection.find().to_list(length=None)
    return [Person(**person).dict() for person in persons]


# Function to delete a person by id:
# Delete a person and their related records if more than 15 days have passed since the departure date.

#     Parameters:
#     - personId (str): The ID of the person to delete.

#     Steps:
#     1. Find the person in the `personCollection` collection using the `personId`, if the person is not found, throw an exception
#     2. Get the person code (`personCode`), if the person code is not found, throw an exception
#     3. Search for related records in the `registerCollection` collection using `personCode`, for each related record:
#        - Checks if the exit date (`dateTimeExit`) is present.
#        - If the departure date is present and 15 days or less have passed since the departure date, or, if the departure date is not present, throw an exception, informing that the person cannot be removed for this reason.
#     4. If the departure date is greater than 15 days, delete the related records and remove the person from the `personCollection` collection.
async def deletePersonController(personId: str):
    person = await personCollection.find_one({"_id": ObjectId(personId)})
    if not person:
        raise HTTPException(status_code=404, detail="Persona no encontrada")

    personCode = person.get("code")
    if personCode is None:
        raise HTTPException(
            status_code=400, detail="Código de persona no encontrado")

    relatedRegisters = await registerCollection.find({"personCode": personCode}).to_list(length=None)
    if relatedRegisters:
        for register in relatedRegisters:
            dateTimeExit = register.get("dateTimeExit")
            if dateTimeExit:
                time_diff = datetime.now() - dateTimeExit
                if time_diff <= timedelta(days=15):
                    raise HTTPException(
                        status_code=400, detail="No se puede eliminar el registro antes de 15 días desde la salida")
            if dateTimeExit is None:
                raise HTTPException(
                    status_code=400, detail="No se puede eliminar el registro si no se ha registrado la salida")
    
    await registerCollection.delete_many({"personCode": personCode, "dateTimeExit": {"$lte": datetime.now() - timedelta(days=15)}})

    result = await personCollection.delete_one({"_id": ObjectId(personId)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Persona no encontrada")

    return {"message": "Persona eliminada exitosamente con los registros antiguos"}
