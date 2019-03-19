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
    // console.log("Device is ready!");
    //start watch is for the device motion
    // startWatch();    
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


function shake(){
    navigator.vibrate(1000);
     console.log("shaking working!");
}


// accCallback. This is the function in charge of 
// displayiing the acceleration on the front end
function accCallback(acceleration){

    var element = document.getElementById('accelerometer');
	element.innerHTML = 'Acceleration X: ' + acceleration.x + '<br>' +
			      'Acceleration Y: ' + acceleration.y + '<br>' +
			      'Acceleration Z: ' + acceleration.z + '<br>' +
			      'Timestamp: ' + acceleration.timestamp + '<br>';


}

// onError callback
function onError(msg){
    // console.log(msg);
    // console.log("not working");

}

// JSON object
var options = {
    frequency: 3000
}

// THIS IS THE FUNCTION THAT WILL READ THE ACCELEROMETER
var watchID = null;
function startWatch(){

    // Notice that the function takes two callbacks (accCallback and onError) and
    // a JSON object (options)
    watchID = navigator.accelerometer.watchAcceleration(accCallback, onError, options); 
    // console.log("startwatch function started");

}

function getLocation(){
    navigator.geolocation.getCurrentPosition(geoCallback, onError, displayWeather);
     console.log("getLocation called"); 
}

function geoCallback(position){
     console.log("geoCallback called");
    var lat =   position.coords.latitude;
    var lon =  position.coords.longitude;
  
    onvrdisplaypresentchange(lat, lon);
    refreshMap(lat, lon);
    displayWeather(lat, lon);
    printFlag(lat, lon);
    currencyExchange();
}

function initMap() {
    var cct = {lat: 53.3458902, lng: -6.2575};
    var map = new
   google.maps.Map(document.getElementById('map'),
   { zoom: 15,
    center: cct
    }
    );
    var marker = new google.maps.Marker({
    position: cct, 
    map: map
    });
    var marker2 = new google.maps.Marker({
        position: home,
        map: map
        });

   }

function refreshMap(lat, lon){
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

function home(lat, lon){
    var home = {lat: 53.318627, lng: -6.288998};
     var map = new
     google.maps.Map(document.getElementById('map'),
     { zoom: 15,
      center: home
      }
      );
      var marker = new google.maps.Marker({
      position: home, 
      map: map
      });
  
}

//onvrdisplaypresentchange is the function that get city, currency and country

var currency;
function onvrdisplaypresentchange(lat, lon){
     console.log("onvrdisplaypresentchange called");
    var http = new XMLHttpRequest();
    // const url = 'https://api.opencagedata.com/geocode/v1/json?q=53.3458+-6.2575&key=9614ccc2a3db467aa291f7aaea02676c';
    const url = 'https://api.opencagedata.com/geocode/v1/json?q='+lat+'+'+lon+'&key=9614ccc2a3db467aa291f7aaea02676c';
    http.open("GET", url);
    http.send();

    http.onreadystatechange = (e) => {
        var response = http.responseText;
        var responseJSON = JSON.parse(response);

        var city =  responseJSON.results[0].components.city;
        var country =  responseJSON.results[0].components.country;
        currency =  responseJSON.results[0].annotations.currency.name;
        console.log(currency);
        var callingcode = responseJSON.results[0].annotations.callingcode;
        var timestamp2 = responseJSON.timestamp.created_http;
        var oc ="<div>"+ timestamp2 + "</div><br><br><h1>Hi there, welcome to " + city + ", "+ country + ".</h1><br>" + currency + " is the local currency." + "<br> If you need to make a phone call the country code is " + callingcode;
        document.getElementById('citycountrycurrency').innerHTML = oc; 
        
        var ac = currency;
        document.getElementById('localCurrency').innerHTML = ac; 
        


        }   


}

//displayWeather is the function that get the weather
function displayWeather(lat, lon){
    // console.log("displayWeather called");
    var http2 = new XMLHttpRequest();
//  const url = 'http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&units=metric&appid=c161f2e8363f6ef8be3d9cc89baf322e';
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&'+'lon='+lon+'&units=metric&appid=c161f2e8363f6ef8be3d9cc89baf322e';
    http2.open("GET", url);
    http2.send();

    http2.onreadystatechange = (e) => {
        var responseWeather = http2.responseText;
        var responseJSONWeather = JSON.parse(responseWeather);
        // console.log("below the weather informations");
        // console.log(responseJSONWeather);

        var temperature =  responseJSONWeather.main.temp;
        var humidity = responseJSONWeather.main.humidity;
        var weatherConditions = responseJSONWeather.weather[0].description;;
        var cityName = responseJSONWeather.name;
        var WindSpeed =  responseJSONWeather.wind.speed;
        

        var htmlWeather = "You are in "+cityName + "<br><b> " + temperature + "&#176;</b> degree<br> " + "Humidity: " +humidity+ "<br>Windy: "+WindSpeed+" km/h";
         document.getElementById('displayWeather').innerHTML = htmlWeather; 

        } 
        

}
function printFlag(lat, lon){
    // console.log("print flag");
    // console.log("printing longitude");
    // console.log(lon);
    // console.log("printing latitude");
    // console.log(lat);
}

// currency below
// http://apilayer.net/api/live?access_key=0c926538381be4e7284c7b41ed282fda&convert?from=EUR&to=GBP&amount=100 

var USDUSD;
var USDEUR;
var USDBRL;
var USDGBP;
var USDJPY;
var USDKRW;
// currencyExchange is the function that get currenty currency
function currencyExchange(){
   console.log("currencyExchange called");
    //store in a variable the http request
    var httpCurrencyExchange = new XMLHttpRequest();    
    //http://apilayer.net/api/live?access_key=0c926538381be4e7284c7b41ed282fda&convert?from=EUR&to=GBP&amount=100

    //create a variable with the URL that has the JSON
    const url = 'http://apilayer.net/api/live?access_key=0c926538381be4e7284c7b41ed282fda&convert?from=EUR&to=GBP&amount=100';
  //GET THE INFORMATION
    httpCurrencyExchange.open("GET", url);
    httpCurrencyExchange.send();
    // console.log(url);


//READY THE HTTP REQUEST
    httpCurrencyExchange.onreadystatechange = (e) => {
        //STORE IN A VARIABLE THE HTTP RESPONSE
        var responseCurrencyExchange = httpCurrencyExchange.responseText;

        //TRANSLTE THE RESPONSE IN JSON
        var responseCurrencyExchangeJson = JSON.parse(responseCurrencyExchange);
        //   console.log(responseCurrencyExchangeJson);

        //CREATE A VARIABLE WITH DOLLAT TO EURO, FROM THE JSON ANSWER
        //the .toprecision makes it with the number of caracter, example euro we need just the first tree digits.
           USDUSD =  responseCurrencyExchangeJson.quotes.USDUSD.toPrecision(3);
           USDEUR =  responseCurrencyExchangeJson.quotes.USDEUR.toPrecision(2);
           USDBRL =  responseCurrencyExchangeJson.quotes.USDBRL.toPrecision(3);
           USDGBP =  responseCurrencyExchangeJson.quotes.USDGBP.toPrecision(3);
           USDJPY =  responseCurrencyExchangeJson.quotes.USDJPY.toPrecision(5);
           USDKRW =  responseCurrencyExchangeJson.quotes.USDKRW.toPrecision(6);


       //CREATE A VARIABLE WITH HTML AND JSON
         var CurrencyExchangeHTML ="1 United States Dollar in Euro equals<br><b><font size=6>" +USDEUR+"</font></b><br> 1 United States Dollar in Reais equals<br><b><font size=6>" +USDBRL+"</font></b>";
        
        //SEND THE VARIABLE TO ELEMENT ID, WHICH IS A DIV ON HTML
         document.getElementById('CurrencyExchangeHTML').innerHTML = CurrencyExchangeHTML; 
       
       
       //fill the field ammount in dolar with one dolar.
         document.getElementById('numberOne').value = USDUSD; 

         calcT();

    }

}
var firstNumber; 
var CurrencySelection;
function calcT(){
    console.log("calcT called");
    firstNumber = document.getElementById('numberOne').value; 
    firstNumber = parseInt(firstNumber);
  

    CurrencySelection = document.getElementById('CurrencySelection').value;
   
    switch(CurrencySelection){
        case "Reais":
            CurrencySelection = USDBRL;

            console.log("reais "+USDBRL);

        break;
        
        case "Pound":
            CurrencySelection = USDGBP;
            console.log("Pound "+USDGBP);

        break;
        
        case "Euro":
            CurrencySelection = USDEUR;
            console.log("euro "+USDEUR);
        break;
        
        case "Yen":
            CurrencySelection = USDJPY;
            console.log("japonese "+USDJPY);

        break;
        
        case "Won":            
            CurrencySelection = USDKRW;
            console.log("Korean Won "+USDKRW);

        break;
    }

    document.getElementById('numberTwo').value = firstNumber * CurrencySelection ;
    console.log("first number  certo?"+firstNumber +"CurrencySelection"+CurrencySelection)
    
}

//end currency function


