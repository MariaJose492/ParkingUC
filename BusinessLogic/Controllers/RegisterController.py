from Config.DatabaseConnection import registerCollection
from Models.register import Register
from fastapi import HTTPException
from datetime import datetime, timedelta

#* Function to create a register
async def createRegisterController(registerData: Register):
    newRegister = registerData.dict()
    result = await registerCollection.insert_one(newRegister)
    return str(result.inserted_id)


#* Function to list all registers
async def listRegisterController():
    registers = await registerCollection.find().to_list(length=None)
    return [Register(**register).dict() for register in registers]


#* Function to get a vehicle by plate 
async def getRegisterByPlate(vehiclePlate: int):
    register = await registerCollection.find_one({"vehiclePlate": vehiclePlate})
    if register:
        register["_id"] = str(register["_id"])
    return register


#* Function to get register that have the dateTimeExit null, by vehiclePlate.
async def getRegisterByPlateAndDateTimeExit(vehiclePlate: int):
    register = await registerCollection.find_one({"vehiclePlate": vehiclePlate, "dateTimeExit": None})
    return register


#* Function to delete a vehicle by plate
#  Parameters:
#  vehiclePlate (int): The vehicle plate to delete.

# Looks up the vehicle registration using the license plate, checks if the dateTimeExit field is present in the record,
# calculates the time difference between the current date and dateTimeExit and if 15 days or less have passed since 
# dateTimeExit, does not allow deleting the record, but does It's been 15 days or more, delete the registration from the 
# registerCollection collection.
async def deleteRegisterByPlate(vehiclePlate: int):
    register = await getRegisterByPlate(vehiclePlate)    
    if not register:
        return False      
    dateTimeExit = register.get("dateTimeExit")
    if not dateTimeExit:
        return False  

    current_time = datetime.now()
    time_diff = current_time - dateTimeExit    
    if time_diff <= timedelta(days=15):
        return False 
    
    result = await registerCollection.delete_one({"vehiclePlate": vehiclePlate})
    return result.deleted_count > 0


#* Function to update a register by plate
# Through getRegisterByPlateAndDateTimeExit, the record that has not yet exited is searched, according to the plate that is 
# enter, if there is no vehicle at the moment with that license plate or it has already left, it informs you
# If a record without departure time is found for that vehicle, the dateTimeExit field is updated'''
async def updateRegisterController(vehiclePlate: str, updateData: dict):
    register = await getRegisterByPlateAndDateTimeExit(vehiclePlate)
    if not register:
        raise HTTPException(status_code=400, detail="El vehículo ya registró su salida")
    
    update_fields = {}
    if 'dateTimeExit' in updateData:
        update_fields['dateTimeExit'] = updateData['dateTimeExit']
    if not update_fields:
        raise HTTPException(status_code=400, detail="No se proporcionaron campos válidos para la actualización.")

    result = await registerCollection.update_one(
        {"_id": (register.get("_id"))},
        {"$set": update_fields}
    )
    if result.modified_count == 0:
        raise HTTPException(
            status_code=404, detail="Registro no encontrado o no se realizaron cambios")
    return {"message": "Registro actualizado con éxito"}