from rest_framework import status, viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import COLORS, TodoItem, TodoList
from .serializers import TodoItemSerializer, TodoListSerializer, UserSerializer


class UserView(APIView):
    """View for create new users."""

    permission_classes = (AllowAny,)

    def post(self, request):
        """Create a new user."""

        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()

            if user is not None:
                return Response(data={'user': serializer.data},
                                status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors,
                        status=status.HTTP_400_BAD_REQUEST)


class TodoListApiView(viewsets.ModelViewSet):
    """View for create/read/update/delete Todo Lists."""

    permission_classes = (IsAuthenticated,)
    serializer_class = TodoListSerializer

    def get_queryset(self):
        """Return todo lists created by owner."""

        return TodoList.objects.filter(owner=self.request.user)


class TodoItemApiView(viewsets.ModelViewSet):
    """View for create/read/update/delete Todo Items."""

    permission_classes = (IsAuthenticated,)
    serializer_class = TodoItemSerializer
    queryset = TodoItem.objects.all()


class TodoListItemsView(APIView):
    """View for read/update todo items in a specific todo list."""

    permission_classes = (IsAuthenticated,)

    def get(self, request, pk: int):
        """Return todo items by a specific todo list."""

        todo_items = TodoItem.objects.filter(todo_list=pk)
        serializer = TodoItemSerializer(todo_items, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk: int):
        """Mark completed todo items by a specific todo list."""

        todo_items = TodoItem.objects.filter(todo_list=pk)

        for item in todo_items:
            item.completed = True
            item.save()

        serializer = TodoItemSerializer(todo_items, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)


@api_view(('GET',))
@permission_classes([IsAuthenticated, ])
def get_colors(request):
    """Return available colors."""

    return Response(data=COLORS, status=status.HTTP_200_OK)
