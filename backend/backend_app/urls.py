
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
    path('post/delete', views.post_delete),
    path('comment/create', views.comment_create),
    path('comment/get', views.comment_get),
    path('comment/delete', views.comment_delete),
    path('favorite/create', views.favorite_create),
    path('feed/get', views.feed_get),
    path('poll/create', views.poll_create),
    path('poll/get', views.poll_get),
    path('poll/update', views.poll_update),
    path('poll/delete', views.poll_delete),
    path('event/create', views.event_create),
    path('event/get', views.event_get),
    path('event/update', views.event_update),
    path('event/delete', views.event_delete),
]
