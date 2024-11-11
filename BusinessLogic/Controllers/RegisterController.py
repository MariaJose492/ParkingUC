from Config.DatabaseConnection import registerCollection
from Models.register import Register
from datetime import datetime, timedelta

# Function to create a register
async def createRegisterController(registerData: Register):
    newRegister = registerData.dict()
    result = await registerCollection.insert_one(newRegister)
    return str(result.inserted_id)

# Function to list all registers
async def listRegisterController():
    registers = await registerCollection.find().to_list(length=None)
    return [Register(**register).dict() for register in registers]

# Function to get a vehicle by plate 
async def getRegisterByPlate(vehiclePlate: int):
    register = await registerCollection.find_one({"vehiclePlate": vehiclePlate})
    if register:
        # Convert _id from ObjectId to string
        register["_id"] = str(register["_id"])
    
    return register

# Function to delete a vehicle by plate
async def deleteRegisterByPlate(vehiclePlate: int):
    register = await getRegisterByPlate(vehiclePlate)
    
    if not register:
        return False  # Return False if the register doesn't exist
    
    # Check if the record is older than 15 days based on dateTimeExit
    dateTimeExit = register.get("dateTimeExit")
    if not dateTimeExit:
        return False  # If there is no dateTimeExit field, return False
    
    current_time = datetime.now()
    time_diff = current_time - dateTimeExit
    
    if time_diff <= timedelta(days=15):
        return False  # Don't delete if less than 15 days have passed
    
    # Delete the register if condition is met
    result = await registerCollection.delete_one({"vehiclePlate": vehiclePlate})
    return result.deleted_count > 0