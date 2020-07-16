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
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=255, blank=True, null=True)
    color = models.CharField(max_length=2, choices=COLORS, default='Wh')
    date_create = models.DateTimeField(auto_now_add=True)
    date_update = models.DateTimeField(auto_now=True)
    owner = models.ForeignKey('auth.User',
                              related_name='owner',
                              on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.name}: {self.id}'


class TodoItem(models.Model):
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=255, blank=True, null=True)
    completed = models.BooleanField(default=False)
    completion_date = models.DateTimeField(blank=True, null=True)
    todo_list = models.ForeignKey('todoshnik_api.TodoList',
                                  related_name='todo_list',
                                  on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.title}: {self.id}'
