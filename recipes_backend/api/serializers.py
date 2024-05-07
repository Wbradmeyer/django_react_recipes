from rest_framework import serializers
from django.contrib.auth.models import User
from recipes.models import Recipe

class UserSerializer(serializers.ModelSerializer):
    confirm = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'email', 'confirm']

    def validate(self, data):

        if data['confirm'] != data['password']:
            raise serializers.ValidationError({'confirm': 'Passwords do not match.'})
        
        return data


class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = '__all__'

    def validate(self, data):

        if len(data['name']) < 3 or len(data['name']) > 200:
            raise serializers.ValidationError({'name': 'Name must be between 3 and 200 characters.'})
        
        if data['cook_minutes'] < 1 or data['cook_minutes'] > 180:
            raise serializers.ValidationError({'cook_minutes': 'Cook time must be between 1 and 180 minutes.'})
        
        if len(data['area']) < 3 or len(data['area']) > 200:
            raise serializers.ValidationError({'area': 'Area must be between 3 and 200 characters.'})
        
        if len(data['category']) < 3 or len(data['category']) > 200:
            raise serializers.ValidationError({'category': 'Category must be between 3 and 200 characters.'})
        
        if len(data['ingredients']) < 3:
            raise serializers.ValidationError({'ingredients': 'Ingredients must be more than 3 characters.'})
        
        if len(data['instructions']) < 3:
            raise serializers.ValidationError({'instructions': 'Instructions must be more than 3 characters.'})
        
        return data