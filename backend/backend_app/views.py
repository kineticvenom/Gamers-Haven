import json
import re
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
import requests as HTTP_Client
import pprint
from django.core import serializers
from django.contrib.auth import authenticate, login, logout
from .models import AppUser as User
from .models import Posts, Comments,Favorites, Polls
import random
from django.db.models import F



pp = pprint.PrettyPrinter(indent=2)


def homepage(request):
    theIndex = open('static/index.html').read()
    return HttpResponse(theIndex)

@api_view(['POST'])
def sign_up(request):

    
    username = request.data['username']
    

    avatar_url = f'https://avatars.dicebear.com/api/bottts/{username}.svg'

    try:
        User.objects.create_user(username=request.data['username'], password=request.data['password'], email=request.data['email'], profile_image = avatar_url)
        return JsonResponse({'Success':True})
    except Exception as e:
        print(str(e))
    return JsonResponse({'Success': False})

@api_view(['POST'])
def log_in(request):
    
    email = request.data['email']
    password = request.data['password']
    user = authenticate(username=email, password=password)

    if user is not None:
        if user.is_active:
            try:
                # access the base request, not the DRF request
                # this starts a login session for this user
                login(request._request, user)
            except Exception as e:
                print('except')
                print(str(e))
            return JsonResponse({'Success': True})
            # Redirect to a success page.
        else:
            return JsonResponse({'Success':False})
            # Return a 'disabled account' error message
    else:
        return JsonResponse({'Success':False})
        # Return an 'invalid login' error message.


@api_view(['POST'])
def log_out(request):
    logout(request)
    return JsonResponse({'success':True})




@api_view(['GET'])
def who_am_i(request):
    
    if request.user.is_authenticated:
        data = serializers.serialize("json", [request.user], fields=['email', 'username', 'profile_image'])

        return HttpResponse(data)
    else:
        return JsonResponse({'user':None})

@api_view(['GET'])
def games(request):
    
    random_page = random.randrange(1,10)

    url = f'https://api.rawg.io/api/games?key=81bb02dd6d494004bcd7db53fd029ae8&metacritic=75%2C100&page={random_page}'
    API_response = HTTP_Client.get(url)
    jsonResponse = API_response.json()
    return JsonResponse(jsonResponse)

@api_view(['POST'])
def game_detail(request):

    id = request.data['id']

    url = f'https://api.rawg.io/api/games/{id}?key=81bb02dd6d494004bcd7db53fd029ae8'

    response = HTTP_Client.get(url)
    jsonResponse = response.json()
    
    return JsonResponse(jsonResponse)

@api_view(['POST'])
def game_search(request):
    query = request.data['query']
    url = f'https://api.rawg.io/api/games?key=81bb02dd6d494004bcd7db53fd029ae8&metacritic=60%2C100&search={query}&search_exact=true&page=1'
    response = HTTP_Client.get(url)
    jsonResponse = response.json()
    return JsonResponse(jsonResponse)

@api_view(['GET'])
def anime(request):
    random_page = random.randrange(1,100)
    url = f'https://kitsu.io/api/edge/anime?page[limit]=20&page[offset]={random_page}'
    API_response = HTTP_Client.get(url)
    jsonResponse = API_response.json()
    return JsonResponse(jsonResponse)

@api_view(['POST'])
def anime_detail(request):
    
    id = request.data['id']
    
    url = f'https://kitsu.io/api/edge/anime/{id}'
    
    response = HTTP_Client.get(url)
    jsonResponse = response.json()
    title = jsonResponse['data']['attributes']['canonicalTitle']
    try:
        image = jsonResponse['data']['attributes']['coverImage']['original']
    except:
        image = f'https://wallpapers-clan.com/wp-content/uploads/2021/04/Anime-App-Icons-Settings.png'
    description = jsonResponse['data']['attributes']['description']
    return JsonResponse({'id':id, 'image': image, 'title': title, 'description': description})

@api_view(['POST'])
def anime_search(request):
    query = request.data['query']
    url = f'https://kitsu.io/api/edge//anime?filter[text]={query}&page[limit]=20'
    response = HTTP_Client.get(url)
    jsonResponse = response.json()
    return JsonResponse(jsonResponse)

@api_view(['POST'])
def post_create(request):
    
    user = request.user
    title = request.data['title']
    content = request.data['content']
    category = request.data['category']
    id = request.data['id']
    user_image = user.profile_image
    try:
        new_post=Posts(title=title, content=content, user=user, category=category,api_id=id, user_image = user_image)
        new_post.save()
        return JsonResponse({'Success': True})
    except:
        return JsonResponse({'Success': False})

@api_view(['POST'])
def post_get(request):
    current_id = request.data['id']
    current_category = request.data['category']
    
    user_posts = list(Posts.objects.filter(category=current_category, api_id = current_id).order_by('-date').values())
   
    return JsonResponse( {'posts': user_posts})


@api_view(['POST'])
def comment_create(request):
    print('request:',request.data)
    user = request.user
    content = request.data['content']
    post=Posts.objects.get(id = request.data['post_id'])
    api_id = request.data['api_id']
    user_image = user.profile_image

    try:
        
        new_comment=Comments(content=content, user=user, post = post, api_id=api_id, user_image = user_image)
        new_comment.save()
        return JsonResponse({'Success': True})
    except:
        return JsonResponse({'Success': False})

@api_view(['POST'])
def comment_get(request):
   
    
    post=Posts.objects.get(id = request.data['post_id'])
    
    user_comments = list(Comments.objects.filter(post = post).order_by('-date').values())
   
    return JsonResponse( {'comments': user_comments})

@api_view(['POST'])
def favorite_create(request):

    user = request.user
    api_id = request.data['api_id']
    category = request.data['category']
    title = request.data['title']
    image = request.data['image']
    try:
        new_favorite=Favorites(user=user, api_id=api_id, category=category, title=title, image=image)
        new_favorite.save()
        
        return JsonResponse({'Success': True})
    except:
        return JsonResponse({'Success': False})

@api_view(['GET'])
def feed_get(request) :
    if request.user.is_authenticated:
        user = request.user
        favorite = list(Favorites.objects.filter(user=user).values())
        posts = list(Posts.objects.filter(user=user).order_by('-date').values())
        comments = list(Comments.objects.filter(user=user).order_by('-date').values())
        
        return JsonResponse({'favorites':favorite,
        'posts':posts,
        'comments': comments })
    return HttpResponse('User not found')

@api_view(['POST'])
def post_delete(request):
    if request.user.is_authenticated:
        post=Posts.objects.get(id = request.data['post_id'],  user_id= request.data['user'])
        if request.user.username == request.data['user']:

            try:
                post.delete()
                return HttpResponse('post deleted')
            except:
                return JsonResponse({'Success': False})
        return HttpResponse('No Permission')

    return HttpResponse('User not found')

@api_view(['POST'])
def comment_delete(request):
    if request.user.is_authenticated:
        comment = Comments.objects.get(id = request.data['comment_id'],  user_id= request.data['user'])
        if request.user.username == request.data['user']:

            try:
                comment.delete()
                return HttpResponse('comment deleted')
            except:
                return JsonResponse({'Success': False})
        return HttpResponse('No Permission')

    return HttpResponse('User not found')
    
@api_view(['POST'])
def polls_create(request):
    user = request.user
    title = request.data['title']
    option1 = request.data['option1']
    option2 = request.data['option2']
    option3 = request.data['option3']
    option4 = request.data['option4']
    option5 = request.data['option5']
    
    
    try:
        new_poll=Polls(title=title,user=user, option1=option1, option2=option2, option3=option3, option4=option4,option5=option5  )
        new_poll.save()
        
        return JsonResponse({'Success': True})
    except:
        return JsonResponse({'Success': False})

@api_view(['GET'])
def polls_get(request):
    all_polls = list(Polls.objects.all().order_by('-date').values())
    return JsonResponse( {'polls': all_polls})

@api_view(['PUT'])
def polls_update(request):
    
    poll_id= request.data['poll_id']
    choice= request.data['option']
    
    try:
        
        poll =Polls.objects.get(id=poll_id)
        value = getattr(poll, choice)
        setattr(poll, choice, value+1)
        poll.save()
        data = list(Polls.objects.filter(id=poll_id).values())
        
        return JsonResponse({'Success': True,'data':data,'choice':choice})
    except Exception as e:
        print('except')
        print(str(e))
        return JsonResponse({'Success': False})
    
