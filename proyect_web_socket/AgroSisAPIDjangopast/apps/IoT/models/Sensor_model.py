from django.db import models
from apps.Trazabilidad.models.Cultivo import Cultivo

class Sensor(models.Model):
    nombre_sensor = models.CharField(max_length=50, default='Default Nombre Sensor')
    tipo_sensor = models.CharField(max_length=50, default='Default Tipo Sensor')
    cultivo = models.CharField(max_length=50, default='Default cultivo')
    unidad_medida = models.CharField(max_length=50, default='Default unidad_medida')
    ubicacion = models.FloatField(default=0.0)
    valor_min = models.FloatField(default=0.0)
    valor_max = models.FloatField(default=0.0)

    def __str__(self):
        return str(self.nombre_sensor)
