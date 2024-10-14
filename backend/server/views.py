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
    user_id = data.get('userId')
    
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({"error": "User does not exist."}, status=status.HTTP_404_NOT_FOUND)

    # Check for existing CV with the same name for the user
    cv_name = data.get('cvName')
    existing_cv = CV.objects.filter(user=user, cv_name=cv_name).first()
    if existing_cv:
        return Response({"error": "A CV with this name already exists. please change cv name to other name"}, status=status.HTTP_400_BAD_REQUEST)

    # Create a new CV instance
    cv = CV.objects.create(
        user=user,
        first_name=data.get('firstName'),
        last_name=data.get('lastName'),
        cv_name=data.get('cvName'),
        job_title=data.get('job'),
        city=data.get('city'),
        country=data.get('country'),
        email=data.get('email'),
        objective=data.get('objective'),
        degree=data.get('degree'),
        school_name=data.get('school'),
        school_department=data.get('schoolDepartment'),
        school_city=data.get('schoolCity'),
        school_country=data.get('schoolCountry'),
        start_school_date=data.get('startSchoolDate'),
        end_school_date=data.get('endSchoolDate')
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
            project_name=project_data.get('projectName'),
            project_date=project_data.get('projectDate'),
            project_details=project_data.get('projectDetails')
        )
        cv.projects.add(project)

    # Handle experiences
    experiences_data = data.get('experiences', [])
    for experience_data in experiences_data:
        experience = Experience.objects.create(
            job_title=experience_data.get('jobTitle'),
            company=experience_data.get('company'),
            start_job_date=experience_data.get('startDate'),
            end_job_date=experience_data.get('endDate'),
            job_description=experience_data.get('jobDescription')
        )
        cv.experiences.add(experience)

    # Handle extracurricular activities
    extracurricular_data = data.get('extraCurricularActivities', [])
    for activity_name in extracurricular_data:
        activity, created = ExtracurricularActivity.objects.get_or_create(activity_name=activity_name)
        cv.extracurricular_activities.add(activity)

    return Response({"message": "CV added successfully"}, status=status.HTTP_201_CREATED)



@api_view(['GET'])
def retrieveCv(request, id):
    try:
        cvs = CV.objects.filter(user=id)
        data = [{
            "cvId": cv.id,
            "firstName":cv.first_name,
            "lastName":cv.last_name,
            "cvName": cv.cv_name,
            "userId": cv.user.id,
            "job": cv.job_title,
            "city": cv.city,
            "country": cv.country,
            "email": cv.email,
            "objective": cv.objective,
            "degree": cv.degree,
            "school": cv.school_name,
            "schoolDepartment": cv.school_department,
            "schoolCity": cv.school_city,
            "schoolCountry": cv.school_country,
            "startSchoolDate": cv.start_school_date,
            "endSchoolDate": cv.end_school_date,
            "skills": [skill.skill_name for skill in cv.skills.all()],
            "projects": [
                {
                    "projectName": project.project_name,
                    "projectDate": project.project_date,
                    "projectDetails": project.project_details,
                } for project in cv.projects.all()
            ],
            "experiences": [
                {
                    "jobTitle": experience.job_title,
                    "company": experience.company,
                    "startDate": experience.start_job_date,
                    "endDate": experience.end_job_date,
                    "jobDescription": experience.job_description,
                } for experience in cv.experiences.all()
            ],
            "extraCurricularActivities": [
                activity.activity_name for activity in cv.extracurricular_activities.all()
            ],
        } for cv in cvs]
        return Response({"data": data}, status=status.HTTP_200_OK)
    except CV.DoesNotExist:
        return Response({"error": "CV not found."}, status=status.HTTP_404_NOT_FOUND)



@api_view(['PUT'])
def editCv(request):
    data = request.data
    
    # Extract user ID and CV ID from the request data
    cvId = data.get('cvId')
    userId = data.get('userId')
    newCvName = data.get('cvName')
    
    try:
        user = User.objects.get(id=userId)
    except User.DoesNotExist:
        return Response({"error": "User does not exist."}, status=status.HTTP_404_NOT_FOUND)

    try:
        cv = CV.objects.get(id=cvId, user=user)
    except CV.DoesNotExist:
        return Response({"error": "CV not found."}, status=status.HTTP_404_NOT_FOUND)

    # Check for existing CV with the new name for the user
    if newCvName and newCvName != cv.cv_name:
        existing_cv = CV.objects.filter(user=user, cv_name=newCvName).first()
        if existing_cv and existing_cv.id != cv.id:
            return Response({"error": "A CV with this name already exists. Please change the CV name to another name."}, status=status.HTTP_400_BAD_REQUEST)
    # Update CV fields
    cv.cv_name = newCvName
    cv.first_name = data.get('firstName', cv.first_name)
    cv.last_name = data.get('lastName', cv.last_name)
    cv.job_title = data.get('job', cv.job_title)
    cv.city = data.get('city', cv.city)
    cv.country = data.get('country', cv.country)
    cv.email = data.get('email', cv.email)
    cv.objective = data.get('objective', cv.objective)
    cv.degree = data.get('degree', cv.degree)
    cv.school_name = data.get('school', cv.school_name)
    cv.school_department = data.get('schoolDepartment', cv.school_department)
    cv.school_city = data.get('schoolCity', cv.school_city)
    cv.school_country = data.get('schoolCountry', cv.school_country)
    cv.start_school_date = data.get('startSchoolDate', cv.start_school_date)
    cv.end_school_date = data.get('endSchoolDate', cv.end_school_date)
    
    cv.save()

    # Handle skills
    skillsData = data.get('skills', [])
    cv.skills.clear()  # Clear existing skills
    for skillName in skillsData:
        skill, created = Skill.objects.get_or_create(skill_name=skillName)
        cv.skills.add(skill)

    # Handle projects
    projectsData = data.get('projects', [])
    cv.projects.clear()  # Clear existing projects
    for projectData in projectsData:
        project = Project.objects.create(
            project_name=projectData.get('projectName'),
            project_date=projectData.get('projectDate'),
            project_details=projectData.get('projectDetails')
        )
        cv.projects.add(project)

    # Handle experiences
    experiencesData = data.get('experiences', [])
    cv.experiences.clear()  # Clear existing experiences
    for experienceData in experiencesData:
        experience = Experience.objects.create(
            job_title=experienceData.get('jobTitle'),
            company=experienceData.get('company'),
            start_job_date=experienceData.get('startDate'),
            end_job_date=experienceData.get('endDate'),
            job_description=experienceData.get('jobDescription')
        )
        cv.experiences.add(experience)

    # Handle extracurricular activities
    extracurricularData = data.get('extraCurricularActivities', [])
    cv.extracurricular_activities.clear()  # Clear existing extracurricular activities
    for activityName in extracurricularData:
        activity, created = ExtracurricularActivity.objects.get_or_create(activity_name=activityName)
        cv.extracurricular_activities.add(activity)

    return Response({"message": "CV updated successfully"}, status=status.HTTP_200_OK)


@api_view(['delete'])
def deletecv(request):
    userId = request.data.get('userId')
    cvName = request.data.get('cvName')

    # Validate that both userId and cvName are provided
    if not userId or not cvName:
        return Response({"error": "User ID and CV name are required."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Fetch the user
        user = User.objects.get(id=userId)
    except User.DoesNotExist:
        return Response({"error": "User does not exist."}, status=status.HTTP_404_NOT_FOUND)

    try:
        # Find the CV by user and name
        cv = CV.objects.get(user=user, cv_name=cvName)
    except CV.DoesNotExist:
        return Response({"error": "CV not found."}, status=status.HTTP_404_NOT_FOUND)

    # Delete the CV
    cv.delete()

    return Response({"message": "CV deleted successfully."}, status=status.HTTP_200_OK)



@api_view(['delete'])
def deleteallcvs(request):
    user_id=request.data.get('userId')
    try:
        # Fetch the user
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({"error": "User does not exist."}, status=status.HTTP_404_NOT_FOUND)
    
    cvs = CV.objects.filter(user=user)
    
    if len(cvs) == 0 :
        return Response({"error": "This user doesn't have any CV."}, status=status.HTTP_404_NOT_FOUND)

    cvs.delete()

    return Response({"message": "all CVs deleted successfully."}, status=status.HTTP_200_OK)

