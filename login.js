
var for_signup=document.querySelector('.for-signup');
var for_login=document.querySelector('.for-login');

var submitBtn=document.querySelector('.container .login-box button.submit');

for_signup.addEventListener('click',function(){
	for_signup.style.color="#ff6f2f";
	for_signup.style.borderBottom="3px solid #ff6f2f";

	for_login.style.color="#000";
	for_login.style.borderBottom="none";

	submitBtn.innerText="SIGN UP";
	submitBtn.setAttribute('onclick', "signup()");
})

for_login.addEventListener('click',function(){
	for_login.style.color="#ff6f2f";
	for_login.style.borderBottom="3px solid #ff6f2f";

	for_signup.style.color="#000";
	for_signup.style.borderBottom="none";

	submitBtn.innerText="LOGIN";
	submitBtn.setAttribute('onclick', "login()");
})

function login(){
	var email=document.querySelector('#user').value;
	var password=document.querySelector('#pass').value;

	firebase.auth().signInWithEmailAndPassword(email, password)
	  .then((userCredential) => {
	    var user = userCredential.user;
	    alert("Logged In");
	    window.location="cart.html";
	  })
	  .catch((error) => {
	    var errorCode = error.code;
	    var errorMessage = error.message;
	    alert(errorMessage);
	  });
}

function signup(){
	var email=document.querySelector('#user').value;
	var password=document.querySelector('#pass').value;

	firebase.auth().createUserWithEmailAndPassword(email, password)
	  .then((userCredential) => {
	    var user = userCredential.user;
	    alert("Signed up");
	    window.location="cart.html";   
	  })
	  .catch((error) => {
	    var errorCode = error.code;
	    var errorMessage = error.message;	    
	    alert(errorMessage+"<br>Try again!");
	  });
}


function fblog(){
	var provider = new firebase.auth.FacebookAuthProvider();

	provider.addScope('user_birthday');
	firebase.auth().useDeviceLanguage();

	firebase.auth().signInWithPopup(provider).then((result) => {
	    /** @type {firebase.auth.OAuthCredential} */
	    var credential = result.credential;

	    // The signed-in user info.
	    var user = result.user;

	    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
	    var accessToken = credential.accessToken;

	    alert("Logged In");
	    window.location="cart.html";
	}).catch((error) => {
	    // Handle Errors here.
	    var errorCode = error.code;
	    var errorMessage = error.message;
	    // The email of the user's account used.
	    var email = error.email;
	    // The firebase.auth.AuthCredential type that was used.
	    var credential = error.credential;

	    alert(errorMessage)
	});
}

function gllog(){
	var provider = new firebase.auth.GoogleAuthProvider();

	provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

	firebase.auth().useDeviceLanguage();

	firebase.auth().signInWithPopup(provider).then((result) => {
		/** @type {firebase.auth.OAuthCredential} */
		var credential = result.credential;

		// This gives you a Google Access Token. You can use it to access the Google API.
		var token = credential.accessToken;
		// The signed-in user info.
		var user = result.user;
		alert("Logged In");
		window.location="cart.html";
		}).catch((error) => {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		// The email of the user's account used.
		var email = error.email;
		// The firebase.auth.AuthCredential type that was used.
		var credential = error.credential;
		alert(errorMessage);
	});	
}

function smslogin(){
	firebase.auth().useDeviceLanguage();
	window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
		'size': 'invisible',
		'callback': (response) => {
			// reCAPTCHA solved, allow signInWithPhoneNumber.
			onSignInSubmit();
		}
	});

	const phoneNumber = getPhoneNumberFromUserInput();
	const appVerifier = window.recaptchaVerifier;
	firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
	    .then((confirmationResult) => {
			// SMS sent. Prompt user to type the code from the message, then sign the
			// user in with confirmationResult.confirm(code).
			window.confirmationResult = confirmationResult;
// ...
	    	const code = getCodeFromUserInput();
			confirmationResult.confirm(code).then((result) => {
			  // User signed in successfully.
			  const user = result.user;			  
			  alert("Logged In");
			  window.location="cart.html";
			}).catch((error) => {
				var errorCode = error.code;
				var errorMessage = error.message;
			  	// User couldn't sign in (bad verification code?)
				console.log("after:"+errorMessage+"/"+errorCode);
				alert(errorMessage+"/"+errorCode);
			});
	    }).catch((error) => {
	    	var errorCode = error.code;
			var errorMessage = error.message;
	  		// User couldn't sign in (bad verification code?)	  		
	  		alert(errorMessage+"/"+errorCode);	  		
		});

    
}
function getPhoneNumberFromUserInput(){
	var var1 = prompt("Enter your phone number");
	return var1;
}

function getCodeFromUserInput(){
	var var2 = prompt("Enter your verification code");
	return var2;	
}
