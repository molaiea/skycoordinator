
from django.urls import path
from .views import home_view, get_coords, sendData


urlpatterns = [
    
    path('',home_view),
    path('get_coords', get_coords, name='get_coords'),
    path('sendData', sendData, name="sendData"),

]
