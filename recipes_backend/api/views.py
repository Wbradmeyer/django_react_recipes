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

# These are the basic CRUD Methods

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

@api_view(['POST'])
def update_recipe(request, id):
    recipe = Recipe.objects.get(id=id)
    serializer = RecipeSerializer(instance=recipe, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_recipe(request, id):
    recipe = Recipe.objects.get(id=id)
    recipe.delete()
    return Response("Successfully deleted.")

# These methods are for login and registration

@api_view(['POST'])
def login(request):
    return Response({})

@api_view(['POST'])
def register(request):
    return Response({})

@api_view(['GET'])
def test_token(request):
    return Response({})