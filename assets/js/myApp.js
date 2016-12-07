var queryURL = "http://localhost:3000/"

$.ajax({ url: queryURL, method: "GET"}).done(function(response){
    var results = response.data;
    console.log(results);
});