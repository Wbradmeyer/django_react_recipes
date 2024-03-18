from rest_framework.response import Response
from rest_framework.decorators import api_view
from recipes.models import Recipe
from .serializers import RecipeSerializer

@api_view(['GET'])
def get_all_recipes(request):
    recipes = Recipe.objects.all()
    serializer = RecipeSerializer(recipes, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_recipe_by_id(request, id):
    recipe = Recipe.objects.get(id=id)
    serializer = RecipeSerializer(recipe, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def add_recipe(request):
    serializer = RecipeSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors)
    serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def update_recipe(request, id):
    recipe = Recipe.objects.get(id=id)
    serializer = RecipeSerializer(instance=recipe, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['DELETE'])
def delete_recipe(request, id):
    recipe = Recipe.objects.get(id=id)
    recipe.delete()
    return Response("Successfully deleted.")