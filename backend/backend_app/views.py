import json
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
import requests as HTTP_Client
import pprint
from django.core import serializers
from django.contrib.auth import authenticate, login, logout
from .models import AppUser as User



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
    # print(dir(request))
    # print(dir(request._request))

    # DRF assumes that the body is JSON, and automatically parses it into a dictionary at request.data
    email = request.data['email']
    password = request.data['password']
    # user = authenticate(username=email, password=password, email=email)
    user = authenticate(username=email, password=password)
    # print('user?')
    # print(user.email)
    # print(user.password)
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
    # Make sure that you don't send sensitive information to the client, such as password hashes
    # raise Exception('oops')
    if request.user.is_authenticated:
        data = serializers.serialize("json", [request.user], fields=['email', 'username', 'profile_image'])

        return HttpResponse(data)
    else:
        return JsonResponse({'user':None})

@api_view(['GET'])
def games(request):
    url = f'https://api.rawg.io/api/games?key=81bb02dd6d494004bcd7db53fd029ae8&metacritic=90%2C100'
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
    url = f'https://kitsu.io/api/edge/anime?page[limit]=20&page[offset]=0'
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
    return JsonResponse({'image': image, 'title': title, 'description': description})

@api_view(['POST'])
def anime_search(request):
    query = request.data['query']
    url = f'https://kitsu.io/api/edge//anime?filter[text]={query}&page[limit]=20'
    response = HTTP_Client.get(url)
    jsonResponse = response.json()
    return JsonResponse(jsonResponse)

    