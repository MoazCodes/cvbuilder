from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User  
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from datetime import datetime, timedelta 
import jwt
import base64
from django.conf import settings

def generate_jwt_token(user):
    """Helper function to generate JWT token"""
    payload = {
        'user': {
            'id':user.id,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
        },
        'exp': datetime.utcnow() + timedelta(hours=7*24), 
        'iat': datetime.utcnow()
    }

    encoded_secret = base64.b64encode(settings.SECRET_KEY.encode()).decode()

    # Generate the JWT token using the encoded secret
    return jwt.encode(payload, encoded_secret, algorithm='HS256')
@api_view(['POST'])
def signup_view(request):

    first_name = request.data.get('first_name')
    last_name = request.data.get('last_name')
    email = request.data.get('email')
    password = request.data.get('password')

    try:
        validate_email(email)
    except ValidationError:
        return Response({'error': 'Invalid email format.'}, status=status.HTTP_400_BAD_REQUEST)


    if User.objects.filter(email=email).exists():
        return Response({'error': 'A user with this email already exists.'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create(
        first_name=first_name,
        last_name=last_name,
        email=email,
        password=password  
    )


    return Response({
        'user_id': user.id,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'email': user.email,
        'message':'Successfuly created'
    }, status=status.HTTP_201_CREATED)



@api_view(['POST'])
def login_view(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({'error': 'Email and password are required'}, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(username=email, password=password)


    if user is not None:
        
        token=generate_jwt_token(user)  
        return Response({
            'message':'Successfuly logined',
            'token':token
        }, status=status.HTTP_200_OK)

    return Response({'error': 'Invalid email or password'}, status=status.HTTP_401_UNAUTHORIZED)
