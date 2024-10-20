from django.db import models

class User(models.Model):
    first_name = models.CharField(max_length=255, null=True, blank=True)
    last_name = models.CharField(max_length=255, null=True, blank=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Skill(models.Model):
    skill_name = models.CharField(max_length=255, null=True, blank=True)

class Project(models.Model):
    project_name = models.CharField(max_length=255, null=True, blank=True)
    project_date = models.CharField(max_length=255, null=True, blank=True)  # Allows null values
    project_details = models.TextField(null=True, blank=True)

class Experience(models.Model):
    job_title = models.CharField(max_length=255, null=True, blank=True)
    company = models.CharField(max_length=255, null=True, blank=True)
    start_job_date = models.CharField(max_length=255, null=True, blank=True)  # Allows null values
    end_job_date = models.CharField(max_length=255, null=True, blank=True)    # Allows null values
    job_description = models.TextField(null=True, blank=True)

class ExtracurricularActivity(models.Model):
    activity_name = models.CharField(max_length=255, null=True, blank=True)

class CV(models.Model):
    cv_name = models.CharField(max_length=255)
    template = models.CharField(max_length=255)
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Foreign key cannot accept null
    first_name = models.CharField(max_length=255, null=True, blank=True)
    last_name = models.CharField(max_length=255, null=True, blank=True)
    job_title = models.CharField(max_length=255, null=True, blank=True)
    city = models.CharField(max_length=255, null=True, blank=True)
    country = models.CharField(max_length=255, null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    objective = models.TextField(null=True, blank=True)
    degree = models.CharField(max_length=255, null=True, blank=True)
    school_name = models.CharField(max_length=255, null=True, blank=True)
    school_department = models.CharField(max_length=255, null=True, blank=True)
    school_city = models.CharField(max_length=255, null=True, blank=True)
    school_country = models.CharField(max_length=255, null=True, blank=True)
    start_school_date = models.CharField(max_length=255, null=True, blank=True)  # Allows null values
    end_school_date = models.CharField(max_length=255, null=True, blank=True)    # Allows null values
    created_at = models.DateTimeField(auto_now_add=True)  # This field auto-generates values
    updated_at = models.DateTimeField(auto_now=True)      # This field auto-updates

    # Many-to-many relationships
    skills = models.ManyToManyField(Skill, related_name='cvs', blank=True)
    projects = models.ManyToManyField(Project, related_name='cvs', blank=True)
    experiences = models.ManyToManyField(Experience, related_name='cvs', blank=True)
    extracurricular_activities = models.ManyToManyField(ExtracurricularActivity, related_name='cvs', blank=True)

    class Meta:
        unique_together = ('user', 'cv_name')  # Ensure that each user has a unique CV name

    def __str__(self):
        return f"{self.user} - {self.job_title}"
