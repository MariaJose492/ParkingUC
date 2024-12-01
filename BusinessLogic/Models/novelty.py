from pydantic import BaseModel, Field
from datetime import datetime
from typing import List

class Novelty(BaseModel):
    vehiclePlate: List[str]
    description: str
    date: datetime = Field(default_factory=datetime.now)