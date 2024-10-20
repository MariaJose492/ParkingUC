from pydantic import BaseModel
from typing import Optional

class Person(BaseModel):
    name: str
    lastname: str
    code: int
    phone: str
    charge: str
    email: Optional[str] = None
