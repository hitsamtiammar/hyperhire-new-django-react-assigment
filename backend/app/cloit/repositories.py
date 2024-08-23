from cloit.models import MenuItem

def get_by_id(id):
    try:
       d = MenuItem.objects.get(pk = id)
       return d
    except Exception:
        return None
    
def get_all():
    try:
       d = MenuItem.objects.all()
       return d
    except Exception:
        return None

def get_all_root():
    try:
       d = MenuItem.objects.filter(parent_id__isnull = True)
       return d
    except Exception:
        return None
    
def get_all_data(id, depth = 1):
    try:
        curr_data = MenuItem.objects.get(pk = id)
        children = MenuItem.objects.filter(parent_id = id)
        children_data = []

        for child in children:
            children_data.append(get_all_data(child.menu_id, depth + 1))

        return {
            'id': curr_data.menu_id,
            'parent': curr_data.parent_id,
            'name': curr_data.name,
            'children': children_data,
            'depth': depth
        }
    except Exception:
        return []