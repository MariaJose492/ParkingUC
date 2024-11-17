import cv2
from pytesseract import pytesseract
import re 
import json

def process_card(image):

    try:
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

        enhanced = cv2.bilateralFilter(gray, 11, 17, 17)

        extracted_text = pytesseract.image_to_string(enhanced)

        print("Texto extraído del carnét:", extracted_text)

        lines = extracted_text.splitlines()
        lines = [line.strip() for line in lines if line.strip()]
        card_data = {
            "name": "",
            "lastName": "",
            "code": "",
        }

        if len(lines) >= 3: 
            card_data["name"] = re.sub(r'[^a-zA-Z\s]', '', lines[1])
            card_data["lastName"] = re.sub(r'[^a-zA-Z\s]', '', lines[2])
            for line in lines:
                if "Doe" in line or "Doc" in line:  
                    raw_code = line.split(":")[-1].strip()
                    card_data["code"] = re.sub(r'[^0-9]', '', raw_code)

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
