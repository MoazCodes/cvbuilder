from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
import jwt
from django.conf import settings
from datetime import datetime, timedelta
from rest_framework import serializers

# Serializer for User model
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # Check if a user with this email already exists
        if User.objects.filter(email=validated_data['email']).exists():
            raise serializers.ValidationError({"error": "A user with this email already exists."})
        
        # Create a new user instance
        user = User(
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email'],
            username=validated_data['email']  # Using email as the username
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

def generate_jwt_token(user):
    """Helper function to generate JWT token"""
    payload = {
        'user': {
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
        },
        'exp': datetime.utcnow() + timedelta(hours=settings.JWT_EXPIRATION_TIME),  # Make expiration configurable
        'iat': datetime.utcnow()
    }
    return jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')

@api_view(['POST'])
def signup_view(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        token = generate_jwt_token(user)
        return Response({'token': token, 'user_id': user.id, 'data': serializer.data}, status=status.HTTP_201_CREATED)
    
    # Return the first error message under the key 'error'
    error_message = serializer.errors.get('email', serializer.errors)
    return Response({'error': str(error_message[0])}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login_view(request):
    email = request.data.get('email')  # Use email as input
    password = request.data.get('password')

    if not email or not password:
        return Response({'error': 'Email and password are required'}, status=status.HTTP_400_BAD_REQUEST)

    # Authenticate using the email (which is the username in this case)
    user = authenticate(username=email, password=password)
    if user is not None:
        token = generate_jwt_token(user)
        return Response({'token': token, 'user_id': user.id, 'data': {'email': user.email}}, status=status.HTTP_200_OK)
    
    return Response({'error': 'Invalid email or password'}, status=status.HTTP_401_UNAUTHORIZED)
