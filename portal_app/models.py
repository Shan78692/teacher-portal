from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Student(models.Model):
    teacher = models.ForeignKey(User, on_delete=models.CASCADE, related_name='students', blank=True, null=True)
    name = models.CharField(max_length=100)
    subject = models.CharField(max_length=100)
    marks = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True, null=True)

    def __str__(self):
        return f"{self.name} - {self.subject}"