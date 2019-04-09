
    // var temperature;
    // var humidity;
    // var condition ;
    var neighbor;
    // var windspeed;
    // var pressure;
    // var temp_max;
    // var temp_min;
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

    http.onreadystatechange = function () {
        if (http.readyState === 4 && http.status === 200) {
        
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

        //call the timeconverter because uses the variable sunset and sunrise
        timeConverter();

        //call the printflag function as the flag URL needs the variable countrycode
        printFlag();

        //call the function create file after get the neighbor name as the function use this variable
        CreateFile();

        }
    }; 
    http.send();

    
}

 function timeConverter(){
    // var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    var newSunset = new Date(sunset * 1000);
    // var year = newSunset.getFullYear();
    // var month = months[newSunrise.getMonth()];
    // var date = newSunset.getDate();
    var hourSunset = newSunset.getHours();
    var minSunset = newSunset.getMinutes();
    var secSunset = newSunset.getSeconds();
    var timeSunset = hourSunset + ':' + minSunset + ':' + secSunset ;

    var newSunrise = new Date(sunrise * 1000);
    // var year = newSunrise.getFullYear();
    // var month = months[newSunrise.getMonth()];
    // var date = newSunrise.getDate();
    var hourSunrise = newSunrise.getHours();
    var minSunrise = newSunrise.getMinutes();
    var secSunrise = newSunrise.getSeconds();
    var timeSunrise = hourSunrise + ':' + minSunrise + ':' + secSunrise ;
    
    document.getElementById('sunsetDIV').innerHTML = timeSunset; 
    document.getElementById('sunriseDIV').innerHTML = timeSunrise; 

}