from django.urls import path
from .views import signup_view, login_view,add_cv,retrieveCv,editCv,deletecv,deleteallcvs

urlpatterns = [
    path('signup/', signup_view, name='signup'),
    path('login/', login_view, name='login'),
    path('addcv/', add_cv, name='add_cv'),
    path('cv/<int:id>', retrieveCv, name='retrieveCv'), 
    path('editcv/', editCv, name='editCv'), 
    path('deletecv/', deletecv, name='deletecv'), 
    path('deleteallcvs/', deleteallcvs, name='deleteallcvs'), 
]
