from fastapi import HTTPException
from bson import ObjectId
from pydantic import ValidationError
from Config.DatabaseConnection import personCollection, registerCollection
from Models.person import Person
from datetime import datetime, timedelta
import bcrypt
from typing import Any

# Function to encript the password


def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed_password.decode('utf-8')

# Function to create a person


async def createPersonController(personData: Person):
    try:
        personData = Person(**personData.dict())
    except ValidationError as e:
        errors = [{"field": err["loc"][-1],
                   "message": "No se pueden usar caracteres especiales"} for err in e.errors()]
        raise HTTPException(status_code=400, detail=errors)

    existing_person = await personCollection.find_one({"code": personData.code})
    if existing_person:
        raise HTTPException(
            status_code=400, detail="El código de persona ya existe")

    if personData.password:
        personData.password = hash_password(personData.password)

    newPerson = personData.dict(exclude={"confirmPassword"})
    result = await personCollection.insert_one(newPerson)
    return str(result.inserted_id)


# Function to update a person by id
async def updatePersonController(personId: str, updateData: dict, charge: str):
    if not updateData:
        raise HTTPException(
            status_code=400, detail="No se proporcionaron datos para la actualización.")

    update_fields = {}
    if 'phone' in updateData:
        update_fields['phone'] = updateData['phone']
    if 'email' in updateData and charge != "Vigilante":
        update_fields['email'] = updateData['email']
    if 'password' in updateData:
        update_fields['password'] = hash_password(updateData['password'])
    if charge == 'Vigilante' and 'name' in updateData:
        update_fields['name'] = updateData['name']
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
    return [{**Person(**person).dict(), "_id": str(person["_id"])} for person in persons]


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

""" async def deletePersonController(personId: str):
    # Buscar la persona
    person = await personCollection.find_one({"_id": ObjectId(personId)})
    if not person:
        raise HTTPException(status_code=404, detail="Persona no encontrada")

    # Validar código de persona
    personCode = person.get("code")
    if not personCode:
        raise HTTPException(
            status_code=400, detail="Código de persona no encontrado"
        )

    # Verificar registros relacionados
    await validate_related_registers(personCode)

    # Eliminar registros antiguos
    await delete_old_registers(personCode)

    # Eliminar la persona
    result = await personCollection.delete_one({"_id": ObjectId(personId)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Persona no encontrada")

    return {"message": "Persona eliminada exitosamente con los registros antiguos"}


async def validate_related_registers(personCode: Any):
    relatedRegisters = await registerCollection.find({"personCode": personCode}).to_list(length=None)

    for register in relatedRegisters:
        dateTimeExit = register.get("dateTimeExit")

        if dateTimeExit is None:
            raise HTTPException(
                status_code=400,
                detail="No se puede eliminar el registro si no se ha registrado la salida",
            )

        time_diff = datetime.now() - dateTimeExit
        if time_diff <= timedelta(days=15):
            raise HTTPException(
                status_code=400,
                detail="No se puede eliminar el registro antes de 15 días desde la salida",
            )


async def delete_old_registers(personCode: Any):
    await registerCollection.delete_many(
        {
            "personCode": personCode,
            "dateTimeExit": {"$lte": datetime.now() - timedelta(days=15)},
        }
    )
 """

# Function to get a person by code
async def getPersonByCode(personCode: int):
    try:
        print(f"Buscando persona con código: {personCode}")
        person = await personCollection.find_one({"code": personCode})

        if person:
            print(f"Persona encontrada: {person}")
            return {
                "name": person["name"],
                "lastName": person["lastName"],
                "charge": person["charge"],
                "code": person["code"]
            }
        else:
            print(f"No se encontró persona con código: {personCode}")
            raise HTTPException(
                status_code=404,
                detail=f"No se encontró persona con código: {personCode}"
            )

    except Exception as e:
        print(f"Error buscando persona: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Error al buscar persona: {str(e)}"
        )
