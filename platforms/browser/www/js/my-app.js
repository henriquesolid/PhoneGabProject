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
    startWatch();    
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
function pics(){
    navigator.camera.getPicture(cameraCallback, onError);
}
function cameraCallback(imageData){
    var image = document.getElementById('myImage');
    image.src = imageData;

    // image.src = "data:image/jpeg;base64," + imageData;

}

// starting device accelaration/motion

// THIS IS THE FUNCTION THAT WILL READ THE ACCELEROMETER
var watchID = null;

function startWatch(){

    // Notice that the function takes two callbacks (accCallback and onError) and
    // a JSON object (options)
    watchID = navigator.accelerometer.watchAcceleration(accCallback, onError, options); 
    // console.log("startwatch function started");

}

// accCallback. This is the function in charge of 
// displayiing the acceleration on the front end

function accCallback(acceleration){

    // var element = document.getElementById('accelerometer');
	// element.innerHTML = 'Acceleration X: ' + acceleration.x + '<br>' +
	// 		      'Acceleration Y: ' + acceleration.y + '<br>' +
	// 		      'Acceleration Z: ' + acceleration.z + '<br>' +
	// 		      'Timestamp: ' + acceleration.timestamp + '<br>';

}

// JSON object
//the frequency that the acceleration updates
var options = {
    frequency: 3000
}
// end device accelaration/motion

//getLocation 
function getLocation(){
    navigator.geolocation.getCurrentPosition(geoCallback, onError);
     // console.log("getLocation called"); 
}
var lat;
var lon;
function geoCallback(position){
     // console.log("geoCallback called");
    lat =   position.coords.latitude;
    lon =  position.coords.longitude;
    
    opencageAPI();
    displayWeather();
    nearestAirport();
    initMap();
    todayDate();
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
    // var marker2 = new google.maps.Marker({
    //     position: home,
    //     map: map
    //     });

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

// function home(){
//     var home = {lat: 53.318627, lng: -6.288998};
//      var map = new
//      google.maps.Map(document.getElementById('map'),
//      { zoom: 15,
//       center: home
//       }
//       );
//       var marker = new google.maps.Marker({
//       position: home, 
//       map: map
//       });
// }

//opencageAPI is the function that get city, currency and country

var currency;
var welcome;
var localCurrency;
function opencageAPI(){
     // console.log("opencageAPI called");
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
        var callingcode = responseJSON.results[0].annotations.callingcode;
       
        welcome = "Welcome to " + city + ", "+ country + ".";
        localCurrency = "Local currency: " + currency + ".";
        var phoneCall =  "If you need to make a phone call the country code is " + callingcode;
        document.getElementById('phoneCall').innerHTML = phoneCall; 
        document.getElementById('welcome').innerHTML = welcome; 
        document.getElementById('localCurrency').innerHTML = localCurrency; 
        // document.getElementById('actualDate').innerHTML = actualDate; 

        currencyExchange();

        }   

}
    var temperature;
    var humidity;
    var condition ;
    var neighbor;
    var WindSpeed;
    var Windy;
    var pressure;
    var temp_max;
    var temp_min;
    var sunrise;
    var sunset;
    var countryCode;
//displayWeather is the function that get the weather
function displayWeather(){
    // console.log("displayWeather called");
    var http = new XMLHttpRequest();
//  const url = 'http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&units=metric&appid=c161f2e8363f6ef8be3d9cc89baf322e';
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&'+'lon='+lon+'&units=metric&appid=c161f2e8363f6ef8be3d9cc89baf322e';
    http.open("GET", url);
    http.send();

    http.onreadystatechange = (e) => {
        var responseWeather = http.responseText;
        responseJSONWeather = JSON.parse(responseWeather);
        // console.log(responseJSONWeather);
        
         temperature =  responseJSONWeather.main.temp;
         temperature ="<f id='degree'>" + temperature + "&#176 degree </f>";
         humidity = responseJSONWeather.main.humidity;
         condition = responseJSONWeather.weather[0].description;
         neighbor = responseJSONWeather.name;
         windspeed =  responseJSONWeather.wind.speed;
         windspeed = windspeed +" km/h";
         pressure =  responseJSONWeather.main.pressure;
         temp_max =  responseJSONWeather.main.temp_max;
         temp_max = temp_max + "&#176 degree";
         temp_min =  responseJSONWeather.main.temp_min;
         temp_min = temp_min + "&#176 degree";
         sunrise =  responseJSONWeather.sys.sunrise;
         sunset =  responseJSONWeather.sys.sunset;
         countryCode = responseJSONWeather.sys.country;


        document.getElementById('condition').innerHTML = condition; 
        document.getElementById('temperature').innerHTML = temperature; 
        document.getElementById('neighbor').innerHTML = neighbor;
        document.getElementById('temp_max').innerHTML = temp_max; 
        document.getElementById('temp_min').innerHTML = temp_min; 
        document.getElementById('windspeed').innerHTML = windspeed; 
        document.getElementById('humidity').innerHTML = humidity; 
        document.getElementById('pressure').innerHTML = pressure; 

        timeConverter();
        printFlag();
        tryingFile();

        } 
    
}

function weatherMore(){

    temp_max = "Maximum: " + temp_max + "&#176 degree<br>";
    temp_min = "Minimum: " + temp_min + "&#176 degree<br>";
    Windy = "Windy: " + Windy + "<br>";
    humidity = "Humidity: " + humidity + "<br>";
    pressure = "pressure: " + pressure + "<br>";


    sunrise = "sunrise: " + sunrise + "<br>";
    
    var weatherMore = temp_max + temp_min + Windy + humidity + pressure;
    var weatherMore = "<div class='row'> <div class='col'>Maximum:</div> <div class='col'>" + temp_max + "&#176degree<br> </div> </div> <div class='row'> <div class='col'>Minimum:</div> <div class='col'>" + temp_min + "&#176degree<br> </div> </div> <div class='row'> <div class='col'>Windy:</div> <div class='col'>" + Windy + "<br> </div> </div> <div class='row'> <div class='col'>Humidity:</div> <div class='col'>" + humidity + "<br> </div> </div> <div class='row'> <div class='col'>Pressure:</div> <div class='col'>" + pressure + "<br> </div> </div>";

    document.getElementById('weatherMore').innerHTML = weatherMore; 


}

//function to print the flag
function printFlag(){
// console.log("printFlag called");


//change the countrycode to lowercase to use it in the URL to the the flag
   countryCode = countryCode.toLowerCase();

// document.getElementById("myDiv").style.backgroundImage = "url('img_tree.png')";
// document.getElementById('flag').style.backgroundImage = "url('http://flags.fmcdn.net/data/flags/w580/" + countryCode + ".png";

var flagUrl = document.getElementById('flag').src="http://flags.fmcdn.net/data/flags/w580/" + countryCode + ".png";
// console.log(flagUrl);
}

// currency below
// http://apilayer.net/api/live?access_key=0c926538381be4e7284c7b41ed282fda&convert?from=EUR&to=GBP&amount=100 

var USDUSD;
var USDEUR;
var USDBRL;
var USDGBP;
var USDJPY;
var USDKRW;
var Real;
var Pound;
var Euro;
var Yen;
var Won;
// currencyExchange is the function that get currenty currency
function currencyExchange(){
   // console.log("currencyExchange called");
    //store in a variable the http request
    var http = new XMLHttpRequest();    
    //http://apilayer.net/api/live?access_key=0c926538381be4e7284c7b41ed282fda&convert?from=EUR&to=GBP&amount=100

    //create a variable with the URL that has the JSON
    const url = 'http://www.apilayer.net/api/live?access_key=0c926538381be4e7284c7b41ed282fda';
  //GET THE INFORMATION
    http.open("GET", url);
    http.send();


//READY THE HTTP REQUEST
    http.onreadystatechange = (e) => {
          
        //STORE IN A VARIABLE THE HTTP RESPONSE
        var responseCurrencyExchange = http.responseText;

        //TRANSLTE THE RESPONSE IN JSON
        var responseCurrencyExchange = JSON.parse(responseCurrencyExchange);
        
        //CREATE A VARIABLE WITH DOLLAT TO EURO, FROM THE JSON ANSWER
        //the .toprecision makes it with the number of caracter, example euro we need just the first tree digits.
           USDUSD =  responseCurrencyExchange.quotes.USDUSD.toPrecision(3);
           USDEUR =  responseCurrencyExchange.quotes.USDEUR.toPrecision(2);
           USDBRL =  responseCurrencyExchange.quotes.USDBRL.toPrecision(3);
           USDGBP =  responseCurrencyExchange.quotes.USDGBP.toPrecision(3);
           USDJPY =  responseCurrencyExchange.quotes.USDJPY.toPrecision(5);
           USDKRW =  responseCurrencyExchange.quotes.USDKRW.toPrecision(6);
       
       //fill the field ammount in dolar with one dolar.
         document.getElementById('AmmountMoney').value = USDUSD; 
    
        var divSelectionOfCurrency = "<div class='row'> <div class='col'> <input type='number' id='numberTwo' class='' disabled> </div> <div class='col'> <select oninput='calcT()' onchange='calcT()' id='CurrencySelection'> <option value='"+currency+"'>"+currency+"</option> <option value='Reais'>Brazilian Real</option> <option value='Pound'>Pound sterling</option> <option value='Dollar'>United States Dollar</option> <option value='Yen'>Japanese Yen</option> <option value='Won'>South Korean won</option> </select> </div></div>";
         document.getElementById('divSelectionOfCurrency').innerHTML = divSelectionOfCurrency; 

         calcT();
         Real =  USDUSD / USDBRL;
         Pound = USDUSD / USDGBP;
         Euro = USDUSD / USDEUR;
         Yen = USDUSD / USDJPY;
         Won = USDUSD / USDKRW;
    }
}
var AmmountMoney; 
var CurrencySelection;
var FromCurrencySelection;
var FromCurrencyToDollar;
function calcT(){
    // console.log("calcT called");
    AmmountMoney = document.getElementById('AmmountMoney').value; 
    AmmountMoney = parseInt(AmmountMoney);
  
    //first field selection
    FromCurrencySelection = document.getElementById('FromCurrencySelection').value;
    
    // ((ammount * selector um(ex: real) * selector dois(ex: pound)
                //valor br in dollar entao dollar in pound
    switch(FromCurrencySelection){
        case "Dollar":
            FromCurrencyToDollar = (AmmountMoney * USDUSD);

        break;

        case "Reais":
            FromCurrencyToDollar = (AmmountMoney * Real);

        break;
        
        case "Pound":
            FromCurrencyToDollar = (AmmountMoney * Pound) ;
        break;
        
        case "Euro":
            FromCurrencyToDollar = (AmmountMoney * Euro);

        break;
        
        case "Yen":
            FromCurrencyToDollar = (AmmountMoney * Yen);

        break;
        
        case "Won":            
            FromCurrencyToDollar = (AmmountMoney * Won);

        break;
    }

    //second currency selector
    CurrencySelection = document.getElementById('CurrencySelection').value;

    switch(CurrencySelection){
        case "Dollar":
            CurrencySelection = USDUSD;

         break;

        case "Reais":
            CurrencySelection = USDBRL;

        break;
        
        case "Pound":
            CurrencySelection = USDGBP;
        break;
        
        case "Euro":
            CurrencySelection = USDEUR;

        break;
        
        case "Yen":
            CurrencySelection = USDJPY;

        break;
        
        case "Won":            
            CurrencySelection = USDKRW;
        break;
    }

    document.getElementById('numberTwo').value = ((FromCurrencyToDollar) * CurrencySelection) ;
    
}

//end currency function

var ipAddress;
var airportCode;
var airportName;
// nearest airport information
//nearestAirport is the function that get the weather
function nearestAirport(){
     // console.log("nearestAirport called");
    
     var http = new XMLHttpRequest();
    //const url = 'http://iatacodes.org/api/v6/nearby?api_key=e6d5fae9-f7b9-4d1a-a219-08a0a5447427&lat=53.3458902&lng=-6.2575&distance=100';
    //  const url = 'http://iatacodes.org/api/v6/nearby?api_key=e6d5fae9-f7b9-4d1a-a219-08a0a5447427&lat='+lat+'&'+'lng='+lon+'&distance=100';
      const url = 'http://iatacodes.org/api/v6/nearby?api_key=YOUR-API-KEY&lat='+lat+'&'+'lng='+lon+'&distance=100';
     // console.log("url do airport");
     // console.log(url)
    http.open("GET", url);
    http.send();

    http.onreadystatechange = (e) => {     
        var responseAirport = http.responseText;
        responseAirport = JSON.parse(responseAirport);
        airportCode =  responseAirport.response[0].code;
        airportName =  responseAirport.response[0].name;
        ipAddress   =  responseAirport.request.client.ip;
        var airport = "The nearest airport is " + airportCode + " - " + airportName + " airport.";
       
        document.getElementById('airport').innerHTML = airport; 

        } 
}
// end nearest airport information

function shake(){
    navigator.vibrate(1000);
     // console.log("shaking working!");
}

function tryingFile(){
    // console.log("tryingFile called");
//get access to file system
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemCallback, onError
    );
}

function fileSystemCallback(fs){
    // console.log("fileSystemCallback called");

    // Name of the file I want to create
    var fileToCreate = "filewithneighbors.txt";

    // Opening/creating the file
    fs.root.getFile(fileToCreate, fileSystemOptionals, getFileCallback, onError);
}

var fileSystemOptionals = { create: true, exclusive: false };

//after file system called, filesystem call back get the file system result and open/create the file
//getfilecallback create a file with the 
function getFileCallback(fileEntry){
    // console.log("getFileCallback called");

    // var textInsert = document.getElementById('yourText').value;
    var dataObj = new Blob([neighbor], { type: 'text/plain' });
    // Now decide what to do
    // Write to the file
    writeFile(fileEntry, dataObj);

    // Or read the file
    readFile(fileEntry);
}

// Let's write some files
function writeFile(fileEntry, dataObj) {
    // console.log("writeFile called");
    // console.log(neighbor + "neighbor");

    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function (fileWriter) {

        // If data object is not passed in,
        // create a new Blob instead.
        if (!dataObj) {
            dataObj = new Blob([neighbor], { type: 'text/plain' });
        }

        fileWriter.write(dataObj);

        fileWriter.onwriteend = function() {
            // console.log("Successful file write...");
        };

        fileWriter.onerror = function (e) {
            // console.log("Failed file write: " + e.toString());
        };

    });
}
var varFile;
// Let's read some files
function readFile(fileEntry) {
    // console.log("readFile called");

    // Get the file from the file entry
    fileEntry.file(function (file) {
        
        // Create the reader
        var reader = new FileReader();
        reader.readAsText(file);

        reader.onloadend = function() {
            // console.log("Successful file read: " + this.result);
            varFile = this.result;
            // console.log("file path: " + fileEntry.fullPath);
        };

    }, onError);
}

function tryinganother(){
    // console.log(varFile);
}



 var timeSunrise;
 var timeSunset;

 function timeConverter(){
    // var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    var newSunset = new Date(sunset * 1000);
    // var year = newSunset.getFullYear();
    // var month = months[newSunrise.getMonth()];
    // var date = newSunset.getDate();
    var hourSunset = newSunset.getHours();
    var minSunset = newSunset.getMinutes();
    var secSunset = newSunset.getSeconds();
    timeSunset = hourSunset + ':' + minSunset + ':' + secSunset ;

    var newSunrise = new Date(sunrise * 1000);
    // var year = newSunrise.getFullYear();
    // var month = months[newSunrise.getMonth()];
    // var date = newSunrise.getDate();
    var hourSunrise = newSunrise.getHours();
    var minSunrise = newSunrise.getMinutes();
    var secSunrise = newSunrise.getSeconds();
    timeSunrise = hourSunrise + ':' + minSunrise + ':' + secSunrise ;
    
    // // accelerationTimestamp
    // var time = new Date(accelerationTimestamp * 1000);
    // var year = time.getFullYear();
    // var month = months[time.getMonth()];
    // var date = time.getDate();
    // var hour = time.getHours();
    // var min = time.getMinutes();
    // var sec = time.getSeconds();
    // var timeNow = year + " " + date + " " + month + " " + hour + ':' + minSunrise + ':' + secSunrise ;
    

    // document.getElementById('timeNow').innerHTML = timeNow; 
    document.getElementById('sunsetDIV').innerHTML = timeSunset; 
    document.getElementById('sunriseDIV').innerHTML = timeSunrise; 

}

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
   
function onError(msg){
    // console.log("onError called");
    // console.log(msg);
}

function todayDate(){
var objToday = new Date(),
	weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
	dayOfWeek = weekday[objToday.getDay()],
	domEnder = function() { var a = objToday; if (/1/.test(parseInt((a + "").charAt(0)))) return "th"; a = parseInt((a + "").charAt(1)); return 1 == a ? "st" : 2 == a ? "nd" : 3 == a ? "rd" : "th" }(),
	dayOfMonth = today + ( objToday.getDate() < 10) ? '0' + objToday.getDate() + domEnder : objToday.getDate() + domEnder,
	months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
	curMonth = months[objToday.getMonth()],
	curYear = objToday.getFullYear(),
	curHour = objToday.getHours() > 12 ? objToday.getHours() - 12 : (objToday.getHours() < 10 ? "0" + objToday.getHours() : objToday.getHours()),
	curMinute = objToday.getMinutes() < 10 ? "0" + objToday.getMinutes() : objToday.getMinutes(),
	curSeconds = objToday.getSeconds() < 10 ? "0" + objToday.getSeconds() : objToday.getSeconds(),
	curMeridiem = objToday.getHours() > 12 ? "PM" : "AM";
// var today = curHour + ":" + curMinute + "." + curSeconds + curMeridiem + " " + dayOfWeek + " " + dayOfMonth + " of " + curMonth + ", " + curYear;
var today = dayOfWeek + ", " + dayOfMonth + " " + curMonth + " of " + curYear;
document.getElementById('timeNow').innerHTML = today;

}
