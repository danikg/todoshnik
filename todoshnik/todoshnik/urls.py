from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('todoshnik_api.urls')),
    path('', include('todoshnik_frontend.urls'))
]
