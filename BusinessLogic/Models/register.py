import re
from pydantic import BaseModel, Field, validator
from datetime import datetime
from typing import Optional

class Register(BaseModel):
    vehicleType: Optional[str] = None
    personCode: int
    vehiclePlate: str
    dateTimeEntrance: datetime = Field(default_factory=datetime.now)
    dateTimeExit: Optional[datetime] = None

    @validator('vehiclePlate', pre=True, always=True)
    def noSpecialCharacters(cls, value):
        if  value and not re.match("^[a-záéíóúñA-ZÁÉÍÓÚÑ0-9- ]*$", value):
            raise ValueError("No se permiten caracteres especiales")
        return value