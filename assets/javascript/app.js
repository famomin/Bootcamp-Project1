// var parcel = {
//     // in INCHES
//     length: 20,
//     width: 15,
//     height: 10,
//     // in OZ
//     weight: 45
// };


// parcel = JSON.stringify(parcel);
var weight = 100;
var length = 101;


//Heroku Link
var queryURL = "https://nameless-inlet-48347.herokuapp.com/"+ weight + "/" + length;

//Local Test Link
//var queryURL = 'localhost:3000';

//ajax call to retreive information form the API
$.ajax({ url: queryURL, method: 'GET'})
	.done(function(response){
	//results is the response from the API. We mush parse so we can read as an object.
	var results = JSON.parse(response);
	//Console logging the API
	console.log(results);

	var a = results.rates[1].rate;
	var b = results.parcel;
	console.log(a);
	console.log(b);
	$("#test").html(a);
})