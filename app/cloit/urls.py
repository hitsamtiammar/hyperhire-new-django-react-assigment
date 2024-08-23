from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('add/', views.insert, name='add'),
    path('view/', views.views_data, name='view'),
    path('update/', views.update, name='update'),
    path('delete/<id>', views.delete, name='delete')
]