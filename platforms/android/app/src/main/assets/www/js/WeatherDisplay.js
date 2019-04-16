
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

    //testing Korea App
    // const url = 'http://api.openweathermap.org/data/2.5/weather?lat=37.5665&lon=126.9780&units=metric&appid=c161f2e8363f6ef8be3d9cc89baf322e';

    //  testing sao paulo App
    // const url = 'http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&units=metric&appid=c161f2e8363f6ef8be3d9cc89baf322e';
    
    //lon and lat parameters
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&'+'lon='+lon+'&units=metric&appid=c161f2e8363f6ef8be3d9cc89baf322e';
 
    


    
    http.open("GET", url);
    // console.log(url);

    http.onreadystatechange = function () {
        if (http.readyState === 4 && http.status === 200) {
        
        var response = http.responseText;
        response = JSON.parse(response);
        // console.log(response);
        
         temperature =  response.main.temp;
         temperature ="<f id='degree'>" + temperature + "&#176 degree </f>";
         humidity = response.main.humidity;
         condition = response.weather[0].description;
         neighbor = response.name;
         windspeed =  response.wind.speed;
         windspeed = windspeed +" km/h";
         pressure =  response.main.pressure;
         temp_max =  response.main.temp_max;
         temp_max = temp_max + "&#176 degree";
         temp_min =  response.main.temp_min;
         temp_min = temp_min + "&#176 degree";
         sunrise =  response.sys.sunrise;
         sunset =  response.sys.sunset;
         countryCode = response.sys.country;


        document.getElementById('condition').innerHTML = condition; 
        document.getElementById('temperature').innerHTML = temperature; 
        document.getElementById('neighbor').innerHTML = neighbor;
        document.getElementById('neighborSelect').innerHTML = neighbor;
        document.getElementById('neighborSelect').value = neighbor;
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
        // CreateFile();

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
    var hourSunset = ('0'+newSunset.getHours()).substr(-2);
    var minSunset = ('0'+newSunset.getMinutes()).substr(-2);
    var secSunset = ('0'+newSunset.getHours()).substr(-2);
    // var secSunset = newSunset.getSeconds();
    //var secSunset = ('0'+newSunset.getHours()).substr(-2);
    var timeSunset = hourSunset + ':' + minSunset + ':' + secSunset;

    var newSunrise = new Date(sunrise * 1000);
    // var year = newSunrise.getFullYear();
    // var month = months[newSunrise.getMonth()];
    // var date = newSunrise.getDate();
    var hourSunrise = ('0'+newSunrise.getHours()).substr(-2);
    var minSunrise = ('0'+newSunrise.getMinutes()).substr(-2);
    var secSunrise = ('0'+newSunrise.getSeconds()).substr(-2);
    var timeSunrise = hourSunrise + ':' + minSunrise + ':' + secSunrise;
    
    document.getElementById('sunsetDIV').innerHTML = timeSunset; 
    document.getElementById('sunriseDIV').innerHTML = timeSunrise; 
}