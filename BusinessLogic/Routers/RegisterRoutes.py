from Models.register import Register
from fastapi import APIRouter, HTTPException
from datetime import datetime, timedelta
from Controllers.RegisterController import createRegisterController
from Controllers.RegisterController import listRegisterController
from Controllers.RegisterController import deleteRegisterByPlate
from Controllers.RegisterController import getRegisterByPlate
router = APIRouter()

# Path to create a register
@router.post("/createRegister/")
async def createRegisterRoute(register: Register):
    try:
        register_id = await createRegisterController(register)
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
        # Buscar el registro por placa
        register = await getRegisterByPlate(vehiclePlate)
        
        if not register:
            raise HTTPException(status_code=404, detail="Registro no encontrado")
        
        return register
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    

# Path to delete a register after 15 days
@router.delete("/deleteRegister/{vehiclePlate}")
async def deleteRegisterRoute(vehiclePlate: str):
    try:
        # Find the register by plate
        register = await getRegisterByPlate(vehiclePlate)
        
        if not register:
            raise HTTPException(status_code=404, detail="Registro no encontrado")

        # Check if 15 days have passed since the departure date
        current_time = datetime.now()
        time_diff = current_time - register["dateTimeExit"]

        if time_diff <= timedelta(days=15):
            raise HTTPException(status_code=400, detail="No se puede eliminar el registro antes de 15 días desde la salida")

        # Delete the register if the condition is met
        await deleteRegisterByPlate(vehiclePlate)
        return {"message": "Registro eliminado exitosamente"}
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))