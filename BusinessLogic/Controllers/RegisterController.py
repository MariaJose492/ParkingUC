from bson import ObjectId
from pydantic import ValidationError
from Config.DatabaseConnection import registerCollection, personCollection
from Models.register import Register
from fastapi import HTTPException
from datetime import datetime, timedelta

# * Function to create a register


async def createRegisterController(registerData: Register):
    try:
        registerData = Register(**registerData.dict())
    except ValidationError as e:
        errors = [{"field": err["loc"][-1],
                   "message": "No se pueden usar caracteres especiales"} for err in e.errors()]
        raise HTTPException(status_code=400, detail=errors)

    # Verificar si la persona existe
    existing_person = await personCollection.find_one({"code": registerData.personCode})
    if not existing_person:
        raise HTTPException(
            status_code=400,
            detail=f"No existe una persona con el código {
                registerData.personCode}"
        )
    vehicleType = await isCarOrMotorbike(registerData.vehiclePlate)

    newRegister = registerData.dict()
    newRegister["vehicleType"] = vehicleType
    result = await registerCollection.insert_one(newRegister)
    return str(result.inserted_id)


# * Function to list all registers
async def listRegisterController():
    registers = await registerCollection.find().to_list(length=None)
    return [{**Register(**register).dict(), "_id": str(register["_id"])} for register in registers]


# * Function to get a vehicle by plate
async def getRegisterByPlate(vehiclePlate: str):
    register = await registerCollection.find_one({"vehiclePlate": vehiclePlate})
    if register:
        register["_id"] = str(register["_id"])
    return register


# * Function to get register that have the dateTimeExit null, by vehiclePlate.
async def getRegisterByPlateAndDateTimeExit(vehiclePlate: str):
    register = await registerCollection.find_one({
        "vehiclePlate": vehiclePlate,
        "dateTimeExit": None
    })

    if register:
        # Convertir ObjectId a string
        register["_id"] = str(register["_id"])
        return register

    return None

# *Function to get all register that have dateTimeExit null


async def getRegistersWithoutExit():
    # Consulta para obtener solo las placas (vehiclePlate) donde dateTimeExit es None
    registers = await registerCollection.find({"dateTimeExit": None}, {"vehiclePlate": 1, "_id": 0}).to_list(length=None)

    # Retorna solo las placas
    return [register["vehiclePlate"] for register in registers]


# * Function to get a person by codePerson
async def getPersonByPersonCode(personCode: int):
    person = await personCollection.find_one({"code": personCode})
    if not person:
        raise HTTPException(status_code=404, detail="Persona no encontrada")
    return {
        "name": person["name"],
        "lastName": person["lastName"],
        "charge": person["charge"],
        "phone": person["phone"],
        "email": person["email"]
    }

# * Function to delete a vehicle by plate
#  Parameters:
#  vehiclePlate (int): The vehicle plate to delete.

# Looks up the vehicle registration using the license plate, checks if the dateTimeExit field is present in the record,
# calculates the time difference between the current date and dateTimeExit and if 15 days or less have passed since
# dateTimeExit, does not allow deleting the record, but does It's been 15 days or more, delete the registration from the
# registerCollection collection.


async def deleteRegisterByPlate(vehiclePlate: int):
    register = await getRegisterByPlate(vehiclePlate)
    if not register:
        raise HTTPException(status_code=404, detail="Registro no encontrado")
    dateTimeExit = register.get("dateTimeExit")
    if dateTimeExit is None:
        raise HTTPException(
            status_code=400, detail="El registro no tiene una fecha de salida")

    current_time = datetime.now()
    time_diff = current_time - dateTimeExit
    if time_diff <= timedelta(days=15):
        raise HTTPException(
            status_code=400, detail="No se puede eliminar el registro antes de 15 de su fecha de salida")

    result = await registerCollection.delete_one({"vehiclePlate": vehiclePlate})
    return result.deleted_count > 0


# * Function to update a register by plate
# Through getRegisterByPlateAndDateTimeExit, the record that has not yet exited is searched, according to the plate that is
# enter, if there is no vehicle at the moment with that license plate or it has already left, it informs you
# If a record without departure time is found for that vehicle, the dateTimeExit field is updated'''
async def updateRegisterController(vehiclePlate: str, updateData: dict):
    try:        
        register = await getRegisterByPlateAndDateTimeExit(vehiclePlate)
        if not register:
            raise HTTPException(
                status_code=400, 
                detail="El vehículo ya registró su salida o no existe"
            )
        
        update_fields = {'dateTimeExit': datetime.now()}

        register_id = register.get("_id")
        if isinstance(register_id, str):
            register_id = ObjectId(register_id)

        result = await registerCollection.update_one(
            {"_id": register_id},
            {"$set": update_fields}
        )

        if result.modified_count == 0:
            raise HTTPException(
                status_code=404,
                detail="Registro no encontrado o no se realizaron cambios"
            )

        return {"message": "Registro actualizado con éxito"}

    except Exception as e:
        print(f"Error actualizando registro: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Error actualizando registro: {str(e)}"
        )
    
# * Function to differentiate if it is a car or motorcycle by the license plate
async def isCarOrMotorbike(vehiclePlate: str):
    plate = vehiclePlate
    last_char = plate.split('-')[-1][-1]
    if last_char.isdigit():
        return "Carro"
    if last_char.isalpha():
        return "Moto"
    return "Invalido"
