//!fonction for verifiying the length of a string variable
function verifLength(ch, a, b) {
    return ((ch.length < a) || (ch.length > b));
}
// !fuction that login
function login() {
    var loginEmail = document.getElementById("loginEmail").value;
    var loginPwd = document.getElementById("loginPwd").value
    message("red", "", "Please insert email", "emailErrorLogin", !verifLength(loginEmail, 0, 0));
    message("red", "", "Please insert password", "pwdErrorLogin", !verifLength(loginPwd, 0, 0));
    var allUsers = getAllUsers();
    var user;

    for (var i = 0; i < allUsers.length; i++) {
        if (allUsers[i].email === loginEmail && allUsers[i].pwd === loginPwd) {
            user = allUsers[i];
        }
    }
    if (user) {
        localStorage.setItem('connectedUser', JSON.stringify(user));
        if (user.role === "student") {
            //go to user page

            location.replace('dashboard-student.html');

        } else {
            //go to Admin page 
            location.replace('dashboard-prof.html');
        }

    } else {
        var alertMsg = `<div class="alert alert-danger" role="alert">
  check your email and password ! user doesn't existe
</div>`;
        document.getElementById("alertMsg").innerHTML = alertMsg;

    }
}
//!fonction to verify the email 
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());

}
//!fonction that gets all users from local storage       
function getAllUsers() {
    return JSON.parse(localStorage.getItem("users") || "[]");
}
//!fonction for adding a course to the localstorage 
function addCourse() {
    var courseName = document.getElementById('courseName').value;
    var coursePrice = document.getElementById('coursePrice').value;
    var courseDicription = document.getElementById('courseDicription').value;
    var myFile = document.getElementById('myFile').value;
    var allCourses = JSON.parse(localStorage.getItem('courses') || '[]');
    var idCourses = JSON.parse(localStorage.getItem('coursesId') || '1');
    var course = {
        id: idCourses,
        courseName: courseName,
        coursePrice: coursePrice,
        courseDicription: courseDicription,
        myFile: myFile
    }
    localStorage.setItem('coursesId', idCourses + 1);
    allCourses.push(course);
    localStorage.setItem('courses', JSON.stringify(allCourses));



}
// !function show cousre from localstorage to the course page dynamiquly 
function showCourse() {
    var allCourses = JSON.parse(localStorage.getItem('courses') || '[]');
    var singleCourse = `<div class="row" >`;
    for (var i = 0; i < allCourses.length; i++) {
        var img;
        if (allCourses[i].myFile) {
            img = allCourses[i].myFile;
        } else {
            img = 'img/courses/c1.jpg'
        }
        singleCourse += `
        <div class="single_course"><div class="card ml-5 mt-5" style="width: 18rem;">
    <img src=${img} class="card-img-top" alt="...">
    <div class="course_content">
      <h5 class="card-title">${allCourses[i].courseName}</h5>
      <p class="card-text">${allCourses[i].courseDicription}</p>
     <span class="price">${allCourses[i].coursePrice}</span>
    </div> 
    </div>`;
        singleCourse += `</div>`;

    }
    document.getElementById('singleCourse').innerHTML = singleCourse;


}
//!fonction that verifys whether the email belongs to the shcool or not and return the role 
//!the user (prof or student)
function emailFromSchool(email) {
    var domain = email.substring(email.lastIndexOf("@") + 1);
    var role;
    var emailIsRight = false;
    if (domain === "edustage-student.com") {
        role = "student";
        emailIsRight = true;
    } else if (domain === "edustage-trainer.com") {
        role = "prof";
        emailIsRight = true;
    }
    var result = {
        emailIsRight: emailIsRight,
        role: role
    }
    return result;
}
//!function that signs up the users to the localstorage after verifing his inputs
function signup() {
    var firstName = document.getElementById('signupFirstName').value;
    var lastName = document.getElementById('signupLastName').value;
    var email = document.getElementById('signupEmail').value;
    var pwd = document.getElementById('signupPwd').value;
    var pwdCnf = document.getElementById('signupPwdConfirmation').value;
    var classes = getClassSection()[0];
    var sections = getClassSection()[1];
    var idUsers = JSON.parse(localStorage.getItem('usersId') || '1');
    var role = emailFromSchool(email).role;
    var emailIsRight = emailFromSchool(email).emailIsRight;
    var emailIdentical = emailExiste(email);
    message("red", "", "Email does not belong to this school", "errorEmailSchool", emailIsRight);
    message("red", "", "verify your last name", "errorLastName", !verifLength(lastName, 3, 25));
    message("red", "", "verify your First name", "errorFirstName", !verifLength(firstName, 3, 25));
    message("red", "", "please input a valid email!!", "errorEmail", validateEmail(email));
    message("red", "", "verify your password", "errorPwd", !verifLength(pwd, 8, 8));
    message("red", "", "password doesn't match ", "errorPwdConfirmation", pwd === pwdCnf);

    if (emailIdentical == true) {
        var alertMsgEmail = `<div class="alert alert-danger" role="alert">
  email is excitent !!
</div>`;
        document.getElementById("alertMsgSignupEmail").innerHTML = alertMsgEmail;
    }

    if (role === "student") {
        classes = classes[0];
        sections = sections[0];
    }
    if (verifLength(pwd, 8, 8) == false && pwd == pwdCnf && validateEmail(email) &&
        verifLength(firstName, 3, 25) == false && verifLength(lastName, 3, 25) == false &&
        emailIdentical == false && emailIsRight == true && classes.length !== 0 && sections.length !== 0) {

        var allUsers = getAllUsers();
        var user = {
            id: idUsers,
            firstName: firstName,
            lastName: lastName,
            email: email,
            pwd: pwd,
            role: role,
            class: classes,
            section: sections
        };

        localStorage.setItem('usersId', idUsers + 1);
        allUsers.push(user);
        localStorage.setItem('users', JSON.stringify(allUsers));
        location.replace('login.html');
    } else {
        var alertMsg = `<div class="alert alert-danger" role="alert">
  can not signup ! please fullfil all the inputs
</div>`;
        document.getElementById("alertMsgSignup").innerHTML = alertMsg;

    }
}
//!get the classes and sections dynamically
function getClassSection() {
    var classes = [];
    var sections = [];
    var myTab = document.getElementById('empTable');

    // loop through each row of the table.
    for (row = 1; row < myTab.rows.length - 1; row++) {
        // loop through each cell in a row.
        for (c = 1; c < myTab.rows[row].cells.length; c += 2) {
            var selectedInput1 = document.getElementById(`select${row}`);
            var selectedInput2 = document.getElementById(`select${row+1}`);
            classes[classes.length] = selectedInput1.options[selectedInput1.selectedIndex].value;
            sections[sections.length] = selectedInput2.options[selectedInput2.selectedIndex].value;
        }
    }
    return [classes, sections];
}
//! verifys weather the email exists
function emailExiste(email) {
    var allUsers = getAllUsers();
    var emailIdentical = false;

    for (var i = 0; i < allUsers.length; i++) {
        if (allUsers[i].email === email) {
            emailIdentical = true;
        }

    }
    return emailIdentical;
}
//! displays the error msg 
function message(color, msg1, msg2, id, cond) {
    if (cond) {
        document.getElementById(id).innerHTML = msg1;
    } else {
        document.getElementById(id).innerHTML = msg2;
        document.getElementById(id).style.color = color;
    }
}
//!fonction that calculat the grade of  the student 
function calculeMoyenne(m, p, c, i) {
    return ((m * 2 + p * 3 + c * 2 + i * 4) / 11);

}
//!fonction that verifys weather the varible note is a valid grade or note 
function verifNote(note) {
    return (note >= 0 && note <= 20 && note.length > 0)

}
//!fonction that claculate the grade after verifing the note of the student 
function moyenneStudent() {
    var math = document.getElementById('noteStudentMath').value;
    var phy = document.getElementById('noteStudentPhy').value;
    var chimie = document.getElementById('noteStudentChimie').value;
    var info = document.getElementById('noteStudentInfo').value;
    noteError(math, "erorNoteMath");
    noteError(phy, "erorNotePhy");
    noteError(chimie, "erorNoteChimie");
    noteError(info, "erorNoteInfo");
message("#fdc632", "votre Moyenne est :"+parseFloat(calculeMoyenne(math, phy, chimie, info)).toFixed(2), "", "moyenneStudent", verifNote(phy) && verifNote(math) && verifNote(chimie) && verifNote(info));

}
//!fonction that show the student of a connected trainer 
function shwoStudents() {
    var tableRow = `<table class="table">
    <thead>
      <tr>
        <th scope="col">Nom</th>
        <th scope="col">Email</th>
        <th scope="col">Class</th>
        <th scope="col">Nombre presence</th>
        <th scope="col">Nombre absence</th>
      </tr>
    </thead>
    <tbody>`;
    var pr = 0;
    var ab = 0;
    var present = JSON.parse(localStorage.getItem('presence') || '[]');
    var allUsers = getAllUsers();
    var classToShow = document.getElementById('SelectClass').value;
    var sectionToShow = document.getElementById('SelectSection').value;

    try {

        for (var i = 0; i < allUsers.length; i++) {
            if (sectionToShow === allUsers[i].section && classToShow === allUsers[i].class && allUsers[i].role === 'student') {
                for (var j = 0; j < present.length; j++) {

                    if (present[j].idUser === allUsers[i].id) {

                        pr = present[j].pr + pr;
                        ab = present[j].ab + ab;
                    }
                }

                tableRow += `
    <tr>
              <th scope="row"> ${allUsers[i].firstName}</th>
              <td>${allUsers[i].email}</td>
              <td>${allUsers[i].class}</td>
              <td>${pr} </td>
              <td>${ab}</td>
            </tr>
`;
            }
        }
    } catch {}
    tableRow += ` </tbody>
</table>`

    document.getElementById("studentTable").innerHTML = tableRow;

}
//! displays the select of the class in the dashboard of the trainer
function showSelect() {
    var prof = JSON.parse(localStorage.getItem('connectedUser'));
    var seclt = `<select class="form-control" id="SelectClass">`
    for (var i = 0; i < prof.class.length; i++) {
        seclt += `
        <option value=${prof.class[i]}>${prof.class[i]}  </option>`;
    }
    seclt += `
      </select>`;
    var secltSection = `<select class="form-control" id="SelectSection">`
    for (var i = 0; i < prof.section.length; i++) {
        secltSection += `
        <option value=${prof.section[i]}>${prof.section[i]}  </option>`;
    }
    secltSection += `
      </select>`;
    document.getElementById('selectSection').innerHTML = secltSection;
    document.getElementById('select').innerHTML = seclt;
}
//! shows the modal of the edit user
function ShowModelEdit(id) {
    var user = searchById(id);
    var model = `<div class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <input id="firstNameEdit" type="text" value="${user.firstName}">
        <input id="lastNameEdit" type="text" value="${user.lastName}">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="deleteAddedclass()">Close</button>
        <button id="saveChanges" type="button" class="btn btn-primary" onclick="editUser(${id})">Save changes</button>
      </div>
    </div>
  </div>
</div>
`;
    document.getElementById('modelShowEdit').innerHTML = model;
}
//! search user by Id 
function searchById(id) {

    var allUsers = getAllUsers();
    for (var i = 0; i < allUsers.length; i++) {
        if (allUsers[i].id === id) {
            return allUsers[i];
        }
    }

}
//!edits ueser first and last name
function editUser(id) {
    var allUsers = getAllUsers();
    var firstName = document.getElementById('firstNameEdit').value;
    var lastName = document.getElementById('lastNameEdit').value;
    for (var i = 0; i < allUsers.length; i++) {
        if (allUsers[i].id === id) {
            allUsers[i].firstName = firstName;
            allUsers[i].lastName = lastName;

        }
    }
    localStorage.setItem("users", JSON.stringify(allUsers));
    location.reload();

}
//!displays students and trainers in the admin dashboard 
function shwoStudentsAdmin(id) {
    var tableRow = `<table class="table">
    <thead>
      <tr>
        <th scope="col">Nom</th>
        <th scope="col">Email</th>
        <th scope="col">Class</th>
        <th scope="col">Edit/Remove</th>
      </tr>
    </thead>
    <tbody>`;
    var tableRowTrainer = `<table class="table">
    <thead>
      <tr>
        <th scope="col">Nom</th>
        <th scope="col">Email</th>
        <th scope="col">Class</th>
        <th scope="col">Edit/Remove</th>
      </tr>
    </thead>
    <tbody>`;
    var allUsers = getAllUsers();
    try {

        for (var i = 0; i < allUsers.length; i++) {
            if (allUsers[i].role === 'student') {

                tableRow += `
    <tr>
              <th scope="row"> ${allUsers[i].firstName}</th>
              <td>${allUsers[i].email}</td>
              <td>${allUsers[i].class}</td>
             <td><a class="genric-btn success-border circle" onclick="ShowModelEdit(${allUsers[i].id})"data-toggle="modal" data-target="#staticBackdrop">Edit</a><a href="#" class="genric-btn danger-border circle" onclick="removeUser(${allUsers[i].id})">Remove</a></td>
            </tr>
`;
            } else {
                var classTrainer = allUsers[i].class;
                for (var j = 1; j < 3; j++) {
                    var classId = "class" + String(j);
                    if (allUsers[i][classId]) {
                        classTrainer += "," + allUsers[i][classId];
                    }
                }
                tableRowTrainer += `
    <tr>
              <th scope="row"> ${allUsers[i].firstName}</th>
              <td>${allUsers[i].email}</td>
              <td>${classTrainer}</td>
             <td><a href="#" class="genric-btn success-border circle" onclick="ShowModelEdit(${allUsers[i].id})"data-toggle="modal" data-target="#staticBackdrop">Edit</a><a href="#" class="genric-btn danger-border circle" onclick="removeUser(${allUsers[i].id})">Remove</a></td>
            </tr>
`;
            }
        }
    } catch {}
    tableRow += ` </tbody>
</table>`
    tableRowTrainer += ` </tbody>
</table>`
    document.getElementById("studentTableAdmin").innerHTML = tableRow;
    document.getElementById("tableTrainers").innerHTML = tableRowTrainer;


}
//! remove user in the admin dashboard
function removeUser(id) {
    var j;
    var allUsers = getAllUsers();
    for (var i = 0; i < allUsers.length; i++) {
        if (allUsers[i].id === id) {
            j = i;
        }
    }
    allUsers.splice(j, 1);
    localStorage.setItem("users", JSON.stringify(allUsers));
    location.reload();
}
//! displays the error msg if user doesn't belong to the school(not having and email that ends with @edustage)
function errorEmailSeach() {
    var emailSearch = getValue('searchByEmail');
    message("red", "", "Email does not belong to this school !!", "errorEmailSearch", emailFromSchool(emailSearch).emailIsRight && validateEmail(emailSearch))

}
//!retunr searched user by email
function getUserByEmail(emailSearch) {
    var allUsers = getAllUsers();
    for (var i = 0; i < allUsers.length; i++) {
        if (allUsers[i].email === emailSearch) {
            user = allUsers[i];
        }

    }
    return user;
}

function getValue(id) {
    return document.getElementById(id).value;
}
//!search and diplay student by email
function searchByEmail() {
    var emailSearch = getValue('searchByEmail');
    var user = getUserByEmail(emailSearch);
    var allPresence = JSON.parse(localStorage.getItem('presence') || '[]');
    var searchRow = `<table class="table">
    <thead>
      <tr>

        <th scope="col">presence Status</th>
        <th scope="col">time and date</th>
      </tr>
    </thead>
    <tbody>`;
    for (var i = 0; i < allPresence.length; i++) {
        if (allPresence[i].idUser === user.id) {
            var presenceStatus = 'abscent';
            if (allPresence[i].pr === 1) {
                presenceStatus = 'present';
            }
            searchRow += `
    <tr>

              <td>${presenceStatus} </td>
             
              <td>${allPresence[i].time} h - ${allPresence[i].date}</td>
            </tr>
`
        }

    }

    searchRow += ` </tbody>
</table>`;;
    document.getElementById('searchResult').innerHTML = searchRow;
    document.getElementById('resultName').innerHTML = "student name: " + user.firstName + ' ' + user.lastName;
    document.getElementById('resultClass').innerHTML = "student class: " + user.class + ' ' + user.section;
}
//!display the students grades
function showNoteStudent() {
    var emailSearch = document.getElementById('searchByEmail').value;
    var user = getUserByEmail(emailSearch);
    var allNote = JSON.parse(localStorage.getItem('notes') || '[]');
    var math;
    var chimie;
    var info;
    var phy;
    for (var i = 0; i < allNote.length; i++) {
        if (allNote[i].idUser === user.id) {
            math = allNote[i].math;
            chimie = allNote[i].chimie;
            info = allNote[i].info;
            phy = allNote[i].phy;
        }

    }
    var showNote = `<h4>Note math</h4>
           <h4 id="noteMath"class="note">${math}</h4>
           <h4>Note physique</h4>
           <h4 id="notePhy"class="note">${phy}</h4>
           <h4>Note chimie</h4>
           <h4 id="noteChimie"class="note">${chimie}</h4>
           <h4>Note Informatique</h4>
           <h4 id="noteInfo"class="note">${info}</h4>`
    var StudentCoordonates = `<div class="row"> <div class="col-3"></div> <h3>Student Name: </h3> <h3 id="noteChimie"class="note"> ${user.firstName} ${user.lastName}</h3>
           </div>
           <div class="row"> <div class="col-3"></div><h3>Note Student Class:  </h3>
           <h3 id="noteInfo"class="note"> ${user.class} ${user.section}</h3></div>`
    document.getElementById('resultName').innerHTML = StudentCoordonates;
    document.getElementById('searchResult').innerHTML = showNote;
}
//!dispalys abscence and presence of students
function absencePresence() {
    var tableRow = `<table class="table">
    <thead>
      <tr>
        <th scope="col">Nom</th>
        <th scope="col">Email</th>
        <th scope="col">Class</th>
        <th scope="col">gérer presence</th>
        <th scope="col">gérer absence</th>
      </tr>
    </thead>
    <tbody>`;
    var allUsers = getAllUsers();
    var classToShow = document.getElementById('SelectClass').value;
    var sectionToShow = document.getElementById('SelectSection').value;
    try {
        for (var i = 0; i < allUsers.length; i++) {
            if (sectionToShow === allUsers[i].section && classToShow === allUsers[i].class && allUsers[i].role === 'student') {

                tableRow += `
    <tr>
              <th scope="row"> ${allUsers[i].firstName}</th>
              <td>${allUsers[i].email}</td>
              <td>${allUsers[i].class}</td>
              <td><button id="prs${allUsers[i].id}" class="genric-btn info circle" onclick="isPresent(${allUsers[i].id},1)">present</button></td>
              <td><button id="abs${allUsers[i].id}"href="#" class="genric-btn primary circle" onclick="isPresent(${allUsers[i].id},2)">abscent</button></td>
            </tr>
`;
            }
        }
    } catch {}
    tableRow += ` </tbody>
</table>`;

    document.getElementById("tableAbsence").innerHTML = tableRow;
}
//! idk 
function disable() {
    var btn = document.getElementById('try');
    btn.classList.add("disable");
}
//!returns the current day
function todayDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;
    return today
}
//! returns the current hour
function currentHour() {
    var today = new Date();
    return today.getHours();
}
//! adds to the localstoage the abscence stauts with the date and the hour 
function isPresent(id, isPresent) {
    var allPresence = JSON.parse(localStorage.getItem('presence') || '[]');
    var IdPresence = JSON.parse(localStorage.getItem('presenceId') || '1');
    var date = todayDate();
    var time = currentHour();
    if (isPresent === 1) {
        var presence = {
            id: IdPresence,
            idUser: id,
            pr: 1,
            ab: 0,
            date: date,
            time: time
        };
        allPresence.push(presence);
        localStorage.setItem('presenceId', IdPresence + 1);

    } else {
        var presence = {
            id: IdPresence,
            idUser: id,
            pr: 0,
            ab: 1,
            date: date,
            time: time
        };
        allPresence.push(presence);
        localStorage.setItem('presenceId', IdPresence + 1);




    }
    localStorage.setItem('presence', JSON.stringify(allPresence));

    buttonDisable(id);
}
//! disable the present and the abscent button if one of them is clicked
function buttonDisable(id) {
    var idpr = "prs" + String(id);
    var idabs = "abs" + String(id);
    var prBtn = document.getElementById(idpr);
    prBtn.style.display = "none";
    var absBtn = document.getElementById(idabs);
    absBtn.style.display = "none";
}
//! hello msg in the dashboard 
function helloMr() {
    try {
        var user = JSON.parse(localStorage.getItem('connectedUser') || []);
        document.getElementById('studentName').innerHTML = user.firstName;
    } catch {
        document.getElementById('studentName').innerHTML = "not connected";
    }
}
//! displays students and add their grades 
function toAddNote() {
    var tableNoteRow = `<table class="table">
    <thead>
      <tr>
        <th scope="col">Nom</th>
        <th scope="col">Email</th>
        <th scope="col">Class</th>
        <th scope="col">section</th>
        <th scope="col">Note</th>
      </tr>
    </thead>
    <tbody>`;

    var allUsers = getAllUsers();
    var classToShow = document.getElementById('SelectClass').value;
    var sectionToShow = document.getElementById('SelectSection').value;
    try {
        for (var i = 0; i < allUsers.length; i++) {
            if (sectionToShow === allUsers[i].section && classToShow === allUsers[i].class && allUsers[i].role === 'student') {

                var email = allUsers[i].email;

                tableNoteRow += `
    <tr>
              <th scope="row"> ${allUsers[i].firstName}</th>
              <td>${email}</td>
              <td>${allUsers[i].class}</td>
              <td>${allUsers[i].section}</td>
              <td><button type="button" id="added${allUsers[i].id}" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onclick="displayModel(${allUsers[i].id})">
  add Note
</button></td>
            </tr>
            <div id="showModel"></div>

`;

            }

        }
    } catch {}
    tableNoteRow += ` </tbody>
</table>`;
    document.getElementById("tableNote").innerHTML = tableNoteRow;

}
//! disactivats the button if a student have already grades
function noButton() {
    var allUsers = getAllUsers();
    var allNote = JSON.parse(localStorage.getItem('notes') || '[]');
    try {
        var classToShow = document.getElementById('SelectClass').value;
        var sectionToShow = document.getElementById('SelectSection').value;
        for (var i = 0; i < allUsers.length; i++) {
            if (sectionToShow === allUsers[i].section && classToShow === allUsers[i].class && allUsers[i].role === 'student') {
                z = i;


                var idButton = "added" + String(allUsers[i].id);
                for (var j = 0; j < allNote.length; j++) {
                    if (allNote[j].idUser === allUsers[i].id) {
                        document.getElementById(idButton).disabled = true;
                    }

                }
            }
        }
    } catch {}

}
//!displays add grade modal 
function displayModel(id) {

    var model = `<div class="modal fade" id="exampleModal" tabi="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
         <form action="">
             <div class="mt-10">
               <input type="text" name="first_name" placeholder="note math" onfocus="this.placeholder = ''"
                 onblur="this.placeholder = 'First Name'" required class="single-input" id="noteStudentMathProf">
             </div>
             <span id="erorNoteMathProf"></span>
             <div class="mt-10">
               <input type="text" name="last_name" placeholder="note physique" onfocus="this.placeholder = ''"
                 onblur="this.placeholder = 'Last Name'" required class="single-input"id="noteStudentPhyProf">
             </div>
             <span id="erorNotePhyProf"></span>
             <div class="mt-10">
               <input type="text" name="last_name" placeholder="note chimie" onfocus="this.placeholder = ''"
                 onblur="this.placeholder = 'Last Name'" required class="single-input"id="noteStudentChimieProf">
             </div>
             <span id="erorNoteChimieProf"></span>
             <div class="mt-10">
               <input type="text" name="last_name" placeholder="note Info" onfocus="this.placeholder = ''"
                 onblur="this.placeholder = 'Last Name'" required class="single-input"id="noteStudentInfoProf">
             </div>
             <span id="erorNoteInfoProf"></span>
           </form>
      </div>
      <div class="modal-footer">
        
        <button type="button" class="btn btn-primary" onclick="saveNote(${id})" id="save" >Save changes</button>
      </div>
    </div>
  </div>
</div>`;
    document.getElementById('showModel').innerHTML = model;
}
//!changes the header if a user is conected
function isConected() {
    var user = JSON.parse(localStorage.getItem('connectedUser') || '[]');

    if (JSON.stringify(user) === '[]') {


        var hello = `   <ul class="nav navbar-nav menu_nav ml-auto">
        <li class="nav-item">
                <a class="nav-link" href="login.html">login </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="signup.html">Signup</a>
              </li> </ul>`;
    } else {
        var hello = `   <ul class="nav navbar-nav menu_nav ml-auto">
        <li class="nav-item">
                <a class="nav-link" href="index.html">hello,  ${user.firstName} </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="index.html" onclick="signout()" >Signout</a>
              </li> </ul>`;


    }
    document.getElementById('hello').innerHTML = hello;
}
//!logout
function signout() {
    localStorage.removeItem('connectedUser');
    localtion.replace('index.html');
}
//!veriys if the nuber of absence is higher then 3 and returns a messege
function isForbiden(ab) {
    if (ab >= 3) {
        document.getElementById('nbreAbcenseError').innerHTML = "You are forbidden form exams";
        document.getElementById("nbreAbcenseError").style.color = "red";
    }
}
//! diplays the nuber of absence and presence of a student
function abStudent() {
    var allPresence = JSON.parse(localStorage.getItem('presence') || '[]');
    var user = JSON.parse(localStorage.getItem('connectedUser') || '[]');
    var pr = 0;
    var ab = 0;
    for (var i = 0; i < allPresence.length; i++) {
        if (allPresence[i].idUser === user.id) {
            pr += allPresence[i].pr;
            ab += allPresence[i].ab;
        }
        document.getElementById('nbrePresence').innerHTML = pr;
        document.getElementById('nbreAbcense').innerHTML = ab;
    }
isForbiden(ab);
}
//!verifiys weather the grade is between 0 and 20 
function noteError(note, id) {
    if (verifNote(note)) {
        document.getElementById(id).innerHTML = "";

    } else {
        document.getElementById(id).innerHTML = "Note invalid";
        document.getElementById(id).style.color = "red";
    }
}
//!adds grades to the localstorage
function saveNote(id) {
    var allNote = JSON.parse(localStorage.getItem('notes') || '[]');
    var phy = document.getElementById('noteStudentPhyProf').value;
    var math = document.getElementById('noteStudentMathProf').value;
    var chimie = document.getElementById('noteStudentChimieProf').value;
    var info = document.getElementById('noteStudentInfoProf').value;
    var idNote = JSON.parse(localStorage.getItem('notesID') || '1');
    noteError(math, "erorNoteMathProf");
    noteError(phy, "erorNotePhyProf");
    noteError(chimie, "erorNoteChimieProf");
    noteError(info, "erorNoteInfoProf");

    if (verifNote(math) && verifNote(phy) && verifNote(chimie) && verifNote(info)) {


        var note = {
            id: idNote,
            idUser: id,
            math: math,
            phy: phy,
            chimie: chimie,
            info: info
        }
        allNote.push(note);
        localStorage.setItem('notes', JSON.stringify(allNote));
        localStorage.setItem('notesID', idNote + 1);
        $("[data-dismiss=modal]").trigger({
            type: "click"
        });
        location.reload();
    }
}
//! displays the grades of a student 
function displayNote() {
    var user = JSON.parse(localStorage.getItem('connectedUser') || '[]');
    var allNote = JSON.parse(localStorage.getItem('notes') || '[]');
    var z;
    for (var i = 0; i < allNote.length; i++) {
        if (user.id === allNote[i].idUser) {
            z = i;
        }

    }
    document.getElementById("noteMath").innerHTML = allNote[z].math;
    document.getElementById("notePhy").innerHTML = allNote[z].phy;
    document.getElementById("noteChimie").innerHTML = allNote[z].chimie;
    document.getElementById("noteInfo").innerHTML = allNote[z].info;
}
//! add the contacts to the localstorage
function contact() {
    var name = document.getElementById('nameContact').value;
    var email = document.getElementById('emailContact').value;
    var subject = document.getElementById('subjectContact').value;
    var message = document.getElementById('messageContact').value;
    var allContact = JSON.parse(localStorage.getItem('contact') || '[]');
    var idContact = JSON.parse(localStorage.getItem('contactId') || '1');
    var contact = {
        id: idContact,
        name: name,
        email: email,
        subject: subject,
        message: message
    };
    if (name.length > 0 && email.length > 0 && subject.length > 0 && message.length > 10) {


        allContact.push(contact);
        localStorage.setItem('contact', JSON.stringify(allContact));
        localStorage.setItem('contactId', idContact + 1);
    }
}
//!inject the nubers in the index page
function count() {
    var allCourses = JSON.parse(localStorage.getItem('courses') || '[]');
    var courseNumber = allCourses.length;
    document.getElementById('students').innerHTML = usersNumberById('student');
    document.getElementById('prof').innerHTML = usersNumberById('prof');
    document.getElementById('courseNumber').innerHTML = courseNumber;

}
//! returns the number of users
function usersNumberById(role) {
    var allUsers = getAllUsers();
    var userNumber = 0;
    for (var i = 0; i < allUsers.length; i++) {
        if (allUsers[i].role === role) {
            userNumber = userNumber + 1;
        }
    }
    return userNumber;

}
var arrHead = new Array(); // array for header.
arrHead = ['', 'class', 'section'];
classOptions = ['1', '2', '3', '4']; //!class list table
sectionOptions = ['math', 'phy', 'info', 'chimie']; //!section list table

// first create TABLE structure with the headers. 
function createTable() {
    var empTable = document.createElement('table');
    empTable.setAttribute('id', 'empTable'); // table id.
    var tr = empTable.insertRow(-1);
    for (var h = 0; h < arrHead.length; h++) {
        var th = document.createElement('th'); // create table headers
        th.innerHTML = arrHead[h];
        tr.appendChild(th);
    }

    var div = document.getElementById('cont');
    div.appendChild(empTable); // add the TABLE to the container.
}

// now, add a new to the TABLE.
function addRow() {
    var empTab = document.getElementById('empTable');
    var rowCnt = empTab.rows.length; // table row count.
    var tr = empTab.insertRow(rowCnt); // the table row.
    tr = empTab.insertRow(rowCnt);
    for (var c = 0; c < arrHead.length; c++) {
        if (rowCnt < 6) {

            var td = document.createElement('td'); // table definition.
            td = tr.insertCell(c);

            td.setAttribute('style', 'width:400px');
            if (c == 0) { // the first column.
                // add a button in every new row in the first column.
                var button = document.createElement('input');

                // set input attributes.
                button.setAttribute('type', 'button');
                button.setAttribute('value', 'Remove');
                button.setAttribute('class', 'btn btn-outline-danger col-12');

                // add button's 'onclick' event.
                button.setAttribute('onclick', 'removeRow(this)');

                td.appendChild(button);
            } else if (c == 1) {
                td.appendChild(addSelect(classOptions, rowCnt));

            } else {
                td.appendChild(addSelect(sectionOptions, rowCnt + 1));

            }
        }
    }
}

function addSelect(T, rowCnt) {
    var select = document.createElement("select");
    select.setAttribute("name", `selectChildren`);
    select.setAttribute("id", `select${rowCnt}`);
    for (var j = 0; j < T.length; j++) {
        var option = document.createElement("option");
        option.setAttribute("value", T[j]);
        option.innerHTML = T[j];
        select.appendChild(option);
    }
    return select;
}

// delete TABLE row fonction.
function removeRow(oButton) {
    var empTab = document.getElementById('empTable');
    empTab.deleteRow(oButton.parentNode.parentNode.rowIndex); // button -> td -> tr.
}