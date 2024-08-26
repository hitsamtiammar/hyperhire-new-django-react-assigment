from cloit.models import MenuItem
from rest_framework.parsers import JSONParser 
from cloit.serializers import MenuItemSerializer

def get_by_id(id):
    try:
       d = MenuItem.objects.get(pk = id)
       return d
    except Exception as err:
        print('An exception on get_by_id')
        print(err)
        return None
    
def get_all():
    try:
       d = MenuItem.objects.all()
       return d
    except Exception as err:
        print('An exception on get_all')
        print(err)
        return None

def get_all_root():
    try:
       d = MenuItem.objects.filter(parent_id__isnull = True)
       return d
    except Exception as err:
        print('An exception on get_all_root')
        print(err)
        return []
    
def get_all_data(id, depth = 1):
    try:
        curr_data = MenuItem.objects.get(pk = id)
        children = MenuItem.objects.filter(parent_id = id)
        children_data = []

        for child in children:
            children_data.append(get_all_data(child.menu_id, depth + 1))

        return {
            'id': curr_data.menu_id,
            'parent': curr_data.parent.name if curr_data.parent is not None else None,
            'name': curr_data.name,
            'children': children_data,
            'depth': depth
        }
    except Exception as err:
        print('An exception on get_all_data')
        print(err)
        return []

def insert_new_data(request_data):
    try:
        new_data = MenuItem(name = request_data['name'])
        if 'parent' in request_data and request_data['parent'] is not None:
            parent_id =  request_data['parent']
            parent = get_by_id(parent_id)
            if parent is None:
                return {'status': 0, 'code': 404, 'data': None, 'message': 'Parent is empty'}
            new_data.parent = parent
        new_data.save()
        serialized = MenuItemSerializer(new_data)
        return {
            'status': 1,
            'data': serialized.data,
            'message': 'Success',
            'code': 200
        }
    except Exception as err:
        print('An exception on insert_new_data')
        print(err)
        return {'status': 0, 'code': 500, 'data': None, 'message': 'An error occured on insert data'}

def update_data(request_data):
    try:
        id = request_data['id']
        curr_data = get_by_id(id)
        if curr_data is None:
            return {'status': 0, 'code':404, 'data': None, 'message': f'data with id {id} is not found'}
        curr_data.name = request_data['name']
        curr_data.save()
        return {'status': 1, 'code':200, 'data': None, 'message': 'Success'}
    except Exception as err:
        print('An exception on insert_new_data')
        print(err)
        return {'status': 0, 'code':500, 'data': None, 'message': 'An error occured on update data'}
    
def delete_data(id):
    try:
        curr_data = get_by_id(id)
        if curr_data is None:
            return {'status': 1, 'code':404, 'data': None, 'message': 'data with id {id} is not found'}
        curr_data.delete()
        return {'status': 1, 'code':200, 'data': None, 'message': 'Success'}
    except Exception as err:
        print('An exception on delete_data')
        print(err)
        return {'status': 0, 'code':500, 'data': None, 'message': 'An error occured on delete data'}