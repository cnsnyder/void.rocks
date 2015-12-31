function verifyEmail(){
    var status = false;
    var emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (document.myform.email.value.search(emailRegEx) == -1) {
        document.getElementById("email").style.border = "solid 1px #D7244C";
        document.getElementById("email").style.color = "#D7244C";
    }
    else {
        status = true;
    }
    return status;
}
