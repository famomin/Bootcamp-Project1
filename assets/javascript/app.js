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

	// //User fromAddress data 
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
		//Using c for the for loop below
		var c = results.rates
		//Variable for parcel data
		var b = results.parcel;
		console.log(a);
		//Prints Parcel data
		console.log(b);

		//Creating array for each carrier
		var cheapestUSPS = [];
		var cheapestUPS = [];
		var cheapestFEDEX = [];

		var lowestUSPS;
		var lowestUPS;
		var lowestFEDEX; 

		//For loop goes throught all the rates and gives you the cheapest rate for each carrier
		for (var i = 0; i < c.length; i ++) {
			if (results.rates[i].carrier === "USPS"){
				//console.log("USPS");
				//Converting the rate value to an integer
				var usps = parseFloat(results.rates[i].rate);
				//Pushing to the array
				cheapestUSPS.push(usps);
			}
			else if (results.rates[i].carrier === "UPS"){
				//console.log("UPS")
				//Converting the rate value to an integer
				var ups = parseFloat(results.rates[i].rate);
				//Pushing to the array
				cheapestUPS.push(ups);
			}
			else if (results.rates[i].carrier === "fedex"){
				//console.log("fedex")
				//Converting the rate value to an integer
				var fedex = parseFloat(results.rates[i].rate);
				//Pushing to the array
				cheapestFEDEX.push(ups);	
			}
			else{
				console.log("ERROR: Check the for loop for finding lowes price.")
			}

		
		}

		//Finding the lowest value in the array
		lowestUSPS = Math.min.apply(null, cheapestUSPS);
		console.log(lowestUSPS);

		//Finding the lowest value in the array
		lowestUPS = Math.min.apply(null, cheapestUPS);
		console.log(lowestUPS);

		//Finding the lowest value in the array
		lowestFEDEX = Math.min.apply(null, cheapestFEDEX);
		//console.log(lowestFEDEX);
		
		
		
	});

	$('#ratesButtonRow').html('<section class="center-block"> <div class="col-sm-3 col-sm-offset-3 col-md-2 col-md-offset-3"><button class="btn btn-primary carrierChosen" value="USPS">USPS <br>Standard Shipping <br> Rate</button></div> <div class="col-sm-2 col-md-2"><button class="btn btn-primary carrierChosen" value="UPS">UPS <br> Standard Shipping <br> Rate</button></div> <div class="col-sm-2 col-md-2"><button class="btn btn-primary carrierChosen" value="fedex">FedEX<br>Coming Soon</button></div><section>');

	


});