function ShowModelEdit() {
    var model = `<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="deleteAddedclass()">Close</button>
        <button id="saveChanges" type="button" class="btn btn-primary" onclick="addClassSection()">Save changes</button>
      </div>
    </div>
  </div>
</div>`;
    document.getElementById('modelShowSignup').innerHTML = model;
}
//function that remove the classAddedNUmber 
function deleteAddedclass() {
    localStorage.removeItem('calssAddedNumber');
    location.replace('login.html');
}
function addClassSection() {
    var addedClass = JSON.parse(localStorage.getItem('calssAddedNumber') || '0');
    var section = document.getElementById('signupSection').value;
    var clas = document.getElementById('signupClass').value;
    var email = document.getElementById('signupEmail').value;
    var allUsers = getAllUsers();
    if (addedClass === 0) {
        var classNumber = "class";
        var sectionNumber = "section";
    } else {
        var classNumber = "class" + String(addedClass);
        var sectionNumber = "section" + String(addedClass);
    }
    for (var i = 0; i < allUsers.length; i++) {
        if (allUsers[i].email === email) {
            allUsers[i][sectionNumber] = section;
            allUsers[i][classNumber] = clas;
            var user = allUsers[i];
            var role = user.role;
        }

        if (((role) === "student" && Number(addedClass) >= 0) || ((role) === "prof" && Number(addedClass) >= 2)) {
            document.getElementById('saveChanges').style.display = 'none';

        }
    }
    localStorage.setItem('calssAddedNumber', addedClass + 1);
    localStorage.setItem('users', JSON.stringify(allUsers));
}