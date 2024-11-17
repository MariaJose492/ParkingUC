from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import base64
import cv2
import numpy as np
from Controllers.CardController import process_card

router = APIRouter()

class ImagePayload(BaseModel):
    image: str

@router.post("/process/card")  # Asegúrate de que esté configurado como POST
async def process_card_route(payload: ImagePayload):
    try:
        print("Solicitud recibida para procesar un carnét...")
        print("Decodificando imagen Base64...")
        
        # Decodificar la imagen en base64
        if "," in payload.image:
            image_data = base64.b64decode(payload.image.split(",")[1])
        else:
            image_data = base64.b64decode(payload.image)
        print("Imagen decodificada correctamente.")

        # Convertir a matriz NumPy
        np_image = np.frombuffer(image_data, np.uint8)
        image = cv2.imdecode(np_image, cv2.IMREAD_COLOR)
        if image is None:
            raise ValueError("Error al decodificar la imagen. Asegúrate de que el formato Base64 sea correcto.")

        print("Procesando el carnét con el controlador...")
        result = process_card(image)  # Asegúrate de que este método maneje excepciones

        print("Carnét procesado exitosamente.")
        return result

    except Exception as e:
        print(f"Error en el backend: {str(e)}")  # Capturar el error
        raise HTTPException(status_code=500, detail=str(e))
