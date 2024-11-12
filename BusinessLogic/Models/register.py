from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class Register(BaseModel):
    vehicleType: str
    personCode: int
    vehiclePlate: str
    dateTimeEntrance: datetime
    dateTimeExit: Optional[datetime] = None

