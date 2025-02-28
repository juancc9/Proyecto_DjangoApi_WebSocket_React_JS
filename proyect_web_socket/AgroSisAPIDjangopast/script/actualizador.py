import os
import django
import random

# Configuración de Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'APIRest.settings')
django.setup()

from apps.IoT.models import Sensor

def actualizar_sensores():
    sensores = Sensor.objects.all()
    for sensor in sensores:
        sensor.valor_min = random.uniform(0.0, 50.0)  # Genera un valor aleatorio entre 0.0 y 50.0
        sensor.valor_max = random.uniform(50.0, 100.0)  # Genera un valor aleatorio entre 50.0 y 100.0
        sensor.save()
        print(f"Sensor {sensor.nombre_sensor} actualizado: valor_min={sensor.valor_min}, valor_max={sensor.valor_max}")

if __name__ == "__main__":
    actualizar_sensores()
