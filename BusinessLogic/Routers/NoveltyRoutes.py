from Models.novelty import Novelty
from Controllers.NoveltyController import *
from fastapi import APIRouter, HTTPException

router = APIRouter()

# Path to create a novelty
@router.post("/createNovelty/")
async def createNoveltyRoute(novelty: Novelty):
    try:
        noveltyId = await createNoveltyController(novelty)
        return {"message": "Novedad creada con éxito", "novelty_id": noveltyId}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Path to list all novelties
@router.get("/listNovelties/")
async def listNoveltiesRoute():
    try:
        novelties = await listNoveltyController()
        return novelties
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# route to eliminate a person if they have records with an exit greater than 15 days
@router.delete("/deleteNovelty/{noveltyId}")
async def deleteNoveltyRoute(noveltyId: str):
    try:
        result = await deleteNoveltyController(noveltyId)
        return result
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    
