from django.urls import path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt import views as jwt_views

from .views import (TodoItemApiView, TodoListApiView, TodoListItemsView,
                    UserView, get_colors)

router = DefaultRouter()
router.register('todo_lists', TodoListApiView, 'todo_list')
router.register('todo_items', TodoItemApiView, 'todo_item')

urlpatterns = [
    path('todo_list_items/<int:pk>/', TodoListItemsView.as_view()),
    path('get_colors/', get_colors),

    path('token/', jwt_views.TokenObtainPairView.as_view()),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view()),

    path('sign_up/', UserView.as_view())
]

urlpatterns += router.urls
