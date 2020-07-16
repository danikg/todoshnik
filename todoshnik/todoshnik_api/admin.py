from django.contrib import admin

from .models import TodoList, TodoItem


class TodoListAdmin(admin.ModelAdmin):
    list_display = ('name', 'date_create', 'owner')


class TodoItemAdmin(admin.ModelAdmin):
    list_display = ('title', 'completed',
                    'completion_date', 'todo_list')


admin.site.register(TodoList, TodoListAdmin)
admin.site.register(TodoItem, TodoItemAdmin)
