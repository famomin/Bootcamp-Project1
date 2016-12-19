 var userZip= ""; //using for Comparison page and check rate page
 var statesAvailable = ["alabama", "al", "arkansas", "ar", "arizona", "az", "california", "ca", "colorado", "co", "connecticut", "ct", "district of columbia", "dc", "delaware", "de", "florida", "fl", "georgia", "ga", "iowa",  ]

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


//adding event listener to subscribe to the newsletter
$('#subscribeNewsletter').on("click", function(){
  var email = $('#emailNewsletter').val().trim();

    //pushing the user input to firebase
    database.ref().push({
      email: email
    }); 
  //clears the input box
  $('#emailNewsletter').empty();
  //prevent the page from loading
  return false;
});



 //-------------------------------------------
 //--------JS for Contact Use pade -----------
 //------------------------------------------- 
//  $('#messageSent').on("click", function(){
//  var name = $('#nameContact').val().trim();
//  var email= $('#emailContact').val().trim();
//  var phone = $('#phoneContact').val().trim();
//  var message = $('#messageContact').val().trim();
  
//    database.ref().push({
//      name: name,
//      email: email,
//      phone: phone,
//      message: message
//    }); 
//  name.empty();

//  return false;
// });


//-------------------------------------------
//--------JS for check rates ----------------
//-------------------------------------------

// adding event listener to check rates button
$('.checkRatesButton').on("click", function(){
  //prevents page from reloading
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
//  var userdestin = $('#shipsTo').val();
//  var shippingCarrier = "USPS";

//  // var xxxyyyzzz = $('#showMap').html('<iframe width="1000" height="900" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/search?q='+shippingCarrier+',77479&key=AIzaSyBn7OO0R_3Er16AAeAkJWdVspW2u7tNMmg" allowfullscreen></iframe>');
//  console.log(userZip);
//  console.log(userdestin);
//  console.log(shippingCarrier);
//  console.log(xxxyyyzzz);
// });



//-------------------------------------------
//--------JS to show map ------------
//-------------------------------------------

// initializing the variable
var map; //this is the actual map.
var infowindow; //this shows information about the location when user clicks on the marker
var mapCenter; // this variable stores longitude and latitude of the location, which is at the center of the map
var carrierPicked; //this variable stores information about which carrier user clicks on
var carrierMarkers = []; //this is array of first 20 google search results of the carrier near location


//this function initializes map and renders is on the page.
function initMap() {
  //initializing the map centered around houston. Because Houston is awesome.
  mapCenter = {lat: 29.7604, lng: -95.3698}; //input the longitute and latitude from google geotag API

  //creates a google map, shows it on the page, and assigns it to a variable
  map = new google.maps.Map(document.getElementById('showMap'), {
    //longitude and latitude object is passed to center.
    center: mapCenter,
    // larger the value of the zoom, the more zoomed in it will be
    zoom: 8
  });
  
  // creating an object variable to pass to show marker function.  
  var request = {
    location: mapCenter,
    radius: '500', // radius in meters
    query: carrierPicked // replace this with the user input for USPS, UPS, or Fedex
  }
  
  // adds an event listener to checkRates button
  // this function is writen to center the map at user's "from" location
  $("#checkRatesButton").on("click", function(){

    event.preventDefault();

    // assigns the user input for the from address to the variable
    // removes any spaces at the beginning or the end
    // replaces the space between the words to "+" sign.
    // "    Sugar Land " will become "Sugar+Land"
    var street = $("#fromStreetAdd").val().trim().replace( /\s+/g, "+");
    var city  = $("#fromCityAdd").val().trim().replace(/\s+/g, "+");
    var state = $("#fromStateAdd").val().trim().replace(/\s+/g,"+");

    //Creates a URL to make an ajax query to Google Geotagging API
    var ajaxQuery = "https://maps.googleapis.com/maps/api/geocode/json?address="+street+"+"+city+"+"+state+"&key=AIzaSyBn7OO0R_3Er16AAeAkJWdVspW2u7tNMmg";
    console.log(ajaxQuery);

    //Geotagging API pulls information about the Location 
    // Trying to pull the longitude and latitude of user's "from" address
    $.ajax({
      url: ajaxQuery, method: "GET"
    }).done(function(response){

      //assigns the results from the AJAX call to a variable
      var results = response.results;
      //gets the longitude and latiture of the location and assign it to a variable
      mapCenter = results[0].geometry.location;
      //changes the value of map center in the object that get passed to creater Marker function
      request.location = mapCenter;

      //Zooms in to the street view of the location that user entered
      zoomIn(mapCenter, map);

      // Removes previous location markers and adds new markers for the carrier that user chooses
      $("#ratesButtonRow").on("click", ".carrierChosen", function(){
        removeMarkers();
        var carrier = $(this).val();
        request.query = carrier;
        infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        service.textSearch(request, callback);
      });


    }); // ajax functions ends here.

  }); // EventListener for Checkrate Button ends here.

}
//google API function that checks if API call is good
function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      // function to create a marker for each location.
      createMarker(results[i]);
    }
  }
}


function createMarker(place) {
  //google map API method to create a long/lat object.
  //object is unreadable. Has some methods for API internal code
  var placeLoc = place.geometry.location;
  //google map API method to create a marker
  var marker = new google.maps.Marker({
    map: map,
    position: placeLoc
  });

  //pushes the marker to an array
  // this array can be used to show result in text form, in future
  carrierMarkers.push(marker);

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

function zoomIn(coordinates, map){
  map.setCenter(coordinates);
  //street view zoom.
  map.setZoom(13);
}

//function to remove markers.
//this is used to delete markers of previously chosen carrier
function removeMarkers(){
    for(i=0; i< carrierMarkers.length; i++){
        carrierMarkers[i].setMap(null);
    }
}