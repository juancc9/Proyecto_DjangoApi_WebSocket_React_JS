from django.db.models.signals import post_save
from django.dispatch import receiver
from apps.IoT.models import Sensor
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer

@receiver(post_save, sender=Sensor)
def send_ws_message_on_create(sender, instance, created, **kwargs):
    """ Envía un mensaje al WebSocket cuando se crea un nuevo sensor """
    if created:  # Solo se ejecuta en la creación (POST)
        channel_layer = get_channel_layer()
        sensor_details = {
            "action": "created",
            "sensor": str(instance.fk_tipo_sensor),
            "bancal": str(instance.fk_bancal),
            "configuracion": str(instance.fk_configuracion)
        }
        async_to_sync(channel_layer.group_send)(
            "sensor_updates",
            {
                "type": "send_message",
                "message": sensor_details,
            }
        )

@receiver(post_save, sender=Sensor)
def send_ws_message_on_update(sender, instance, created, **kwargs):
    """ Envía un mensaje al WebSocket cuando se actualiza un sensor """
    if not created:  # Solo se ejecuta en la actualización (PUT)
        channel_layer = get_channel_layer()
        sensor_details = {
            "action": "updated",
            "sensor ACT": str(instance.fk_tipo_sensor),
            "bancal ACT": str(instance.fk_bancal),
            "configuracion ACT": str(instance.fk_configuracion)
        }
        async_to_sync(channel_layer.group_send)(
            "sensor_updates",
            {
                "type": "send_message",
                "message": sensor_details,
            }
        )
