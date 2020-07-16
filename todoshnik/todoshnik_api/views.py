from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny

from .serializers import (TodoListSerializer,
                          TodoItemSerializer,
                          UserSerializer)
from .models import TodoList, TodoItem, COLORS


class UserView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()

            if user is not None:
                return Response(data={'user': serializer.data},
                                status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors,
                        status=status.HTTP_400_BAD_REQUEST)


class TodoListApiView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = TodoListSerializer

    def get_queryset(self):
        return TodoList.objects.filter(owner=self.request.user)


class TodoItemApiView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = TodoItemSerializer
    queryset = TodoItem.objects.all()


class TodoListItemsView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, pk):
        todo_items = TodoItem.objects.filter(todo_list=pk)
        serializer = TodoItemSerializer(todo_items, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        todo_items = TodoItem.objects.filter(todo_list=pk)

        for item in todo_items:
            item.completed = True
            item.save()

        serializer = TodoItemSerializer(todo_items, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)


@api_view(('GET',))
@permission_classes([IsAuthenticated, ])
def get_colors(request):
    return Response(data=COLORS, status=status.HTTP_200_OK)
