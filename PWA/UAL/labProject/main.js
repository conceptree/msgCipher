$("#create-newuser-button").click(function() {
    var email = $("#inputEmail").val();
    var password = $("#inputPassword").val();
    console.log("New user = " + email + " Password " + password)
    SignIn(email, password);
});

function SignIn(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
        });
}