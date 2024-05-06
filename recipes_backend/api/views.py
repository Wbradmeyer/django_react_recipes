from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import generics
from rest_framework import pagination
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from recipes.models import Recipe
from .serializers import RecipeSerializer, UserSerializer


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

from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404

@api_view(['POST'])
def login(request):
    user = get_object_or_404(User, username=request.data['username'])
    if not user.check_password(request.data['password']):
        return Response({'detail':'Not found'}, status=status.HTTP_404_NOT_FOUND)
    token, created = Token.objects.get_or_create(user=user)
    serializer = UserSerializer(instance=user)
    return Response({'token': token.key, 'user': serializer.data})

@api_view(['POST'])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        user = User.objects.get(username=request.data['username'])
        user.set_password(request.data['password'])
        user.save()
        token = Token.objects.create(user=user)
        return Response({'token': token.key, 'user': serializer.data})
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def test_token(request):
    return Response("passed for {}".format(request.user.email))