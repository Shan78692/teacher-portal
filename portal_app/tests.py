from django.test import TestCase, Client
from django.contrib.auth.models import User
from .models import Student
from django.urls import reverse

class ViewTests(TestCase):
    def setUp(self):
        self.client = Client()  # Create a credentials for testing
        self.user = User.objects.create_user(
            username='shan123@example.com', 
            password='testing123'
            )
        self.login_url = reverse('login')
        self.home_url = reverse('home')
        self.add_url = reverse('add_student')
        self.student = Student.objects.create(
            teacher=self.user,
            name='shan Khan',
            subject='Math',
            marks=80
        )

    def test_login_view_success(self):
        response = self.client.post(self.login_url, {
            'email': 'shan123@example.com',
            'password': 'testing123'
        })
        self.assertEqual(response.status_code, 302)  # It should be Redirected to home
        self.assertRedirects(response, self.home_url)

    def test_home_view_requires_login(self):
        response = self.client.get(self.home_url)
        self.assertEqual(response.status_code, 302)  # It Should be Redirected to login

    def test_home_view_authenticated(self):
        self.client.login(username='shan123@example.com', password='testing123')
        response = self.client.get(self.home_url)
        self.assertEqual(response.status_code, 200) 
        self.assertContains(response, 'Student Details') # It Should be Successfully Authenticated

    def test_add_student(self):
        self.client.login(username='shan123@example.com', password='testing123')
        response = self.client.post(self.add_url, {
            'studentName': 'rahul',
            'studentSubject': 'Science',
            'studentMarks': '90'
        }, HTTP_X_REQUESTED_WITH='XMLHttpRequest')
        self.assertEqual(response.status_code, 200)   # It Should be Succesfully Added Student
        self.assertEqual(Student.objects.filter(name='rahul', subject='Science').count(), 1)

    def test_update_student(self):
        self.client.login(username='shan123@example.com', password='testing123')
        url = reverse('update_student', args=[self.student.id])
        response = self.client.post(url, {
            'studentName': 'shan Updated',
            'studentSubject': 'Math',
            'studentMarks': '95'
        }, HTTP_X_REQUESTED_WITH='XMLHttpRequest')
        self.assertEqual(response.status_code, 200)  # It Should be succesfully updated the student
        updated_student = Student.objects.get(id=self.student.id)
        self.assertEqual(updated_student.name, 'shan Updated')
        self.assertEqual(updated_student.marks, 95)

    def test_delete_student(self):
        self.client.login(username='shan123@example.com', password='testing123')
        url = reverse('delete_student', args=[self.student.id])
        response = self.client.post(url, HTTP_X_REQUESTED_WITH='XMLHttpRequest')
        self.assertEqual(response.status_code, 200) # It Should be Succesfully deleted the student
        self.assertFalse(Student.objects.filter(id=self.student.id).exists())
