from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import generics
from rest_framework import pagination
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from recipes.models import Recipe
from .serializers import RecipeSerializer

class RecipeListView(generics.ListAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    pagination_class = PageNumberPagination

# @api_view(['GET'])
# def get_all_recipes(request):
#     recipes = Recipe.objects.all()
#     serializer = RecipeSerializer(recipes, many=True)
#     return Response(serializer.data)

@api_view(['GET'])
def get_recipe_by_id(request, id):
    recipe = Recipe.objects.get(id=id)
    serializer = RecipeSerializer(recipe, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def add_recipe(request):
    serializer = RecipeSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    # if not serializer.is_valid():
    #     return Response(serializer.errors)
    # serializer.save()
    # return Response(serializer.data)

@api_view(['POST'])
def update_recipe(request, id):
    recipe = Recipe.objects.get(id=id)
    serializer = RecipeSerializer(instance=recipe, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    # if not serializer.is_valid():
    #     return Response(serializer.errors)
    # serializer.save()
    # return Response(serializer.data)

@api_view(['DELETE'])
def delete_recipe(request, id):
    recipe = Recipe.objects.get(id=id)
    recipe.delete()
    return Response("Successfully deleted.")