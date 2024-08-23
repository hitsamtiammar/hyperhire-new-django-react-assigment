from django.db import models
import uuid
# Create your models here.


class MenuItem(models.Model):
    menu_id = models.UUIDField( primary_key=True, default=uuid.uuid4, unique=True,editable=False)
    name = models.CharField(max_length=500,null=True)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
