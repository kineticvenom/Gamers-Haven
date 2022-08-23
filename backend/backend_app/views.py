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
    url = f'https://api.rawg.io/api/games?key=81bb02dd6d494004bcd7db53fd029ae8'
    API_response = HTTP_Client.get(url)
    jsonResponse = API_response.json()
    pp.pprint(jsonResponse)


    return JsonResponse(jsonResponse)


# @api_view(['GET'])
# def games(request):
#     url = f'https://api.rawg.io/api/games?key=81bb02dd6d494004bcd7db53fd029ae8'
#     API_response = HTTP_Client.get(url)
#     jsonResponse = API_response.json()
#     name = jsonResponse['name']
#     image = jsonResponse['background_image']
#     info = jsonResponse['description_raw']
#     rating_top = jsonResponse['rating_top']
#     id = jsonResponse['id']



#     return JsonResponse({'name': name, 'image':image, 'info': info, 'rating_top':rating_top, 'id': id})

