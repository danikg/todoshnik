from django.db import models


COLORS = (
    ('Wh', 'White'),
    ('Rd', 'Red'),
    ('Yw', 'Yellow'),
    ('Gn', 'Green'),
    ('Bl', 'Blue'),
    ('Cn', 'Cyan'),
)


class TodoList(models.Model):
    """Store information about todo list."""

    name = models.CharField(max_length=50, verbose_name='Name')
    description = models.CharField(max_length=255, blank=True, null=True,
                                   verbose_name='Description')

    color = models.CharField(max_length=2, choices=COLORS, default='Wh',
                             verbose_name='Background color')

    date_create = models.DateTimeField(auto_now_add=True,
                                       verbose_name='Creation date')

    date_update = models.DateTimeField(auto_now=True,
                                       verbose_name='Update date')

    owner = models.ForeignKey('auth.User', related_name='owner',
                              on_delete=models.CASCADE,
                              verbose_name='Owner')

    def __str__(self):
        """Unicode representation for a todo list."""

        return f'{self.name}: {self.id}'


class TodoItem(models.Model):
    """Store information about todo item."""

    title = models.CharField(max_length=50, verbose_name='Title')
    description = models.CharField(max_length=255, blank=True, null=True,
                                   verbose_name='Description')

    completed = models.BooleanField(default=False, verbose_name='Completed')
    completion_date = models.DateTimeField(blank=True, null=True,
                                           verbose_name='Completion date')

    todo_list = models.ForeignKey('todoshnik_api.TodoList',
                                  related_name='todo_list',
                                  on_delete=models.CASCADE,
                                  verbose_name='Todo list')

    def __str__(self):
        """Unicode representation for a todo list."""

        return f'{self.title}: {self.id}'
