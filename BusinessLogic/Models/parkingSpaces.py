from pydantic import BaseModel

class ParkingSpaces(BaseModel):
    carSpaces: int
    motoSpaces: int
