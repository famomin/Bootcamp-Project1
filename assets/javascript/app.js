

//User Parcel Data Input(Uncomment when working)



//User parcel data
var length = 20;
var width = 30;
var height = 43;
var weight = 21.9;

//User toAddress data 
var toStreet = "7037 Talbot Street "; 
var toCity = "Freeport"; 
var toState = "New York"; 
var toZipcode = "11520";
var toCountry = "US";
var toPhone = "281-265-6073";  

//User fromAddress data 
var fromStreet = "4626 Russett Lane"; 
var fromCity = "Sugar Land"; 
var fromState = "TX"; 
var fromZipcode = "77479";
var fromCountry = "US";
var fromPhone = "281-265-1111";  

//Heroku Link
var queryURL = "https://nameless-inlet-48347.herokuapp.com/"
//Parcel Data
+ length 			
+ "/" + width 		
+ "/" + height		
+ "/" + weight
//toAddress		
+ "/" + toStreet 
+ "/" + toCity
+ "/" + toState
+ "/" + toZipcode 
+ "/" + toCountry
+ "/" + toPhone
//toAddress		
+ "/" + fromStreet 
+ "/" + fromCity
+ "/" + fromState
+ "/" + fromZipcode 
+ "/" + fromCountry
+ "/" + fromPhone;


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
	//Variable for parcel data
	var b = results.parcel;
	//console.log(a);
	//Prints Parcel data
	//console.log(b);
	
})