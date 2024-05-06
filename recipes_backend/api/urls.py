from django.urls import path
from . import views

urlpatterns = [
    path('recipes', views.RecipeListView.as_view()),
    path('recipes/<int:id>', views.get_recipe_by_id, name='get_one'),
    path('recipes/add', views.add_recipe, name='add'),
    path('recipes/update/<int:id>', views.update_recipe, name='update'),
    path('recipes/delete/<int:id>', views.delete_recipe, name='delete'),
    path('login', views.login),
    path('register', views.register),
    path('test_token', views.test_token),
]