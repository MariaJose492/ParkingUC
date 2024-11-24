from pydantic import BaseModel, validator
from typing import Optional
import re

class Person(BaseModel):
    name: str
    lastName: str
    code: int
    phone: str
    charge: str
    email: Optional[str] = None

    @validator('name', 'lastName', 'phone', 'charge', pre=True, always=True)
    def noSpecialCharacters(cls, value):
        if  value and not re.match("^[a-záéíóúñA-ZÁÉÍÓÚÑ0-9 ]*$", value):
            raise ValueError("No se permiten caracteres especiales")
        return value

      