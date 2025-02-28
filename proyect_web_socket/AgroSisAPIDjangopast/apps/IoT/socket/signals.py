from django.db.models.signals import post_save
from django.dispatch import receiver
from apps.IoT.models import Sensor
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer

print("🚀 signals.py ha sido cargado correctamente (debug)")

@receiver(post_save, sender=Sensor)
def model_post_save(sender, instance, **kwargs):
    print(f"🔴 Señal ejecutada para el sensor {instance.id}")  # Agregamos un mensaje para verificar
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        "sensor_updates",  
        {
            "type": "send_message",
            "message": f"El {instance.nombre_sensor} en el cultivo de{instance.cultivo}, ubicado en {instance.ubicacion}ha sido actualizado",
        }
    )
