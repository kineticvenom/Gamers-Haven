
from django.urls import path
from . import views

urlpatterns = [
    
    path('', views.homepage, name='homepage'),
    path('api/games', views.games),
    path('api/game/details', views.game_detail),
    path('api/game/search', views.game_search),
    path('api/anime', views.anime),
    path('api/anime/details', views.anime_detail),
    path('api/anime/search', views.anime_search),

]
