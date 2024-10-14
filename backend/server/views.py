from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import check_password
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User  
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from datetime import datetime, timedelta 
import jwt
import base64
from django.conf import settings
from .models import CV,Skill, Project, Experience, ExtracurricularActivity

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

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({'error': 'Invalid email or password'}, status=status.HTTP_401_UNAUTHORIZED)
    
    if password == user.password :
        token=generate_jwt_token(user)  
        return Response({
            'message':'Successfuly logined',
            'token':token
        }, status=status.HTTP_200_OK)

    return Response({'error': 'Invalid email or password'}, status=status.HTTP_401_UNAUTHORIZED)


# add cv

@api_view(['POST'])
def add_cv(request):
    data = request.data
    
    # Extract user ID
    user_id = data.get('user_id')
    
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({"error": "User does not exist."}, status=status.HTTP_404_NOT_FOUND)

    # Check for existing CV with the same name for the user
    cv_name = data.get('cv_name')
    existing_cv = CV.objects.filter(user=user, cv_name=cv_name).first()
    if existing_cv:
        return Response({"error": "A CV with this name already exists. please change cv name to other name"}, status=status.HTTP_400_BAD_REQUEST)

    # Create a new CV instance
    cv = CV.objects.create(
        user=user,
        cv_name=data.get('cv_name'),
        job_title=data.get('job'),
        city=data.get('city'),
        country=data.get('country'),
        email=data.get('email'),
        objective=data.get('objective'),
        degree=data.get('degree'),
        school_name=data.get('school'),
        school_department=data.get('school_department'),
        school_city=data.get('school_city'),
        school_country=data.get('school_country'),
        start_school_date=data.get('start_school_date'),
        end_school_date=data.get('end_school_date')
    )

    # Handle skills
    skills_data = data.get('skills', [])
    for skill_name in skills_data:
        skill, created = Skill.objects.get_or_create(skill_name=skill_name)
        cv.skills.add(skill)

    # Handle projects
    projects_data = data.get('projects', [])
    for project_data in projects_data:
        project = Project.objects.create(
            project_name=project_data.get('project_name'),
            project_date=project_data.get('project_date'),
            project_details=project_data.get('project_details')
        )
        cv.projects.add(project)

    # Handle experiences
    experiences_data = data.get('experiences', [])
    for experience_data in experiences_data:
        experience = Experience.objects.create(
            job_title=experience_data.get('job_title'),
            company=experience_data.get('company'),
            start_job_date=experience_data.get('start_date'),
            end_job_date=experience_data.get('end_date'),
            job_description=experience_data.get('job_description')
        )
        cv.experiences.add(experience)

    # Handle extracurricular activities
    extracurricular_data = data.get('extra_curricular_activities', [])
    for activity_name in extracurricular_data:
        activity, created = ExtracurricularActivity.objects.get_or_create(activity_name=activity_name)
        cv.extracurricular_activities.add(activity)

    return Response({"message": "CV added successfully"}, status=status.HTTP_201_CREATED)



@api_view(['GET'])
def retriveCv(request, id):
    try:
        cvs = CV.objects.filter(user=id)
        data =[ {
            "cv_id":cv.id,
            "cv_name":cv.cv_name,
            "user_id": cv.user.id,
            "job": cv.job_title,
            "city": cv.city,
            "country": cv.country,
            "email": cv.email,
            "objective": cv.objective,
            "degree": cv.degree,
            "school": cv.school_name,
            "school_department": cv.school_department,
            "school_city": cv.school_city,
            "school_country": cv.school_country,
            "start_school_date": cv.start_school_date,
            "end_school_date": cv.end_school_date,
            "skills": [skill.skill_name for skill in cv.skills.all()],
            "projects": [
                {
                    "project_name": project.project_name,
                    "project_date": project.project_date,
                    "project_details": project.project_details,
                } for project in cv.projects.all()
            ],
            "experiences": [
                {
                    "job_title": experience.job_title,
                    "company": experience.company,
                    "start_date": experience.start_job_date,
                    "end_date": experience.end_job_date,
                    "job_description": experience.job_description,
                } for experience in cv.experiences.all()
            ],
            "extra_curricular_activities": [
                activity.activity_name for activity in cv.extracurricular_activities.all()
            ],
        }for cv in cvs
        ]
        return Response({"data":data}, status=status.HTTP_200_OK)
    except CV.DoesNotExist:
        return Response({"error": "CV not found."}, status=status.HTTP_404_NOT_FOUND)



#edit
@api_view(['PUT'])
def edit_cv(request):
    data = request.data
    
    # Extract user ID and CV ID from the request data
    cv_id = data.get('cv_id')
    user_id = data.get('user_id')
    new_cv_name = data.get('cv_name')
    
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({"error": "User does not exist."}, status=status.HTTP_404_NOT_FOUND)

    try:
        cv = CV.objects.get(id=cv_id, user=user)
    except CV.DoesNotExist:
        return Response({"error": "CV not found."}, status=status.HTTP_404_NOT_FOUND)

    # Check for existing CV with the new name for the user
    existing_cv = CV.objects.filter(user=user, cv_name=new_cv_name).first()
    if existing_cv and existing_cv.id != cv.id:
        return Response({"error": "A CV with this name already exists. Please change CV name to another name."}, status=status.HTTP_400_BAD_REQUEST)

    # Update CV fields
    cv.cv_name = new_cv_name
    cv.job_title = data.get('job', cv.job_title)
    cv.city = data.get('city', cv.city)
    cv.country = data.get('country', cv.country)
    cv.email = data.get('email', cv.email)
    cv.objective = data.get('objective', cv.objective)
    cv.degree = data.get('degree', cv.degree)
    cv.school_name = data.get('school', cv.school_name)
    cv.school_department = data.get('school_department', cv.school_department)
    cv.school_city = data.get('school_city', cv.school_city)
    cv.school_country = data.get('school_country', cv.school_country)
    cv.start_school_date = data.get('start_school_date', cv.start_school_date)
    cv.end_school_date = data.get('end_school_date', cv.end_school_date)
    
    cv.save()

    # Handle skills
    skills_data = data.get('skills', [])
    cv.skills.clear()  # Clear existing skills
    for skill_name in skills_data:
        skill, created = Skill.objects.get_or_create(skill_name=skill_name)
        cv.skills.add(skill)

    # Handle projects
    projects_data = data.get('projects', [])
    cv.projects.clear()  # Clear existing projects
    for project_data in projects_data:
        project = Project.objects.create(
            project_name=project_data.get('project_name'),
            project_date=project_data.get('project_date'),
            project_details=project_data.get('project_details')
        )
        cv.projects.add(project)

    # Handle experiences
    experiences_data = data.get('experiences', [])
    cv.experiences.clear()  # Clear existing experiences
    for experience_data in experiences_data:
        experience = Experience.objects.create(
            job_title=experience_data.get('job_title'),
            company=experience_data.get('company'),
            start_job_date=experience_data.get('start_date'),
            end_job_date=experience_data.get('end_date'),
            job_description=experience_data.get('job_description')
        )
        cv.experiences.add(experience)

    # Handle extracurricular activities
    extracurricular_data = data.get('extra_curricular_activities', [])
    cv.extracurricular_activities.clear()  # Clear existing extracurricular activities
    for activity_name in extracurricular_data:
        activity, created = ExtracurricularActivity.objects.get_or_create(activity_name=activity_name)
        cv.extracurricular_activities.add(activity)

    return Response({"message": "CV updated successfully"}, status=status.HTTP_200_OK)