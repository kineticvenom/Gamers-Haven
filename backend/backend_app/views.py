import json
import re
from unittest import result
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
import requests as HTTP_Client
import pprint
from django.core import serializers
from django.contrib.auth import authenticate, login, logout
from .models import AppUser as User
from .models import Posts, Comments,Favorites, Polls, Events
import random
from django.db.models import F
from itertools import chain
from operator import attrgetter
from django.forms.models import model_to_dict






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
    
    try:
        image = jsonResponse['data']['attributes']['coverImage']['original']
    except:
        image = f'https://wallpapers-clan.com/wp-content/uploads/2021/04/Anime-App-Icons-Settings.png'
    title = jsonResponse['data']['attributes']['canonicalTitle']
    description = jsonResponse['data']['attributes']['description']
    age = jsonResponse['data']['attributes']['ageRating']
    rating = jsonResponse['data']['attributes']['averageRating']
    episodes = jsonResponse['data']['attributes']['episodeCount']
    release = jsonResponse['data']['attributes']['startDate']
    return JsonResponse({'id':id, 'image': image, 'title': title, 'description': description, 'age': age, 'rating': rating, 'episodes': episodes, 'release': release})

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
    game_title = request.data['game_title']
    content = request.data['content']
    category = request.data['category']
    id = request.data['id']
    user_image = user.profile_image
    try:
        new_post=Posts(title=title, game_title=game_title, content=content, user=user, category=category,api_id=id, user_image = user_image)
        new_post.save()
        return JsonResponse({'Success': True})
    except:
        return JsonResponse({'Success': False})

@api_view(['GET'])
def post_get(request):
    current_id = request.GET['id']
    current_category = request.GET['category']
    
    user_posts = list(Posts.objects.filter(category=current_category, api_id = current_id).order_by('-date_posted').values())
   
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

@api_view(['GET'])
def comment_get(request):
   
    
    post=Posts.objects.get(id = request.GET['post_id'])
    
    user_comments = list(Comments.objects.filter(post = post).order_by('-date_posted').values())
   
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
        favorites = Favorites.objects.filter(user=user)
        posts = Posts.objects.filter(user=user)
        events = Events.objects.filter(user=user)


        result_list = sorted(
            chain(favorites, posts, events),

            key=attrgetter('date_posted'))

        final_results = []
        for objects in result_list:
            final_results.append(model_to_dict(objects))

        final_results = final_results[::-1]


        print(final_results[0])


        # print(favorite)
        # print('this is one thing we need', favorite[0])
        return JsonResponse({'results': final_results})


    return HttpResponse('User not found')

@api_view(['DELETE'])
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

@api_view(['DELETE'])
def event_delete(request):
    if request.user.is_authenticated:
        event=Events.objects.get(id = request.data['event_id'],  user_id= request.data['user'])
       
        if request.user.username == request.data['user']:

            try:
                event.delete()
                return HttpResponse('post deleted')
            except:
                return JsonResponse({'Success': False})
        return HttpResponse('No Permission')

    return HttpResponse('User not found')

@api_view(['DELETE'])
def poll_delete(request):
    if request.user.is_authenticated:
        poll=Polls.objects.get(id = request.data['poll_id'],  user_id= request.data['user'])
        if request.user.username == request.data['user']:

            try:
                poll.delete()
                return HttpResponse('post deleted')
            except:
                return JsonResponse({'Success': False})
        return HttpResponse('No Permission')

    return HttpResponse('User not found')


@api_view(['DELETE'])
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
def poll_create(request):
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
def poll_get(request):
    all_polls = list(Polls.objects.all().order_by('-date_posted').values())
    return JsonResponse( {'polls': all_polls})

@api_view(['PUT'])
def poll_update(request):
    
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
    
@api_view(['POST'])
def event_create(request):

    user = request.user
    activity = request.data['activity']
    if activity == "Videogame Convention" :
        activity_image = 'https://image.spreadshirtmedia.com/image-server/v1/mp/products/T1459A839PA3861PT28D1034296867W10000H5420/views/1,width=550,height=550,appearanceId=839,backgroundColor=F2F2F2/games-gaming-gamer-logo-sticker.jpg'
    if activity == "Anime Convention" :
        activity_image = 'https://scontent-sjc3-1.xx.fbcdn.net/v/t1.6435-9/50946210_2074510052638807_4331288520162279424_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=V1ss2NZEafwAX80aGnN&_nc_ht=scontent-sjc3-1.xx&oh=00_AT_7vJtnBt_B20ClTMllB1kIt-7CzKdRL1dXd1dRiGU5EQ&oe=63332E46'
    if activity == "Gaming Session" :
        activity_image = 'https://scontent-sjc3-1.xx.fbcdn.net/v/t39.30808-6/235144504_255163186424026_3350806948257466882_n.png?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=r_6WSh3WA44AX8SAjJL&_nc_ht=scontent-sjc3-1.xx&oh=00_AT-kgrFaSw0U-p65Pw9unumS4XunCQZ2g0cmbD73XY7cEA&oe=6311ABAD'
    if activity == "Anime Watching Party" :
        activity_image = 'https://global-uploads.webflow.com/5e157548d6f7910beea4e2d6/62a733025c38c84eee06da66_Anime-logo-maker%20(2).png'
    if activity == "Activity" :
        activity_image = 'https://i.pinimg.com/originals/9b/ca/20/9bca20ee55e3edd0922b1bcf67733dd8.jpg'
    title = request.data['title']
    start = request.data['start']
    end = request.data['end']
    where = request.data['where']
    interested_users = [[user.profile_image,user.username]]
    related_links = request.data['related_links']
    host_contact = request.data['host_contact']
    try:
        new_event=Events(user=user, interested_users= interested_users, activity=activity, activity_image = activity_image ,title= title, start=start, end =end, where =where, related_links=related_links, host_contact=host_contact )
        new_event.save()
        
        return JsonResponse({'Success': True})
    except Exception as e:
        print('except')
        print(str(e))
        return JsonResponse({'Success': False})

@api_view(['GET'])
def event_get(request):
    all_events = list(Events.objects.all().order_by('-date_posted').values())
    return JsonResponse( {'events': all_events})

@api_view(['PUT'])
def event_update(request):
    event_id = request.data['event_id']
    user = request.user
    user_image = user.profile_image
    user_name = user.username
    interested_users= 'interested_users'
    try:
        event =Events.objects.get(id=event_id)
        value = getattr(event, interested_users)
        value.append([user_image,user_name])
        setattr(event, interested_users, value)
        event.save()
        data = list(Events.objects.filter(id=event_id).values())
        
        return JsonResponse({'Success': True,'data':data})
    except Exception as e:
        print('except')
        print(str(e))
        return JsonResponse({'Success': False})


    