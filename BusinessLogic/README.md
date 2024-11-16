Para la ejecución de este microservicio es necesario instalar:

* Python: Lenguaje de desarrollo

FastAPI: Framework Dde desarrollo usado, se instala con el siguiente comando en la consola:
* pip install 'fastapi[all]'

Para poder tener el archivo .env, la siguiente librería:
* pip install python-dotenv

Para la conexión de la base de datos
* pip install motor 

Para el manejo del CORS para manejar solicitudes de origen cruzado
* pip install fastapi[all] 

El siguiente es un el comando para ejecutar el microservicio:
* uvicorn main:app --reload 