
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
    //  console.log("url do airport");
    //  console.log(url)
    http.open("GET", url);
    http.onreadystatechange = function() {     
        if (http.readyState === 4 && http.status === 200) {

        var response = http.responseText;
        // console.log(response);
        response = JSON.parse(response);
        // console.log(response);

        // var responseLength =  response.response[0];
        // console.log("responseLength");
        // console.log(responseLength);
        if(response != "undefined"){
            

            airportCode =  response.response[0].code;
            airportName =  response.response[0].name;
            ipAddress   =  response.request.client.ip;
    
            var airport = "The nearest airport is " + airportCode + " - " + airportName + " airport.";
           
            document.getElementById('airport').innerHTML = airport; 

        }else{

            console.log("deu ruimiii");
            document.getElementById('airport').innerHTML = "NOT AVAILABLE IN THIS COUNTRY";

        }

        }
    }; 
    http.send();

}
// end nearest airport information
