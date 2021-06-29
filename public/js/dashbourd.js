function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}

$('#emailChange').on('click', (e) => {
    if ($('#emailChaneInp').val() == '') {
        e.preventDefault();
        var html = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
    <strong>Error!</strong> Please insert valid username.
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`;
        $("#emailChangeForm").append(html);
        return;
    }
    $('#emailChangeForm').submit();
});
$('#passChange').on('click', (e) => {
    if ($('#passChangeInp').val() == '') {
        e.preventDefault();
        var html = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
    <strong>Error!</strong> Please insert valid password.
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`;
        $("#passChangeForm").append(html);
        return;
    }
    $('#passChangeForm').submit();
});

$('#loginBtn').on('click', (e) => {
    if ($('#loginUPl').val() == '') {
        e.preventDefault();
        var html = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
    <strong>Error!</strong> Please insert valid username.
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`;
        $("#loginForm").append(html);
        return;
    }
    if ($('#loginPPl').val() == '') {
        this.event.preventDefault();
        var html = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
    <strong>Holy Error!</strong> Please insert valid password.
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`;
        $("#loginForm").append(html);
        return;
    }
    $('#loginForm').submit();
});
var toastElList = [].slice.call(document.querySelectorAll('.toast'))
var toastList = toastElList.map(function(toastEl) {
        return new bootstrap.Toast(toastEl, option)
    })
    /** */