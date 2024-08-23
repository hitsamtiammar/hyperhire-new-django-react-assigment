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