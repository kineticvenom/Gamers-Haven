from django.shortcuts import render
from django.http import HttpResponse, JsonResponse


def homepage(request):
    theIndex = open('static/index.html').read()
    return HttpResponse(theIndex)
