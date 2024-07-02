from django.contrib import admin
from django.urls import path
from auth_app.views import login_view, signup_view, logout_view, check_login
from healthcare_app.views import  add_guardian, update_guardian, view_guardian
urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', login_view, name='login'),
    path('signup/', signup_view, name='signup'),
    path('logout/', logout_view, name='logout'),
    path('check_login/', check_login, name='check_login'),
    path('guardian/add/', add_guardian, name='add_guardian'),
    path('guardian/update/', update_guardian, name='update_guardian'),
    path('guardian/view/', view_guardian, name='view_guardian'),
]