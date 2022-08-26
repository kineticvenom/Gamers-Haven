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
    