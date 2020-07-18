from django.urls import path, re_path

from .views import index

urlpatterns = [
    path('', index),
    re_path('^login|sign-up/$', index),
]
