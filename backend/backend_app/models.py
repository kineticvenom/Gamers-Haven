from statistics import mode
from django.db import models
from django.contrib.auth.models import (AbstractUser)
from django.utils import timezone




class AppUser(AbstractUser):
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )
    profile_image = models.TextField(null=True)


    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

class Posts(models.Model):
    
    title = models.CharField(max_length=80)
    content = models.TextField()
    date = models.DateTimeField(default=timezone.now)
    api_id = models.CharField(max_length=80)
    category = models.TextField()
    user = models.ForeignKey(AppUser,to_field="username" ,on_delete=models.CASCADE,related_name='user_post')
    user_image = models.TextField(null=True)

class Comments(models.Model):
    
    user = models.ForeignKey(AppUser,to_field="username" ,on_delete=models.CASCADE,related_name='user_comment')
    post = models.ForeignKey(Posts,on_delete=models.CASCADE)
    content = models.TextField()
    date = models.DateTimeField(default=timezone.now)
    api_id = models.CharField(max_length=80)
    user_image = models.TextField(null=True)
    
class Favorites(models.Model):
    
    user = models.ForeignKey(AppUser,on_delete=models.CASCADE)
    api_id = models.CharField(max_length=80)
    category = models.TextField()
    title = models.CharField(max_length=100)
    image = models.TextField(null=True)

    class Meta:
        unique_together = (("user", "api_id"))

class Polls(models.Model):
    
    user = models.ForeignKey(AppUser,on_delete=models.CASCADE)
    title = models.CharField(max_length=80)
    votes1 = models.IntegerField(default=0)
    votes2 = models.IntegerField(default=0)
    option1 = models.CharField(max_length=40)
    option2 = models.CharField(max_length=40)
    # option3 = models.CharField(max_length=40,null=True)
    # option4 = models.CharField(max_length=40,null=True)
    # option5 = models.CharField(max_length=40,null=True)

    favorites = models.IntegerField(default=0)
    # date = models.DateTimeField(default=timezone.now)

    