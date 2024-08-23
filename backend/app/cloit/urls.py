from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('add/', views.insert, name='add'),
    path('view-root/', views.views_data_root, name='view_root'),
    path('view-data/<id>', views.views_data_data, name='view_data'),
    path('update/', views.update, name='update'),
    path('delete/<id>', views.delete, name='delete')
]