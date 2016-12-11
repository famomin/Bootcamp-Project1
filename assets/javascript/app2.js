var parcel = {
    // in INCHES
    length: 20,
    width: 15,
    height: 10,
    // in OZ
    weight: 45
};


parcel = JSON.stringify(parcel);


//Heroku Link
var queryURL = "https://nameless-inlet-48347.herokuapp.com/";

//Local Test Link
//var queryURL = 'localhost:3000';

$.ajax({
    url: queryURL,
    type: "POST",
    dataType: "json",
    data: parcel,
    contentType: "application/json",
    complete: function() {
      //called when complete
      console.log('process complete');
    },

    success: function(data) {
      console.log("heres the data")
      console.log(data)
      console.log(data.parcel);
      console.log('process sucess');
   },

    error: function() {
      console.log('process error');
    },
  });

//ajax call to retreive information form the API
// $.ajax({ url: queryURL, method: 'GET'})
// 	.done(function(response){
// 	//results is the response from the API. We mush parse so we can read as an object.
// 	var results = JSON.parse(response);
// 	//Console logging the API
// 	console.log(results);

// 	var a = results.rates[1].rate;
// 	var b = results.parcel;
// 	console.log(a);
// 	console.log(b);
// 	$("#test").html(a);
// })