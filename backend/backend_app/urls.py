
from django.urls import path
from . import views

urlpatterns = [
    
    path('', views.homepage, name='homepage'),
    path('api/games', views.games),
    path('api/game/details', views.game_detail),

]
