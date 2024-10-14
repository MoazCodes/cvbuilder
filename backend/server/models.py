from django.db import models

class User(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)  

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Skill(models.Model):
    skill_name = models.CharField(max_length=255)

class Project(models.Model):
    project_name = models.CharField(max_length=255)
    project_date = models.CharField(max_length=255)  # Changed to CharField
    project_details = models.TextField()

class Experience(models.Model):
    job_title = models.CharField(max_length=255)
    company = models.CharField(max_length=255)
    start_job_date = models.CharField(max_length=255)  # Changed to CharField
    end_job_date = models.CharField(max_length=255)    # Changed to CharField
    job_description = models.TextField()

class ExtracurricularActivity(models.Model):
    activity_name = models.CharField(max_length=255)

class CV(models.Model):
    cv_name = models.CharField(max_length=255)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    job_title = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    email = models.EmailField()
    objective = models.TextField()
    degree = models.CharField(max_length=255)
    school_name = models.CharField(max_length=255)
    school_department = models.CharField(max_length=255)
    school_city = models.CharField(max_length=255)
    school_country = models.CharField(max_length=255)
    start_school_date = models.CharField(max_length=255)  # Changed to CharField
    end_school_date = models.CharField(max_length=255)    # Changed to CharField
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # Many-to-many relationships
    skills = models.ManyToManyField(Skill, related_name='cvs', blank=True)
    projects = models.ManyToManyField(Project, related_name='cvs', blank=True)
    experiences = models.ManyToManyField(Experience, related_name='cvs', blank=True)
    extracurricular_activities = models.ManyToManyField(ExtracurricularActivity, related_name='cvs', blank=True)

    class Meta:
        unique_together = ('user', 'cv_name')  # Ensure that each user has a unique CV name

    def __str__(self):
        return f"{self.user} - {self.job_title}"
