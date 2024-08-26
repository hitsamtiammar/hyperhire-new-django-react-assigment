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
    serialized = MenuItemSerializer(data, many = True)
    return JsonResponse({
        'data': serialized.data
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
    result_insert = repositories.insert_new_data(request_data)
    if(result_insert['status'] == 1):
        return JsonResponse({
             'status': True,
                'message': 'Success',
                'new_data': result_insert['data']
        })
    return JsonResponse(data = {
            'status': False,
            'message': result_insert['message']
        }, status = result_insert['code'])

@api_view(['PUT'])
def update(request):
    request_data = JSONParser().parse(request)
    result_update = repositories.insert_new_data(request_data)
    if(result_update['status'] == 1):
        return JsonResponse({
            'status': True,
            'message': 'Success',
        })
    return JsonResponse(data = {
        'status': False,
        'message': result_update['message']
    }, status = result_update['code'])

@api_view(['DELETE'])
def delete(request, id):
    result_delete = repositories.delete_data(id)
    if result_delete['status'] == 1:
        return JsonResponse(data = {
            'status': False,
            'message': f"Data with id {id} is not found"
        }, status = 404)
    return JsonResponse(data = {
        'status': False,
        'message': result_delete['message']
    }, status = result_delete['code'])