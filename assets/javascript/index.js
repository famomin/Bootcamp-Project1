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

//Adding pakcages skipped for now.
//to add additional pacages
// $('#addPackage').on(click, function(){
//   var packageNumber = 2;
//   $('#packageInfo').append('<div class="col-sm-4 col-md-4"><h4>Package '+packageNumber+'</h4></div> ')



// });

//-------------------------------------------
//--------JS for Comparison Page ------------
//-------------------------------------------
// $(document).ready(function() {
// 	var userdestin = $('#shipsTo').val();
// 	var shippingCarrier = "USPS";

// 	// var xxxyyyzzz = $('#showMap').html('<iframe width="1000" height="900" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/search?q='+shippingCarrier+',77479&key=AIzaSyBn7OO0R_3Er16AAeAkJWdVspW2u7tNMmg" allowfullscreen></iframe>');
// 	console.log(userZip);
// 	console.log(userdestin);
// 	console.log(shippingCarrier);
// 	console.log(xxxyyyzzz);
// });



//-------------------------------------------
//--------JS to show map ------------
//-------------------------------------------

var map;
var infowindow;
var mapCenter;
var carrierPicked;
var carrierMarkers = [];

function initMap() {
  mapCenter = {lat: 29.7604, lng: -95.3698}; //input the longitute and latitude from google geotag API
  console.log("Manual Lat: " + mapCenter.lat + " Lng: " + mapCenter.lng);
  carrierPicked = 'USPS'; //link this variable to the value of the button that user clicks.

  map = new google.maps.Map(document.getElementById('showMap'), {
    center: mapCenter,
    zoom: 8
  });
    
  var request = {
    location: mapCenter,
    radius: '500', // radius in meters
    query: carrierPicked // replace this with the user input for USPS, UPS, or Fedex
  }
  console.log(request);
  
  // infowindow = new google.maps.InfoWindow();
  // var service = new google.maps.places.PlacesService(map);
  // // service.textSearch(request, callback);

  $("#checkRatesButton").on("click", function(){

  	event.preventDefault();

  	var street = $("#fromStreetAdd").val().trim().replace( /\s+/g, "+");
  	var city  = $("#fromCityAdd").val().trim().replace(/\s+/g, "+");
  	var state = $("#fromStateAdd").val().trim().replace(/\s+/g,"+");

  	var ajaxQuery = "https://maps.googleapis.com/maps/api/geocode/json?address="+street+"+"+city+"+"+state+"&key=AIzaSyBn7OO0R_3Er16AAeAkJWdVspW2u7tNMmg";
  	console.log(ajaxQuery);

  	$.ajax({
  		url: ajaxQuery, method: "GET"
  	}).done(function(response){
   		var results = response.results;
  		console.log("still working");
  		console.log(results);
  		mapCenter = results[0].geometry.location;
  		console.log("API Lat: " + mapCenter.lat + " lng: " + mapCenter.lng);
  		request.location = mapCenter;
		  console.log(request);

		  zoomIn(mapCenter, map);

  		$("#ratesButtonRow").on("click", ".carrierChosen", function(){
        removeMarkers();
        var carrier = $(this).val();
        console.log(typeof carrier);
        request.query = carrier;
        console.log(request);
        infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        service.textSearch(request, callback);
      });


  	}); // ajax functions ends here.

  }); // EventListener for Checkrate Button ends here.

}

function callback(results, status) {
  console.log(results.length);
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: placeLoc
  });

  carrierMarkers.push(marker);

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

function zoomIn(coordinates, map){
	map.setCenter(coordinates);
	map.setZoom(13);
}

function removeMarkers(){
    for(i=0; i< carrierMarkers.length; i++){
        carrierMarkers[i].setMap(null);
    }
}