import json
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
import requests as HTTP_Client
import pprint
 

pp = pprint.PrettyPrinter(indent=2)


def homepage(request):
    theIndex = open('static/index.html').read()
    return HttpResponse(theIndex)

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

    