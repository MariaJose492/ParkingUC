import cv2
from pytesseract import pytesseract
import re
import json
import numpy as np
import matplotlib.pyplot as plt

def process_card(image):

    # Processes an image of an ID card to extract the following information: first name, last name, code and role.
    # Preprocessing steps are performed on the image with OPENCV to improve the quality before using OCR (Tesseract).
    
    # Parameters:
    # image: NumPy array representing the captured image.

    # Returns:
    # json_data: JSON string with the data extracted from the card.
    
    try:
        # Card coordinates
        x, y, w, h = 80, 80, 470, 320

        cropped_image = image[y:y+h, x:x+w]
        print("Imagen recortada correctamente.")

        enhanced = cv2.bilateralFilter(cropped_image, 7, 11, 11)
        print("Imagen suavizada")

        enhanced = cv2.convertScaleAbs(enhanced, alpha=1.5, beta=20)
        print("Brillo y contraste ajustados.")

        kernel = np.array([[-1, -1, -1], [-1, 9, -1], [-1, -1, -1]])
        sharpened = cv2.filter2D(enhanced, -1, kernel)
        print("Nitidez de la imagen mejorada.")

        gray = cv2.cvtColor(sharpened, cv2.COLOR_BGR2GRAY)
        print("Imagen convertida a escala de grises.")

        _, thresholded = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)
        print("Imagen convertida a blanco y negro")

        # ver_foto(thresholded)

        extracted_text = pytesseract.image_to_string(thresholded)
        print("Texto extraído del carnét:", extracted_text)

        # Processing the lines extracted from the text to structure them
        lines = extracted_text.splitlines()
        lines = [line.strip() for line in lines if line.strip()]
        card_data = {
            "name": "",
            "lastName": "",
            "code": "",
            "charge": ""
        }

        # Validate and extract data from pytesseract text
        if len(lines) >= 4: 
            card_data["name"] = re.sub(r'[^a-zA-Z\s]', '', lines[3]).strip()
            card_data["lastName"] = re.sub(r'[^a-zA-Z\s]', '', lines[4]).strip()

            for line in lines:
                if "Doe" in line or "Doc" in line:
                    raw_code = line.split(":")[-1].strip()
                    card_data["code"] = re.sub(r'[^0-9]', '', raw_code)

                if "Estudiante" in line or "Estudrante" in line:
                    card_data["charge"] = "Estudiante"
                if "Docente" in line:
                    card_data["charge"] = "Docente"

        print("Datos extraídos del carnét:")
        print(card_data)

        json_data = json.dumps(card_data, indent=4)
        print("Datos en formato JSON:")
        print(json_data)

        return json_data

    except FileNotFoundError as e:
        print(f"Error: {str(e)}")
        return json.dumps({"error": "Archivo no encontrado"}, indent=4)

    except Exception as e:
        print(f"Error durante el procesamiento: {str(e)}")
        return json.dumps({"error": "Error durante el procesamiento"}, indent=4)

# Photo verification function
def ver_foto(image):        
    print("Mostrando la imagen")
    plt.imshow(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
    plt.axis('off')
    plt.show()
