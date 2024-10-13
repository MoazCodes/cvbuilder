from django.urls import path
from .views import signup_view, login_view,add_cv,retriveCv,edit_cv

urlpatterns = [
    path('signup/', signup_view, name='signup'),
    path('login/', login_view, name='login'),
    path('addcv/', add_cv, name='add_cv'),
    path('cv/<int:id>', retriveCv, name='retriveCv'), 
    path('editcv/', edit_cv, name='edit_cv'), 
]
