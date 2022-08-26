
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
    path('login', views.log_in),
    path('signup', views.sign_up),
    path('logout', views.log_out),
    path('whoami', views.who_am_i),
    path('post/create', views.post_create),
    path('post/get', views.post_get),
    path('comment/create', views.comment_create),
    path('comment/get', views.comment_get),
    path('favorite/create', views.favorite_create),


]
