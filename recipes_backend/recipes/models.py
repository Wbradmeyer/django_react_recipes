from django.db import models

class Recipe(models.Model):
    name = models.CharField(max_length=200)
    cook_minutes = models.PositiveIntegerField(default=30)
    area = models.CharField(max_length=200, blank=True)
    category = models.CharField(max_length=200, blank=True)
    ingredients = models.TextField(blank=True)
    instructions = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)