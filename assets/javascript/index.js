 var userZip= ""; //using for Comparisoin Page and check rate page

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
 //--------JS for Contact Use pade -----------
 //------------------------------------------- 
//  $('#messageSent').on("click", function(){
// 	var name = $('#nameContact').val().trim();
// 	var email= $('#emailContact').val().trim();
// 	var phone = $('#phoneContact').val().trim();
// 	var message = $('#messageContact').val().trim();
	
// 		database.ref().push({
// 			name: name,
// 			email: email,
// 			phone: phone,
// 			message: message
// 		});	
// 	name.empty();

// 	return false;
// });


//-------------------------------------------
//--------JS for check rates ----------------
//-------------------------------------------

$('.checkRatesButton').on("click", function(){
	event.preventDefault();

	userZip = $('#shipsFrom').val();

});


//-------------------------------------------
//--------JS for Comparison Page ------------
//-------------------------------------------
$(document).ready(function() {
	var userdestin = $('#shipsTo').val();
	var shippingCarrier = "USPS";

	var xxxyyyzzz = $('#showMap').html('<iframe width="1000" height="900" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/search?q='+shippingCarrier+',77479&key=AIzaSyBn7OO0R_3Er16AAeAkJWdVspW2u7tNMmg" allowfullscreen></iframe>');
	console.log(userZip);
	console.log(userdestin);
	console.log(shippingCarrier);
	console.log(xxxyyyzzz);
});
