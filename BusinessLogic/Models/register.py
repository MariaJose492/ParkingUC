from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class Register(BaseModel):
    vehicleType: str
    personCode: int
    vehiclePlate: str
    dateTimeEntrance: datetime = Field(default_factory=datetime.now)
    dateTimeExit: Optional[datetime] = None

