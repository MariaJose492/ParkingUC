from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import base64
import cv2
import numpy as np
import matplotlib.pyplot as plt
from Controllers.CardController import process_card

router = APIRouter()

class ImagePayload(BaseModel):
    image: str

@router.post("/process/card")
async def process_card_route(payload: ImagePayload):
    
    # Endpoint to process a card image.
    # Receives a Base64-encoded image, decodes it, and passes it to CardController.py
    # to extract the information.

    # Parameters:
    # payload: object containing the Base64 encoded image.

    # Returns:
    # JSON with the processed data or an HTTP 500 error if a problem occurs.

    try:
        print("Solicitud recibida para procesar un carnét...")
        print("Decodificando imagen Base64...")

        # Decode the image in base64
        if "," in payload.image:
            image_data = base64.b64decode(payload.image.split(",")[1])
        else:
            image_data = base64.b64decode(payload.image)
        print("Imagen decodificada correctamente.")

        # Convert to NumPy matrix
        np_image = np.frombuffer(image_data, np.uint8)
        image = cv2.imdecode(np_image, cv2.IMREAD_COLOR)
        if image is None:
            raise ValueError("Error al decodificar la imagen. Asegúrate de que el formato Base64 sea correcto.")

        print("Procesando el carnét con el controlador...")
        result = process_card(image)  

        print("Carnét procesado exitosamente.")
        return result

    except Exception as e:
        print(f"Error en el backend: {str(e)}") 
        raise HTTPException(status_code=500, detail=str(e))
