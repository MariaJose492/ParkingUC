from Config.DatabaseConnection import personCollection
from Models.person import Person
from bson import ObjectId


async def createPerson(personData: Person):
    newPerson = personData.dict()
    result = await personCollection.insert_one(newPerson)
    return str(result.inserted_id)
