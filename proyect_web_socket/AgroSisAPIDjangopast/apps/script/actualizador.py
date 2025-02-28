import os
import sys
import django
import random
import asyncio
import json
import websockets
from asgiref.sync import sync_to_async

# Asegurar que el directorio del proyecto esté en sys.path
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

# Configuración de Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'APIRest.settings')
django.setup()

from apps.IoT.models import Sensor

async def enviar_websocket(sensor_id, valor_min, valor_max):
    """Envía datos de sensores al WebSocket"""
    uri = "ws://localhost:8000/ws/sensores/"
    async with websockets.connect(uri) as websocket:
        data = {
            "sensor_id": sensor_id,
            "valor_min": valor_min,
            "valor_max": valor_max
        }
        await websocket.send(json.dumps(data))
        print(f"📡 WebSocket enviado: {data}")

async def actualizar_sensores():
    """Actualiza los valores de los sensores y envía notificación WebSocket"""
    sensores = Sensor.objects.all()

    for sensor in sensores:
        sensor.valor_min = random.uniform(0.0, 50.0)
        sensor.valor_max = random.uniform(50.0, 100.0)
        sensor.save()
        print(f"🔴 Sensor {sensor.id} actualizado")

        # Enviar datos al WebSocket
        await enviar_websocket(sensor.id, sensor.valor_min, sensor.valor_max)

if __name__ == "__main__":
    asyncio.run(actualizar_sensores())
