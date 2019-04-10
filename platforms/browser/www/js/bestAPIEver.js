// https://restcountries.eu/rest/v2/name/brazil#
var alpha2Code;
var alpha3Code;

function theBestAPI(){
    console.log("theBestAPI called");
    var http = new XMLHttpRequest();

    const url = 'https://restcountries.eu/rest/v2/name/Slovak';
    console.log("seu poha");
    console.log(url);
    
    http.open("GET", url);

    http.onreadystatechange = function () {
        if (http.readyState === 4 && http.status === 200) {
        
        var response = http.responseText;
        response = JSON.parse(response);
        console.log(response);
        
        alpha2Code = response[0].alpha2Code;
        alpha3Code = response[0].alpha3Code;
        console.log("alpha2Code" + alpha2Code + "   alpha3Code" + alpha3Code);
        //  temp_max = temp_max + "&#176 degree";
        //  temp_min =  response.main.temp_min;
        // document.getElementById('pressure').innerHTML = pressure; 

        }
    }; 
    http.send();
    vamosver();
}