from Config.DatabaseConnection import personCollection
from Models.person import Person
from bson import ObjectId


async def createPersonController(personData: Person):
    newPerson = personData.dict()
    result = await personCollection.insert_one(newPerson)
    return str(result.inserted_id)
