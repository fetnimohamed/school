function verifLength(ch, a, b) {
    return ((ch.length < a) || (ch.length > b));
}

function login() {
    var loginEmail = document.getElementById("loginEmail").value;
    var loginPwd = document.getElementById("loginPwd").value;
    if (verifLength(loginEmail, 0, 0)) {
        document.getElementById("emailErrorLogin").innerHTML = "Please insert email";
        document.getElementById("emailErrorLogin").style.color = "red";
    } else {
        document.getElementById("emailErrorLogin").innerHTML = "";
    }
    if (verifLength(loginPwd, 0, 0)) {
        document.getElementById("pwdErrorLogin").innerHTML = "Please insert password";
        document.getElementById("pwdErrorLogin").style.color = "red";
    } else {
        document.getElementById("pwdErrorLogin").innerHTML = "";
    }
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



function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function getAllUsers() {
    return JSON.parse(localStorage.getItem("users") || "[]");
}

function addCourse() {
    var courseName = document.getElementById('courseName').value;
    var coursePrice = document.getElementById('coursePrice').value;
    var courseDicription = document.getElementById('courseDicription').value;
    var myFile = document.getElementById('myFile').value;
    var allCourses = JSON.parse(localStorage.getItem('courses') || '[]');
    var course = {
        courseName: courseName,
        coursePrice: coursePrice,
        courseDicription: courseDicription,
        myFile: myFile
    }
    allCourses.push(course);
    localStorage.setItem('courses', JSON.stringify(allCourses));



}

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


function signup(role) {
    var firstName = document.getElementById('signupFirstName').value;
    var lastName = document.getElementById('signupLastName').value;
    var email = document.getElementById('signupEmail').value;
    var pwd = document.getElementById('signupPwd').value;
    var pwdCnf = document.getElementById('signupPwdConfirmation').value;
    var section = document.getElementById('signupSection').value;
    var clas = document.getElementById('signupClass').value;

    if (verifLength(lastName, 3, 25)) {
        document.getElementById("errorLastName").innerHTML = "verify your last name";
        document.getElementById("errorLastName").style.color = "red";
    } else {
        document.getElementById("errorLastName").innerHTML = "";
    }
    if (verifLength(firstName, 3, 25)) {
        document.getElementById("errorFirstName").innerHTML = "Please insert password";
        document.getElementById("errorFirstName").style.color = "red";
    } else {
        document.getElementById("errorFirstName").innerHTML = "";
    }

    if (validateEmail(email)) {
        document.getElementById("errorEmail").innerHTML = "";
    } else {

        document.getElementById("errorEmail").innerHTML = "please input a valid email";
        document.getElementById("errorEmail").style.color = "red";
    }
    if (verifLength(pwd, 8, 8)) {
        document.getElementById("errorPwd").innerHTML = "verify your password";
        document.getElementById("errorPwd").style.color = "red";
    } else {
        document.getElementById("errorPwd").innerHTML = "";
    }
    if (pwd !== pwdCnf) {
        document.getElementById("errorPwdConfirmation").innerHTML = "password doesn't match ";
        document.getElementById("errorPwdConfirmation").style.color = "red";
    } else {
        document.getElementById("errorPwdConfirmation").innerHTML = "";
    }
    if (verifLength(pwd, 8, 8) == false && pwd == pwdCnf && validateEmail(email) && verifLength(firstName, 3, 25) == false && verifLength(lastName, 3, 25) == false) {


        var allUsers = getAllUsers();
        var user = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            pwd: pwd,
            section: section,
            class: clas,
            role: role

        }
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

function calculeMoyenne(m, p, c, i) {
    return ((m * 2 + p * 3 + c * 2 + i * 4) / 11);

}

function verifNote(note) {
    return (note >= 0 && note <= 20 && note.length > 0)

}

function moyenneStudent() {
    var math = document.getElementById('noteStudentMath').value;
    var phy = document.getElementById('noteStudentPhy').value;
    var chimie = document.getElementById('noteStudentChimie').value;
    var info = document.getElementById('noteStudentInfo').value;
    if (verifNote(math)) {
        document.getElementById("erorNoteMath").innerHTML = "";

    } else {
        document.getElementById("erorNoteMath").innerHTML = "Note invalid";
        document.getElementById("erorNoteMath").style.color = "red";
    }
    if (verifNote(phy)) {
        document.getElementById("erorNotePhy").innerHTML = "";

    } else {
        document.getElementById("erorNotePhy").innerHTML = "Note invalid";
        document.getElementById("erorNotePhy").style.color = "red";
    }
    if (verifNote(chimie)) {
        document.getElementById("erorNoteChimie").innerHTML = "";

    } else {
        document.getElementById("erorNoteChimie").innerHTML = "Note invalid";
        document.getElementById("erorNoteChimie").style.color = "red";
    }
    if (verifNote(info)) {
        document.getElementById("erorNoteInfo").innerHTML = "";

    } else {
        document.getElementById("erorNoteInfo").innerHTML = "Note invalid";
        document.getElementById("erorNoteInfo").style.color = "red";
    }

    document.getElementById("votremoyenne").innerHTML = "Votre moyenne est :";
    document.getElementById("moyenneStudent").innerHTML = parseFloat(calculeMoyenne(math, phy, chimie, info)).toFixed(2);

    document.getElementById("moyenneStudent").style.color = "#fdc632";
}

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
    var prof = JSON.parse(localStorage.getItem('connectedUser'));
    var allUsers = getAllUsers();
    for (var i = 0; i < allUsers.length; i++) {
        if (prof.section === allUsers[i].section && prof.class === allUsers[i].class && allUsers[i].role === 'student') {


            tableRow += `
    <tr>
              <th scope="row"> ${allUsers[i].firstName}</th>
              <td>${allUsers[i].email}</td>
              <td>${allUsers[i].class}</td>
              <td>@mdo</td>
              <td>mdo</td>
            </tr>
`;
        }
    }
    tableRow += ` </tbody>
</table>`

    document.getElementById("studentTable").innerHTML = tableRow;
}
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
        var prof = JSON.parse(localStorage.getItem('connectedUser'));
        var allUsers = getAllUsers();
        for (var i = 0; i < allUsers.length; i++) {
            if (prof.section === allUsers[i].section && prof.class === allUsers[i].class && allUsers[i].role === 'student') {

 var email = allUsers[i].email;

                tableRow += `
    <tr>
              <th scope="row"> ${allUsers[i].firstName}</th>
              <td>${email}</td>
              <td>${allUsers[i].class}</td>
              <td><button id="prs${i}" class="genric-btn info circle" onclick="presentr(${i})">present</button></td>
              <td><button id="abs${i}"href="#" class="genric-btn primary circle">abscent</button></td>
            </tr>
`;
            }
        }
        tableRow += ` </tbody>
</table>`;

        document.getElementById("tableAbsence").innerHTML = tableRow;
}
function disable() {
 var btn = document.getElementById('try');
 btn.classList.add("disable");
}
function presentr(j) {
      var prof = JSON.parse(localStorage.getItem('connectedUser') || [] );
      var allUsers = getAllUsers();
         var email = allUsers[j].email;
        
        
    var allPresence = JSON.parse(localStorage.getItem('presence')||'[]');
    if (allPresence.length==0) {
    for (var i = 0; i < allUsers.length; i++) {
        var presence = {
            email: allUsers[i].email,
            pr: 0,
            ab: 0
        };
        allPresence.push(presence);
        
    }
    }
   for (var i = 0; i < allPresence.length; i++) {
       
       if (allPresence[i].email === email) {

           allPresence[i].pr = allPresence[i].pr+1;

       }
       
   }
   id="prs"+String(j);
   idabs="abs"+String(j);
   localStorage.setItem('presence', JSON.stringify(allPresence));
   var prBtn=document.getElementById(id);
   prBtn.classList.add("disable");
    var absBtn = document.getElementById(idabs);
    absBtn.classList.add("disable");
}