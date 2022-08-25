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
    user = models.ForeignKey(AppUser,to_field="username" ,on_delete=models.CASCADE,related_name='user')
    user_image = models.TextField(null=True)
    
    