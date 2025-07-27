from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from . utils import Validate
from django.http import JsonResponse
from . models import Student
from . models import User
# Create your views here.

# Dashboard functionality
@login_required
def home(request):
    if request.user.is_authenticated:
        students = Student.objects.all()
        return render(request, 'home.html', {"students":students})
    else:
        return render(request, 'login.html')

# Register, Login, Logout Functionality
def register_view(request):
    if request.user.is_authenticated:
        return redirect("home")
    
    if request.method == "POST":
        first_name = request.POST.get("first_name")
        last_name = request.POST.get("last_name")
        username = request.POST.get("email")
        password = request.POST.get("password")
        result, message = Validate.is_valid_email(username)
        if not result:
            messages.success(request, message)
            return render(request, "register.html")
        if not User.objects.filter(username=username).exists():
            user = User.objects.create_user(
                username=username,
                password=password,
                first_name=first_name,
                last_name=last_name,
            )
            login(request, user)
            messages.success(request, "User Registration successful!")
            return redirect("home")

        else:
            messages.success(request, "User already exists!")
            return render(request, "register.html")
    return render(request, "register.html")

def login_view(request):
    if request.user.is_authenticated:
        return redirect("home")
    
    if request.method == "POST":
        username = request.POST.get("email")
        result, message = Validate.is_valid_email(username)
        if not result:
            messages.error(request, message)
            return render(request, "login.html")
        password = request.POST.get("password")
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            messages.success(request, "Logged in successfully.")
            return redirect("home")  # Redirect to home page after successful login
        else:
            messages.success(request, "Invalid username or password.")
            return render(request, "login.html")
    return render(request, "login.html")


@login_required
def logout_view(request):
    if request.user.is_authenticated:
        logout(request)
        messages.success(request, "Logout successfully!")
        return redirect("login")  # Redirect to login page after logout
    else:
        return render(request, "login.html")

# Student Add, Update, Delete Functionality
@login_required
def add_student(request):
    if request.method == "POST":
        name = request.POST.get("studentName")
        subject = request.POST.get("studentSubject")
        marks = request.POST.get("studentMarks")

        student = Student.objects.filter(name=name, subject=subject, teacher=request.user).first()
        if student:
            student.marks = marks
            student.save()
        else:
            student = Student.objects.create(
                teacher=request.user,
                name=name,
                subject=subject,
                marks=marks,
            )
        return JsonResponse({'status': 'added', 'id': student.id})
        
@login_required
def update_student(request, id):
    student = get_object_or_404(Student, id=id)
    if request.method == 'POST':
        student.name = request.POST.get('studentName')
        student.subject = request.POST.get('studentSubject')
        student.marks = request.POST.get('studentMarks')
        student.save()
        return JsonResponse({'status': 'updated'})

@login_required 
def delete_student(request, id):
    student = get_object_or_404(Student, id=id)
    student.delete()
    return JsonResponse({'status': 'deleted'})
