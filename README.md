# 🧑‍🏫 Teacher Portal - Student Management App

This is a Django-based Teacher Portal application that allows teachers to manage student records efficiently. The app supports:
- Adding students via a modal
- Inline editing of student data
- Deleting students with a custom confirmation popup
- Dropdown-based action menu for Edit/Delete
- Real-time dynamic alerts for actions

---

## 🚀 Features

- Add new students with name, subject, and marks
- Edit student marks inline
- Delete students with confirmation modal
- Smooth dropdown-based action UI
- AJAX-powered frontend (no page reloads)
- Custom dynamic alerts
- Fully responsive table layout

---

## 🛠️ Technologies Used

- **Backend**: Django (Python)
- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Database**: SQLite (default Django DB)
- **UI**: FontAwesome for icons, custom modals, dynamic alerts

---



## 🛠️ Setup & Installation  ⚙️  
### 1️⃣ Clone Repository
```sh
https://github.com/Shan78692/teacher-portal.git # if you have zip file then skip git clone and follow next step


cd teacher_portal

```
### Create a Virtual Environment
```sh
python -m venv venv
source venv/bin/activate  # On macOS/Linux
venv\Scripts\activate    # On Windows
```

### 2️⃣  Install Dependencies
```sh
pip install -r requirements.txt

pip install django # in case of requirement.txt not available
```

### 3️⃣ Run Migrations
```sh
python manage.py makemigrations

python manage.py migrate
```

### 4️⃣ Start Server
```sh
python3 manage.py runserver
```

## ✅ Access the application
Once running, access:
- UI: [http://127.0.0.1:8000](http://127.0.0.1:8000) 🌐

### For Testing 
```sh
python manage.py test
```
