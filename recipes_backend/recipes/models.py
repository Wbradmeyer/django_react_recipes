from django.db import models

class Recipe(models.Model):
    name = models.CharField(max_length=200)
    cook_minutes = models.PositiveIntegerField(default=30)
    area = models.CharField(max_length=200)
    category = models.CharField(max_length=200)
    ingredients = models.TextField()
    instructions = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)