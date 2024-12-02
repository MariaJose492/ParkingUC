from pydantic import BaseModel, validator, EmailStr, root_validator
from typing import Optional
import re

class Person(BaseModel):
    name: str
    lastName: str
    code: int
    phone: str
    charge: str
    email: Optional[EmailStr] = None
    password: Optional[str] = None
    confirmPassword: Optional[str] = None

    @validator('name', 'lastName', 'phone', 'charge', pre=True, always=True)
    def noSpecialCharacters(cls, value):
        if  value and not re.match("^[a-záéíóúñA-ZÁÉÍÓÚÑ0-9 ]*$", value):
            raise ValueError("No se permiten caracteres especiales")
        return value
    
    # Verificate that the email of the guard belongs to the security company 
    @root_validator(pre=True)
    def validateEmailExtension(cls, values):
        charge = values.get('charge')
        email = values.get('email')
        
        if charge == 'Vigilante' and email:
            if not email.endswith("@empresa.com"):
                raise ValueError("El correo debe pertenecer a la organización")
        
        return values
    
    # Verificate that both passwords are the same
    @validator('confirmPassword')
    def confirmPasswords(cls, v, values):
        if 'password' in values and v != values['password']:
            raise ValueError("Las contraseñas no coinciden")
        return v

      