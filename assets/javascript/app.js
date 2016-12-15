$('#checkRatesButton').on("click", function(event){
	
	event.preventDefault();

	//user weight data
	var length = 2;
	var width = 2;
	var height = 2;
	var weight = 32;


	//User parcel Input data
	// var length = $('#LengthFrom').val();
	// var width = $('#WidthFrom').val();
	// var height = $('#HeightFrom').val();

	// //API accepts weight in OZ
	// var lb = parseInt($('#weightFormlb').val()); 
	// //Converting lb to oz
	// var lbTOoz = lb * 16;
	// //OZ input value
	// var oz = parseInt($('#weightFormOZ').val());
	// //Weight in OZ
	// var weight = lbTOoz + oz;

	//User toAddress data 
	var toStreet = "7037 Talbot Street "; 
	var toCity = "Freeport"; 
	var toState = "New York"; 
	var toZipcode = "11520";
	var toCountry = "US";
	var toPhone = "281-265-6073";  

	//User toAddress Input data 
	// var toStreet = $('#toStreetAdd').val(); 
	// var toCity = $('#toCityAdd').val();
	// var toState = $('#toStateAdd').val(); 
	// var toZipcode = $('#toZipAdd').val();
	// var toCountry = "US";
	// var toPhone = "281-265-6073";  

	//User fromAddress data 
	var fromStreet = "4626 Russett Lane"; 
	var fromCity = "Sugar Land"; 
	var fromState = "TX"; 
	var fromZipcode = "77479";
	var fromCountry = "US";
	var fromPhone = "281-265-1111";  

	//User fromAddress Input data 
	// var fromStreet = $('#fromStreetAdd').val(); 
	// var fromCity = $('#fromCityAdd').val();
	// var fromState = $('#fromStateAdd').val(); 
	// var fromZipcode = $('#fromZipAdd').val();
	// var fromCountry = "US";
	// var fromPhone = "281-265-1111";  

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
		console.log(a);
		//Prints Parcel data
		console.log(b);
		
	});

	$('#ratesButtonRow').html('<section class="center-block"> <div class="col-sm-3 col-sm-offset-3 col-md-2 col-md-offset-3"><button class="btn btn-primary">USPS <br>Standard Shipping <br> Rate</button></div> <div class="col-sm-2 col-md-2"><button class="btn btn-primary">UPS <br> Standard Shipping <br> Rate</button></div> <div class="col-sm-2 col-md-2"><button class="btn btn-primary">FedEX<br>Coming Soon</button></div><section>');	
});