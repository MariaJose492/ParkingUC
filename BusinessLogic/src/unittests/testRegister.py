import unittest
from unittest.mock import AsyncMock, patch
from Controllers.RegisterController import createRegisterController
from Models.register import Register
from fastapi import HTTPException
from pydantic import ValidationError
from datetime import datetime


class TestCreateRegisterController(unittest.IsolatedAsyncioTestCase):

    def setUp(self):
        # Datos válidos para las pruebas
        self.valid_register_data = Register(
            personCode=123,
            vehiclePlate="ABC123"
        )

    @patch('Controllers.RegisterController.personCollection.find_one', new_callable=AsyncMock)
    @patch('Controllers.RegisterController.registerCollection.insert_one', new_callable=AsyncMock)
    @patch('Controllers.RegisterController.isCarOrMotorbike', new_callable=AsyncMock)
    async def test_create_register_success(self, mock_is_car_or_motorbike, mock_insert, mock_find_person):
        # Configuración de los mocks
        mock_find_person.return_value = {"code": 123, "name": "John Doe"}
        mock_insert.return_value.inserted_id = "mock_id"
        mock_is_car_or_motorbike.return_value = "Carro"

        # Llamada al controlador
        result = await createRegisterController(self.valid_register_data)

        # Verificaciones
        self.assertEqual(result, "mock_id")
        mock_find_person.assert_called_once_with({"code": 123})
        mock_is_car_or_motorbike.assert_called_once_with("ABC123")
        mock_insert.assert_called_once()

    @patch('Controllers.RegisterController.personCollection.find_one', new_callable=AsyncMock)
    async def test_create_register_person_not_found(self, mock_find_person):
        # Simula que la persona no existe
        mock_find_person.return_value = None

        # Verificar que se lanza la excepción correcta
        with self.assertRaises(HTTPException) as context:
            await createRegisterController(self.valid_register_data)

        self.assertEqual(context.exception.status_code, 400)
        self.assertIn("No existe una persona con el código", context.exception.detail)


if __name__ == '__main__':
    unittest.main()
