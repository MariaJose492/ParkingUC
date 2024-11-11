from pydantic import BaseModel
from datetime import datetime

class Register(BaseModel):
    vehicleType: str
    personCode: str
    vehiclePlate: str
    dateTimeEntrance: datetime
    dateTimeExit: datetime

