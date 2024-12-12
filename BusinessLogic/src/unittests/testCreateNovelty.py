import unittest
from unittest.mock import AsyncMock, patch
from Controllers.NoveltyController import createNoveltyController
from Models.novelty import Novelty
from fastapi import HTTPException
from pydantic import ValidationError


class TestCreateNoveltyController(unittest.IsolatedAsyncioTestCase):

    def setUp(self):
        # Mock de datos de entrada
        self.valid_novelty_data = Novelty(
            vehiclePlate=["ABC123"],
            description="Novedad de prueba"
        )

    @patch('Controllers.NoveltyController.registerCollection.find_one', new_callable=AsyncMock)
    @patch('Controllers.NoveltyController.noveltyCollection.insert_one', new_callable=AsyncMock)
    @patch('Controllers.NoveltyController.personCollection.find_one', new_callable=AsyncMock)
    @patch('Controllers.NoveltyController.httpx.AsyncClient.post', new_callable=AsyncMock)
    
    async def testCreateNoveltySuccess(self, mock_post, mock_find_person, mock_insert, mock_find_register):
        # Configurar mocks
        mock_find_register.return_value = {"vehiclePlate": "ABC123", "dateTimeExit": None, "personCode": 123}
        mock_insert.return_value.inserted_id = "mock_id"
        mock_find_person.return_value = {
            "code": 123,
            "name": "John",
            "lastName": "Doe",
            "phone": "3001234567",
            "charge": "Cliente",
            "email": "john.doe@example.com"
        }
        mock_post.return_value.status_code = 200
        mock_post.return_value.raise_for_status = AsyncMock()

        # Llamar a la función
        result = await createNoveltyController(self.valid_novelty_data)

        # Verificar resultados
        self.assertEqual(result, "mock_id")
        mock_find_register.assert_called_once_with({"vehiclePlate": "ABC123", "dateTimeExit": None})
        mock_find_person.assert_called_once_with({"code": 123})
        mock_post.assert_called_once()

    @patch('Controllers.NoveltyController.registerCollection.find_one', new_callable=AsyncMock)
    async def testCreateNoveltyPlateNotFound(self, mock_find_register):
        # Configurar mock
        mock_find_register.return_value = None

        with self.assertRaises(HTTPException) as context:
            await createNoveltyController(self.valid_novelty_data)

        self.assertEqual(context.exception.status_code, 400)
        self.assertIn("La placa ABC123 no existe", context.exception.detail)


if __name__ == '__main__':
    unittest.main()
