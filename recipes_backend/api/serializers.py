from rest_framework import serializers
from recipes.models import Recipe

class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = '__all__'

    def validate(self, data):

        if len(data['name']) < 3:
            raise serializers.ValidationError({'name_error': 'Name must be at least 3 characters.'})
        
        if data['cook_minutes'] < 1 or data['cook_minutes'] > 180:
            raise serializers.ValidationError({'time_error': 'Cook time must be between 1 and 180 minutes.'})
        
        return data