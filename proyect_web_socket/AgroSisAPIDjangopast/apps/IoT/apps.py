from django.apps import AppConfig
from django.db.models.signals import post_save

class IotConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.IoT'

    def ready(self):
        from apps.IoT.models import Sensor
        from apps.IoT.socket.signals import model_post_save  # Importar la señal directamente
        post_save.connect(model_post_save, sender=Sensor)  # Conectar la señal manualmente
        print("✅ Señal post_save conectada correctamente")
