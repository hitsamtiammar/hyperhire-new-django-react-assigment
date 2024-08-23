from django.shortcuts import render 
from django.http import JsonResponse, HttpRequest
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser 
from cloit.serializers import MenuItemSerializer
from cloit.models import MenuItem
import cloit.repositories as repositories 

def index(request):
    return JsonResponse({
        'message': 'Run'
    })

@api_view(['GET'])
def views_data_root(request):
    data = repositories.get_all_root()
    return JsonResponse({
        'data': data
    })

@api_view(['GET'])
def views_data_data(request, id):
    data = repositories.get_all_data(id)
    return JsonResponse({
        'data': data
    })

@api_view(['POST'])
def insert(request):
    request_data = JSONParser().parse(request)
    new_data = MenuItem(name = request_data['name'])
    if 'parent' in request_data and request_data['parent'] is not None:
        parent_id =  request_data['parent']
        parent = repositories.get_by_id(parent_id)
        if parent is None:
            return JsonResponse(data = {
                'status': False,
                'message': f"Parent with id {parent_id} is not found"
            }, status = 404)
        new_data.parent = parent
    new_data.save()
    serialized = MenuItemSerializer(new_data)

    return JsonResponse({
        'status': True,
        'message': 'Success',
        'new_data': serialized.data
    })

@api_view(['PUT'])
def update(request):
    request_data = JSONParser().parse(request)
    id = request_data['id']
    curr_data = repositories.get_by_id(id)
    if curr_data is None:
        return JsonResponse(data = {
            'status': False,
            'message': f"Data with id {id} is not found"
        }, status = 404)
    curr_data.name = request_data['name']
    curr_data.save()
    return JsonResponse({
        'status': True,
        'message': 'Success',
    })

@api_view(['DELETE'])
def delete(request, id):
    curr_data = repositories.get_by_id(id)
    if curr_data is None:
        return JsonResponse(data = {
            'status': False,
            'message': f"Data with id {id} is not found"
        }, status = 404)
    curr_data.delete()
    return JsonResponse({
        'status': True,
        'message': 'Success',
    })