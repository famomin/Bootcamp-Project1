 //-------------------------------------------
 //-----------JS for Homepage ----------------
 //------------------------------------------- 

 // Initialize Firebase
var config = {
 	apiKey: "AIzaSyBUS7q46sP26E7LYgSuUWcEvWaHmqsbk80",
   	authDomain: "shiplify-bcd09.firebaseapp.com",
   	databaseURL: "https://shiplify-bcd09.firebaseio.com",
   	storageBucket: "shiplify-bcd09.appspot.com",
   	messagingSenderId: "885255566911"
};

firebase.initializeApp(config);

//Create a variable to reference the database
var database = firebase.database();



$('#subscribeNewsletter').on("click", function(){
	var email = $('#emailNewsletter').val().trim();
	
		console.log(email);

		database.ref().push({
			email: email
		});	
	
	$('#emailNewsletter').empty();
	
	return false;
});



 //-------------------------------------------
 //-----------JS for PAGE 2 - ----------------
 //------------------------------------------- 