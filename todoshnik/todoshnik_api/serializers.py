from django.contrib.auth.models import User
from rest_framework import serializers

from .models import TodoItem, TodoList


class TodoListSerializer(serializers.ModelSerializer):
    """Todo list serializer."""

    class Meta:
        model = TodoList
        fields = '__all__'


class TodoItemSerializer(serializers.ModelSerializer):
    """Todo item serializer."""

    class Meta:
        model = TodoItem
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    """User serializer."""

    email = serializers.EmailField(required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'email')

    def create(self, validated_data: dict):
        """
        Verify the password and, if successful, create a new user.
        """

        password = validated_data.get('password', None)
        instance = self.Meta.model(**validated_data)

        if password is not None:
            instance.set_password(password)

        instance.save()
        return instance
