// document.addEventListener('DOMContentLoaded', () => {
//   // CSRF helper
//   function getCSRFToken() {
//     const cookie = document.cookie.split(';').find(c => c.trim().startsWith('csrftoken='));
//     return cookie ? cookie.split('=')[1] : '';
//   }

//   // Modal form logic
//   const modal = document.getElementById("addModal");
//   const openBtn = document.getElementById("openModalBtn");
//   const closeBtn = document.getElementById("closeModal");

//   openBtn.onclick = () => modal.style.display = "block";
//   closeBtn.onclick = () => modal.style.display = "none";
//   window.onclick = function (event) {
//     if (event.target == modal) modal.style.display = "none";
//   }

//   // Submit form and send AJAX to backend
//   document.getElementById('addStudentForm').addEventListener('submit', function (e) {
//     e.preventDefault();
//     const name = document.getElementById('studentName').value;
//     const subject = document.getElementById('studentSubject').value;
//     const marks = document.getElementById('studentMarks').value;

//     fetch('/add_student/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         'X-CSRFToken': getCSRFToken()
//       },
//       body: new URLSearchParams({
//         studentName: name,
//         studentSubject: subject,
//         studentMarks: marks
//       })
//     })
//     .then(response => response.json())
//     .then(data => {
//       if (data.status === 'added') {
//         const tbody = document.querySelector('table tbody');
//         const newRow = document.createElement('tr');
//         newRow.innerHTML = `
//           <td class="name">${name}</td>
//           <td class="subject">${subject}</td>
//           <td class="marks">${marks}</td>
//           <td>
//             <button class="edit-btn"><i class="fas fa-pen"></i> Edit</button>
//             <button class="save-btn" style="display:none;"><i class="fas fa-save"></i> Save</button>
//             <button class="delete-btn delete"><i class="fas fa-trash"></i> Delete</button>
//           </td>
//         `;
//         tbody.appendChild(newRow);
//         modal.style.display = 'none';
//         e.target.reset();
//         bindRowEvents(newRow);  // Rebind events
//       } else {
//         alert("Failed to add student.");
//       }
//     });
//   });

//   // Bind actions to a row
//   function bindRowEvents(row) {
//     row.querySelector('.edit-btn').addEventListener('click', () => {
//       ['name', 'subject', 'marks'].forEach(cls => {
//         const cell = row.querySelector(`.${cls}`);
//         const value = cell.textContent;
//         cell.innerHTML = `<input type="text" value="${value}">`;
//       });
//       row.querySelector('.edit-btn').style.display = 'none';
//       row.querySelector('.save-btn').style.display = 'inline-block';
//     });

//     row.querySelector('.save-btn').addEventListener('click', () => {
//       ['name', 'subject', 'marks'].forEach(cls => {
//         const cell = row.querySelector(`.${cls}`);
//         const value = cell.querySelector('input').value;
//         cell.textContent = value;
//       });
//       row.querySelector('.edit-btn').style.display = 'inline-block';
//       row.querySelector('.save-btn').style.display = 'none';

//       //  Add fetch() here to update DB in backend
//     });

//     row.querySelector('.delete-btn').addEventListener('click', () => {
//       if (confirm("Are you sure you want to delete this student?")) {
//         row.remove();
//         //  Add fetch() here to delete from DB in backend
//       }
//     });
//   }

//   // Initial binding for existing rows
//   document.querySelectorAll('table tbody tr').forEach(bindRowEvents);
// });





// document.addEventListener('DOMContentLoaded', () => {
//   function getCSRFToken() {
//     const cookie = document.cookie.split(';').find(c => c.trim().startsWith('csrftoken='));
//     return cookie ? cookie.split('=')[1] : '';
//   }

//   // Modal logic
//   const modal = document.getElementById("addModal");
//   const openBtn = document.getElementById("openModalBtn");
//   const closeBtn = document.getElementById("closeModal");

//   openBtn.onclick = () => modal.style.display = "block";
//   closeBtn.onclick = () => modal.style.display = "none";
//   window.onclick = function (event) {
//     if (event.target == modal) modal.style.display = "none";
//   }

//   document.getElementById('addStudentForm').addEventListener('submit', function (e) {
//     e.preventDefault();
//     const name = document.getElementById('studentName').value;
//     const subject = document.getElementById('studentSubject').value;
//     const marks = document.getElementById('studentMarks').value;

//     fetch('/add_student/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         'X-CSRFToken': getCSRFToken()
//       },
//       body: new URLSearchParams({
//         studentName: name,
//         studentSubject: subject,
//         studentMarks: marks
//       })
//     })
//     .then(response => response.json())
//     .then(data => {
//       if (data.status === 'added') {
//         const tbody = document.querySelector('table tbody');
//         let updated = false;

//         tbody.querySelectorAll('tr').forEach(row => {
//           const rName = row.querySelector('.name').textContent;
//           const rSubject = row.querySelector('.subject').textContent;
//           if (rName === name && rSubject === subject) {
//             row.querySelector('.marks').textContent = marks;
//             updated = true;
//           }
//         });

//         if (!updated) {
//           const newRow = document.createElement('tr');
//           newRow.setAttribute('data-id', data.id); 
//           newRow.innerHTML = `
//             <td class="name">${name}</td>
//             <td class="subject">${subject}</td>
//             <td class="marks">${marks}</td>
//             <td>
//               <button class="edit-btn"><i class="fas fa-pen"></i> Edit</button>
//               <button class="save-btn" style="display:none;"><i class="fas fa-save"></i> Save</button>
//               <button class="delete-btn delete"><i class="fas fa-trash"></i> Delete</button>
//             </td>
//           `;
//           tbody.appendChild(newRow);
//           bindRowEvents(newRow);
//         }

//         modal.style.display = 'none';
//         e.target.reset();
//       } else {
//         alert("Failed to add student.");
//       }
//     });
//   });

//   function bindRowEvents(row) {
//     row.querySelector('.edit-btn').addEventListener('click', () => {
//       ['name', 'subject', 'marks'].forEach(cls => {
//         const cell = row.querySelector(`.${cls}`);
//         const value = cell.textContent;
//         cell.innerHTML = `<input type="text" value="${value}">`;
//       });
//       row.querySelector('.edit-btn').style.display = 'none';
//       row.querySelector('.save-btn').style.display = 'inline-block';
//     });

//     row.querySelector('.save-btn').addEventListener('click', () => {
//       const id = row.getAttribute('data-id');
//       const name = row.querySelector('.name input').value;
//       const subject = row.querySelector('.subject input').value;
//       const marks = row.querySelector('.marks input').value;

//       fetch(`/update_student/${id}/`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//           'X-CSRFToken': getCSRFToken()
//         },
//         body: new URLSearchParams({
//           studentName: name,
//           studentSubject: subject,
//           studentMarks: marks
//         })
//       })
//       .then(res => res.json())
//       .then(data => {
//         if (data.status === 'updated') {
//           row.querySelector('.name').textContent = name;
//           row.querySelector('.subject').textContent = subject;
//           row.querySelector('.marks').textContent = marks;
//           row.querySelector('.edit-btn').style.display = 'inline-block';
//           row.querySelector('.save-btn').style.display = 'none';
//         }
//       });
//     });

//     row.querySelector('.delete-btn').addEventListener('click', () => {
//       const id = row.getAttribute('data-id');
//       if (confirm("Are you sure you want to delete this student?")) {
//         fetch(`/delete_student/${id}/`, {
//           method: 'POST',
//           headers: {
//             'X-CSRFToken': getCSRFToken()
//           }
//         })
//         .then(res => res.json())
//         .then(data => {
//           if (data.status === 'deleted') {
//             row.remove();
//           }
//         });
//       }
//     });
//   }

//   document.querySelectorAll('table tbody tr').forEach(bindRowEvents);
// });




// document.addEventListener('DOMContentLoaded', () => {
//   function getCSRFToken() {
//     const cookie = document.cookie.split(';').find(c => c.trim().startsWith('csrftoken='));
//     return cookie ? cookie.split('=')[1] : '';
//   }

//   // Show dynamic success/error/info alert
//   function showDynamicAlert(message, type = 'success') {
//     const container = document.getElementById('dynamicAlertContainer');
//     const alert = document.createElement('div');
//     alert.className = `custom-alert ${type}`;
//     alert.innerHTML = `
//       ${message}
//       <button type="button" class="close-alert" onclick="this.parentElement.remove();">&times;</button>
//     `;
//     container.appendChild(alert);

//     setTimeout(() => {
//       alert.remove();
//     }, 4000);
//   }

//   // Modal logic
//   const modal = document.getElementById("addModal");
//   const openBtn = document.getElementById("openModalBtn");
//   const closeBtn = document.getElementById("closeModal");

//   openBtn.onclick = () => modal.style.display = "block";
//   closeBtn.onclick = () => modal.style.display = "none";
//   window.onclick = function (event) {
//     if (event.target == modal) modal.style.display = "none";
//   }

//   // Submit form and send AJAX to backend
//   document.getElementById('addStudentForm').addEventListener('submit', function (e) {
//     e.preventDefault();
//     const name = document.getElementById('studentName').value;
//     const subject = document.getElementById('studentSubject').value;
//     const marks = document.getElementById('studentMarks').value;

//     fetch('/add_student/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         'X-CSRFToken': getCSRFToken()
//       },
//       body: new URLSearchParams({
//         studentName: name,
//         studentSubject: subject,
//         studentMarks: marks
//       })
//     })
//     .then(response => response.json())
//     .then(data => {
//       const tbody = document.querySelector('table tbody');
//       let updated = false;

//       // check if row with same name and subject exists → update it
//       tbody.querySelectorAll('tr').forEach(row => {
//         const rName = row.querySelector('.name').textContent;
//         const rSubject = row.querySelector('.subject').textContent;
//         if (rName === name && rSubject === subject) {
//           row.querySelector('.marks').textContent = marks;
//           updated = true;
//           showDynamicAlert('Student marks updated!', 'info');
//         }
//       });

//       if (!updated) {
//         const newRow = document.createElement('tr');
//         newRow.setAttribute('data-id', data.id);
//         newRow.innerHTML = `
//           <td class="name">${name}</td>
//           <td class="subject">${subject}</td>
//           <td class="marks">${marks}</td>
//           <td>
//             <button class="edit-btn"><i class="fas fa-pen"></i> Edit</button>
//             <button class="save-btn" style="display:none;"><i class="fas fa-save"></i> Save</button>
//             <button class="delete-btn delete"><i class="fas fa-trash"></i> Delete</button>
//           </td>
//         `;
//         tbody.appendChild(newRow);
//         bindRowEvents(newRow);
//         showDynamicAlert('Student added successfully!', 'success');
//       }

//       modal.style.display = 'none';
//       e.target.reset();
//     });
//   });

//   // Bind actions to a row
//   function bindRowEvents(row) {
//     row.querySelector('.edit-btn').addEventListener('click', () => {
//       ['name', 'subject', 'marks'].forEach(cls => {
//         const cell = row.querySelector(`.${cls}`);
//         const value = cell.textContent;
//         cell.innerHTML = `<input type="text" value="${value}">`;
//       });
//       row.querySelector('.edit-btn').style.display = 'none';
//       row.querySelector('.save-btn').style.display = 'inline-block';
//     });

//     row.querySelector('.save-btn').addEventListener('click', () => {
//       const id = row.getAttribute('data-id');
//       const name = row.querySelector('.name input').value;
//       const subject = row.querySelector('.subject input').value;
//       const marks = row.querySelector('.marks input').value;

//       fetch(`/update_student/${id}/`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//           'X-CSRFToken': getCSRFToken()
//         },
//         body: new URLSearchParams({
//           studentName: name,
//           studentSubject: subject,
//           studentMarks: marks
//         })
//       })
//       .then(res => res.json())
//       .then(data => {
//         if (data.status === 'updated') {
//           row.querySelector('.name').textContent = name;
//           row.querySelector('.subject').textContent = subject;
//           row.querySelector('.marks').textContent = marks;
//           row.querySelector('.edit-btn').style.display = 'inline-block';
//           row.querySelector('.save-btn').style.display = 'none';
//           showDynamicAlert('Student updated successfully!', 'info');
//         }
//       });
//     });

//     row.querySelector('.delete-btn').addEventListener('click', () => {
//       const id = row.getAttribute('data-id');
//       if (confirm("Are you sure you want to delete this student?")) {
//         fetch(`/delete_student/${id}/`, {
//           method: 'POST',
//           headers: {
//             'X-CSRFToken': getCSRFToken()
//           }
//         })
//         .then(res => res.json())
//         .then(data => {
//           if (data.status === 'deleted') {
//             row.remove();
//             showDynamicAlert('Student deleted successfully!', 'warning');
//           }
//         });
//       }
//     });
//   }

//   document.querySelectorAll('table tbody tr').forEach(bindRowEvents);
// });




// ###########################################3

document.addEventListener('DOMContentLoaded', () => {
  function getCSRFToken() {
    const cookie = document.cookie.split(';').find(c => c.trim().startsWith('csrftoken='));
    return cookie ? cookie.split('=')[1] : '';
  }

  // Dynamic alert message
  function showDynamicAlert(message, type = 'success') {
    const container = document.getElementById('dynamicAlertContainer');
    const alert = document.createElement('div');
    alert.className = `custom-alert ${type}`;
    alert.innerHTML = `
      ${message}
      <button type="button" class="close-alert" onclick="this.parentElement.remove();">&times;</button>
    `;
    container.appendChild(alert);
    setTimeout(() => alert.remove(), 4000);
  }

  // Add Student Modal Logic
  const modal = document.getElementById("addModal");
  const openBtn = document.getElementById("openModalBtn");
  const closeBtn = document.getElementById("closeModal");
  openBtn.onclick = () => modal.style.display = "block";
  closeBtn.onclick = () => modal.style.display = "none";
  window.onclick = event => { if (event.target === modal) modal.style.display = "none"; };

  // Delete confirmation modal
  const deleteModal = document.getElementById('deleteModal');
  const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
  const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
  let rowToDelete = null;
  let rowIdToDelete = null;

  // Add Student Submit
  document.getElementById('addStudentForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('studentName').value;
    const subject = document.getElementById('studentSubject').value;
    const marks = document.getElementById('studentMarks').value;

    fetch('/add_student/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-CSRFToken': getCSRFToken()
      },
      body: new URLSearchParams({ studentName: name, studentSubject: subject, studentMarks: marks })
    })
    .then(response => response.json())
    .then(data => {
      const tbody = document.querySelector('table tbody');
      let updated = false;

      tbody.querySelectorAll('tr').forEach(row => {
        const rName = row.querySelector('.name').textContent;
        const rSubject = row.querySelector('.subject').textContent;
        if (rName === name && rSubject === subject) {
          row.querySelector('.marks').textContent = marks;
          updated = true;
          showDynamicAlert('Student marks updated!', 'info');
        }
      });

      if (!updated) {
        const newRow = document.createElement('tr');
        newRow.setAttribute('data-id', data.id);
        newRow.innerHTML = `
          <td class="name">${name}</td>
          <td class="subject">${subject}</td>
          <td class="marks">${marks}</td>
          <td>
            <button class="edit-btn"><i class="fas fa-pen"></i> Edit</button>
            <button class="save-btn" style="display:none;"><i class="fas fa-save"></i> Save</button>
            <button class="delete-btn delete"><i class="fas fa-trash"></i> Delete</button>
          </td>
        `;
        tbody.appendChild(newRow);
        bindRowEvents(newRow);
        showDynamicAlert('Student added successfully!', 'success');
      }

      modal.style.display = 'none';
      e.target.reset();
    });
  });

  //  Edit / Save / Delete
  function bindRowEvents(row) {
    row.querySelector('.edit-btn').addEventListener('click', () => {
      ['name', 'subject', 'marks'].forEach(cls => {
        const cell = row.querySelector(`.${cls}`);
        const value = cell.textContent;
        cell.innerHTML = `<input type="text" value="${value}">`;
      });
      row.querySelector('.edit-btn').style.display = 'none';
      row.querySelector('.save-btn').style.display = 'inline-block';
    });

    row.querySelector('.save-btn').addEventListener('click', () => {
      const id = row.getAttribute('data-id');
      const name = row.querySelector('.name input').value;
      const subject = row.querySelector('.subject input').value;
      const marks = row.querySelector('.marks input').value;

      fetch(`/update_student/${id}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-CSRFToken': getCSRFToken()
        },
        body: new URLSearchParams({
          studentName: name,
          studentSubject: subject,
          studentMarks: marks
        })
      })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'updated') {
          row.querySelector('.name').textContent = name;
          row.querySelector('.subject').textContent = subject;
          row.querySelector('.marks').textContent = marks;
          row.querySelector('.edit-btn').style.display = 'inline-block';
          row.querySelector('.save-btn').style.display = 'none';
          showDynamicAlert('Student updated successfully!', 'info');
        }
      });
    });

    row.querySelector('.delete-btn').addEventListener('click', () => {
      rowToDelete = row;
      rowIdToDelete = row.getAttribute('data-id');
      deleteModal.style.display = 'flex';
    });
  }

  confirmDeleteBtn.onclick = function () {
    if (!rowIdToDelete) return;
    fetch(`/delete_student/${rowIdToDelete}/`, {
      method: 'POST',
      headers: { 'X-CSRFToken': getCSRFToken() }
    })
    .then(res => res.json())
    .then(data => {
      if (data.status === 'deleted') {
        rowToDelete.remove();
        showDynamicAlert('Student deleted successfully!', 'warning');
        rowToDelete = null;
        rowIdToDelete = null;
        deleteModal.style.display = 'none';
      }
    });
  };

  cancelDeleteBtn.onclick = function () {
    deleteModal.style.display = 'none';
    rowToDelete = null;
    rowIdToDelete = null;
  };

  document.querySelectorAll('table tbody tr').forEach(bindRowEvents);
});

