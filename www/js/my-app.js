// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
    getLocation();
});


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page

})

// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;

    if (page.name === 'about') {
        // Following code will be executed for page with data-page attribute equal to "about"
        myApp.alert('Here comes About page');
    }
})

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    myApp.alert('Here comes About page');
})




//***********start device diagnotiscs */

function vamosver(){

    var today = new Date().toLocaleDateString('ko-KR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
    console.log(today);

}

//***********finish device diagnotiscs */












// // starting device accelaration/motion

// // THIS IS THE FUNCTION THAT WILL READ THE ACCELEROMETER
// var watchID = null;

// function startWatch(){

//     // Notice that the function takes two callbacks (accCallback and onError) and
//     // a JSON object (options)
//     watchID = navigator.accelerometer.watchAcceleration(accCallback, onError, options); 
//     // console.log("startwatch function started");

// }

// // accCallback. This is the function in charge of 
// // displayiing the acceleration on the front end

// function accCallback(acceleration){

//     // var element = document.getElementById('accelerometer');
// 	// element.innerHTML = 'Acceleration X: ' + acceleration.x + '<br>' +
// 	// 		      'Acceleration Y: ' + acceleration.y + '<br>' +
// 	// 		      'Acceleration Z: ' + acceleration.z + '<br>' +
// 	// 		      'Timestamp: ' + acceleration.timestamp + '<br>';

// }

// // JSON object
// //the frequency that the acceleration updates
// var options = {
//     frequency: 3000
// }
// // end device accelaration/motion

//getLocation 
function getLocation(){
    navigator.geolocation.getCurrentPosition(geoCallback, onError);
     // console.log("getLocation called"); 

}
var lat;
var lon;
function geoCallback(position){
     // console.log("geoCallback called");
    lat =   position.coords.latitude; //latitude vital for the app
    // lat = 35.1595;
    lon =  position.coords.longitude; //longitude vital for the app
    // lon = 126.8526;

    opencageAPI();  //get city, country and more
    displayWeather(); //file WeatherDisplay.js
    nearestAirport(); //file airportcall.js
    initMap();     //google maps
    todayDate(); //file data.js
}




function initMap() {
    var yourLocation = {lat: lat, lng: lon};
    var map = new
   google.maps.Map(document.getElementById('map'),
   { zoom: 6,
    center: yourLocation
    }
    );
    var marker = new google.maps.Marker({
    position: yourLocation, 
    map: map
    });
   }

function refreshMap(){
    // console.log("refreshMap called ");
    var point = {lat: lat, lng: lon};
    var map = new
   google.maps.Map(document.getElementById('map'),
   { zoom: 17,
    center: point
    }
    );
    var marker = new google.maps.Marker({
    position: point, 
    map: map
    });
}



//opencageAPI is the function that get city, currency and country

var currency;
var welcome;
var localCurrency;
var country;
var city;
function opencageAPI(){
     // console.log("opencageAPI called");
    var http = new XMLHttpRequest();
    // const url = 'https://api.opencagedata.com/geocode/v1/json?q=53.3458+-6.2575&key=9614ccc2a3db467aa291f7aaea02676c';
    const url = 'https://api.opencagedata.com/geocode/v1/json?q='+lat+'+'+lon+'&key=9614ccc2a3db467aa291f7aaea02676c';
    // console.log(url);
    http.open("GET", url);

    http.onreadystatechange = function () {
        if (http.readyState === 4 && http.status === 200) {
            
        var response = http.responseText;
        var responseJSON = JSON.parse(response);
        // console.log(responseJSON);

        city =  responseJSON.results[0].components.city;
        country =  responseJSON.results[0].components.country;
        currency =  responseJSON.results[0].annotations.currency.name;
        var callingcode = responseJSON.results[0].annotations.callingcode;
       
        welcome = "Welcome to " + city + ", "+ country + ".";
        localCurrency = "Local currency: " + currency + ".";
        var phoneCall =  "If you need to make a phone call the country code is " + callingcode;
        document.getElementById('phoneCall').innerHTML = phoneCall; 
        document.getElementById('welcome').innerHTML = welcome; 
        document.getElementById('localCurrency').innerHTML = localCurrency; 

        document.getElementById('countrySelect').innerHTML = country;
        document.getElementById('countrySelect').value = country;

        document.getElementById('citySelect').innerHTML = city;
        document.getElementById('citySelect').value = city;


        currencyExchange(); //file exchangemoney.js
        CreateFileFunction(); //call this function here because it uses the variable country
        theBestAPI();

        }
    };
    http.send();


}

//function to print the flag
function printFlag(){
    // console.log("printFlag called");

    //change the countrycode to lowercase to use it in the URL to the the flag
   countryCode = countryCode.toLowerCase();

    document.getElementById('flag').src="http://flags.fmcdn.net/data/flags/w580/" + countryCode + ".png";
}
//end print flag



//function shake device
function shake(){
    navigator.vibrate(1000);
     // console.log("shaking working!");
}
//end shake device function




//function to catch erros
function onError(message){
    // console.log("onError called");
    //  console.log(message);
    alert('Failed because: ' + message);
}
//end catch error function







//below were created but upgraded, but can be useful someday

//   var sunsetResponse;
//   // timestamp converter for weather
//   function timeStampConverter(){

//        //store in a variable the http request
//        var http = new XMLHttpRequest();    
//        //https://helloacm.com/api/unix-timestamp-converter/?cached&s=1553667088
   
  
//        //create a variable with the URL that has the JSON
//        const url = "https://helloacm.com/api/unix-timestamp-converter/?cached&s=" + sunset;
//        //const url = 'https://helloacm.com/api/unix-timestamp-converter/?cached&s=1553667088';
  
//      //GET THE INFORMATION
//        http.open("GET", url);
//        http.send();
     
//    //READY THE HTTP REQUEST
//       http.onreadystatechange = (e) => {
          
//            //STORE IN A VARIABLE THE HTTP RESPONSE
//            var sunsetResponse = http.responseText;
                         
//               //TRANSLTE THE RESPONSE IN JSON
//            sunsetResponse = JSON.parse(sunsetResponse);
  
//           var sunsetDIV = "<div class='row'> <div class='col'> Sunset: </div> <div class='col'>" + sunsetResponse + "</div> </div>";
  
//           //fill the field ammount in dolar with one dolar.
//             document.getElementById('sunset').innerHTML = sunsetDIV; 
  
//        }
//    }
   