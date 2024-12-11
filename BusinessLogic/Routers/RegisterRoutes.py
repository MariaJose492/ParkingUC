from Models.register import Register
from fastapi import APIRouter, HTTPException
from datetime import datetime, timedelta
from Controllers.RegisterController import *
router = APIRouter()

# Path to create a register
@router.post("/createRegister/")
async def createRegisterRoute(register: Register):
    try:
        register_id = await createRegisterController(register)

        vehicleType = register.vehicleType
        await updateParkingSpaces(vehicleType, is_entry=True)

        return {"message": "Registro creado con éxito", "register_id": register_id}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Path to list all registers
@router.get("/listRegisters/")
async def listRegistersRoute():
    try:
        registers = await listRegisterController()
        return registers
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Path to get register by plate
@router.get("/getRegister/{vehiclePlate}/")
async def getRegisterByPlateRoute(vehiclePlate: str):
    try:
        register = await getRegisterByPlate(vehiclePlate)
        if not register:
            raise HTTPException(
                status_code=404, detail="Registro no encontrado")
        return register
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Path to delete a register after 15 days
# Find de register by plate
# Check if 15 days have passed since the departure date
# Delete the register if the condition is met
@router.delete("/deleteRegister/{vehiclePlate}")
async def deleteRegisterRoute(vehiclePlate: str):
    try:
        register = await getRegisterByPlate(vehiclePlate)
        if not register:
            raise HTTPException(
                status_code=404, detail="Registro no encontrado")
        current_time = datetime.now()
        time_diff = current_time - register["dateTimeExit"]
        if time_diff <= timedelta(days=15):
            raise HTTPException(
                status_code=400, detail="No se puede eliminar el registro antes de 15 días desde la salida")
        await deleteRegisterByPlate(vehiclePlate)
        return {"message": "Registro eliminado exitosamente"}
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Path to update a Register
@router.put("/updateRegister/{vehiclePlate}")
async def updateRegisterRoute(vehiclePlate: str, updateData: dict):
    try:
        result = await updateRegisterController(vehiclePlate, updateData)

        if "dateTimeExit" in updateData:  # Verificamos si se actualiza la fecha de salida
            register = await getRegisterByPlate(vehiclePlate)
            vehicleType = register.get("vehicleType")
            await updateParkingSpaces(vehicleType, is_entry=False)

        return result
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Path to get person by personCode
@router.get("/getPerson/{personCode}")
async def getPersonByPersonCodeRoute(personCode: int):
    try:
        person = await getPersonByPersonCode(personCode)
        if not person:
            raise HTTPException(
                status_code=404, detail="Persona no encontrada")
        return person
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.get("/getRegistersWithoutExit")
async def getRegistersWithoutExitRoute():
    try:
        registers = await getRegistersWithoutExit()
        return registers
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.get("/getRegisterByPlateAndDateTimeExit/{vehiclePlate}")
async def getRegisterByPlateAndDateTimeExitRoute(vehiclePlate: str):
    try:
        register = await getRegisterByPlateAndDateTimeExit(vehiclePlate)
        if not register:
            raise HTTPException(
                status_code=404, detail="Registro no encontrado")
        return register
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))