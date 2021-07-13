export class FirebaseConfig {

    constructor() {
        const config = {
            apiKey: "AIzaSyDhDVf67q6cGIbNxa2B7khJKp5N-jqd9OM",
            authDomain: "msgcipher.firebaseapp.com",
            databaseURL: "https://msgcipher-default-rtdb.europe-west1.firebasedatabase.app",
            projectId: "msgcipher",
            storageBucket: "msgcipher.appspot.com",
            messagingSenderId: "827693109132",
            appId: "1:827693109132:web:e134c5ede2f05d9824d0a9"
        };
        firebase.initializeApp(config);
        this.uid = null;
        this.checkLoggedInUser();
    }

    checkLoggedInUser() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                this.uid = user.uid;
                document.querySelector("#loginForms").classList.add("hidden");
                document.querySelector("#logoutBtnCont").classList.remove("hidden");
                document.querySelector("#userbtn").classList.add("active");
                
                // ...
            } else {
                // User is signed out
                console.log("No user is logged in!");
                // ...
            }
        });
    }

    registerUser(email, password){
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          console.log(user);
          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.error(errorCode+": "+errorMessage);
          alert(errorMessage);
          // ..
        });
    }

    loginUser(email, password){
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          console.log(user);
          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.error(errorCode+": "+errorMessage);
          alert(errorMessage);
          // ..
        });
    }

    logoutUser(){
        firebase.auth().signOut();
        location.reload();
    }

};