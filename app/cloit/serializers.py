from rest_framework import serializers 
from cloit.models import MenuItem
 
 
class MenuItemSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = MenuItem
        fields = ('menu_id',
                  'name',
                  'parent',
                  'created_at',
                  'updated_at')