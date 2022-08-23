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


