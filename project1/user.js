/**
 * Created by thanhnn on 5/10/2017.
 */
$('body').on('load', startPage());
function startPage() {
    checkUser();
    getProfile();
}
function getProfile() {
    $('#wheretoshow').text("");
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var myObj = JSON.parse(this.responseText);
            document.getElementById("wheretoshow").innerHTML =
                '<div class="col-sm-4 ppicture"></div>' +
                '<div class="col-sm-1"></div>' +
                '<div class="col-sm-6 pproperties" id="pproperties">' +
                '<h1>' + myObj[0]['First_Name'] + ' ' + myObj[0]['Last_Name'] + '</h1>' +
                '<small>' +
                '<cite>' + myObj[0]['Address'] + '</cite> ' +
                '<i class="glyphicon glyphicon-map-marker"></i>' +
                '</small>' +
                '<br><br>' +
                '<p style="font-size: 120%;">' +
                '<i class="glyphicon glyphicon-envelope"> ' + myObj[0]['Email'] + ' </i> ' +
                '<br>' +
                '<i class="glyphicon glyphicon-gift">' + myObj[0]['Birthday'] + ' </i> ' +
                '<br>' +
                '<i class="glyphicon glyphicon-phone">' + myObj[0]['Phone'] + '</i> ' +
                '<br>' +
                '</p>' +
                '</div>';
        }
    };
    xmlhttp.open("GET", "user.php?acc=profile", true);
    xmlhttp.send();
}
function checkUser() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var myObj = JSON.parse(this.responseText);
            if (myObj[0]['id'] !== 0) {
                startIfUser(myObj[0]['id']);
            }
        }
    };
    xmlhttp.open("GET", "checkLogin.php", true);
    xmlhttp.send();
}
function startIfUser(str) {
    $(document).ready(function () {
        var element = $('li').has('a[href="login.php"]');
        var html = '<li class="dropdown">' +
            '<a href="#" class="dropdown-toggle" data-toggle="dropdown" ' +
            'role="button" aria-haspopup="true" aria-expanded="false">' + str + '<span class="caret"></span></a>' +
            '<ul class="dropdown-menu">' +
            '<li><a href="user.html">View profile</a></li>' +
            '<li><a href="logout.php">Logout</a></li> ' +
            '</ul>' +
            '</li>';
        element.replaceWith(html);
    });
}

function getEdit() {
    var element = $('#wheretoshow');
    element.text("");

    var text = '<div class="alert alert-info alert-dismissable"> ' +
        '<a class="panel-close close" data-dismiss="alert">×</a> ' +
        '<i class="fa fa-coffee"></i>' +
        'This is an <strong>.alert</strong>. Use this to show important messages to the user. ' +
        '</div> ' +
        '<h3>Personal info</h3>' +
        '<form class="form-horizontal" role="form">' +
        '<div class="form-group"> ' +
        '<label class="col-lg-3 control-label">First name:</label> ' +
        '<div class="col-lg-8"> ' +
        '<input class="form-control" type="text" value="Jane"> ' +
        '</div> ' +
        '</div> ' +
        '<div class="form-group"> ' +
        '<label class="col-lg-3 control-label">Last name:</label> ' +
        '<div class="col-lg-8"> ' +
        '<input class="form-control" type="text" value="Bishop"> ' +
        '</div> ' +
        '</div> ' +
        '<div class="form-group"> ' +
        '<label class="col-lg-3 control-label">Address:</label> ' +
        '<div class="col-lg-8"> ' +
        '<input class="form-control" type="text" value=""> ' +
        '</div> ' +
        '</div> ' +
        '<div class="form-group"> ' +
        '<label class="col-lg-3 control-label">DOB:</label> ' +
        '<div class="col-lg-8"> ' +
        '<input class="form-control" type="text" value="19-05-1996"> ' +
        '</div> ' +
        '</div> ' +
        '<div class="form-group"> ' +
        '<label class="col-md-3 control-label">Username:</label> ' +
        '<div class="col-md-8"> ' +
        '<input class="form-control" type="text" value="janeuser"> ' +
        '</div> ' +
        '</div> ' +
        '<div class="form-group"> ' +
        '<label class="col-md-3 control-label">Password:</label> ' +
        '<div class="col-md-8"> ' +
        '<input class="form-control" type="password" value="11111122333"> ' +
        '</div> ' +
        '</div> ' +
        '<div class="form-group"> ' +
        '<label class="col-md-3 control-label">Confirm password:</label> ' +
        '<div class="col-md-8"> ' +
        '<input class="form-control" type="password" value="11111122333"> ' +
        '</div> ' +
        '</div> ' +
        '<div class="form-group"> ' +
        '<label class="col-md-3 control-label"></label> ' +
        '<div class="col-md-8"> ' +
        '<input type="button" class="btn btn-primary" value="Save Changes"> ' +
        // '<span></span> ' +
        // '<input type="reset" class="btn btn-default" value="Cancel"> ' +
        '</div> ' +
        '</div> ' +
        '</form> ' +
        '</div>';
    element.html(text);
}
function getPurHis() {
    var element = $('#wheretoshow');
    element.text("");
    element.html('<table class="table table-striped" id="historytable"></table>');
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var myObj = JSON.parse(this.responseText);
            if ("status" in myObj[0]) {
                element.html('<br><p><strong>No Record!!!</strong></p>');
                return;
            }
            else {
                for (i = 0; i < myObj.length; i++) {
                    var text = '<tr>' +
                        '<th>' + myObj[i]['DishID'] + '</th>' +
                        '<th>' + myObj[i]['Quantity'] + '</th>' +
                        '<th>' + myObj[i]['Date'] + '</th>' +
                        '</tr>';
                    $('#historytable').append(text);
                }
            }
        }
    };
    xmlhttp.open("GET", "user.php?acc=history", true);
    xmlhttp.send();
}
function getOrderFood() {

}