// https://restcountries.eu/rest/v2/name/brazil#
var capital;
function theBestAPI(){
    console.log("theBestAPI called");
    var http = new XMLHttpRequest();

    // const url = 'https://restcountries.eu/rest/v2/name/Slovak';
    const url = 'https://restcountries.eu/rest/v2/name/' + country;

    // console.log(url);
    
    http.open("GET", url);

    http.onreadystatechange = function () {
        if (http.readyState === 4 && http.status === 200) {
        
        var response = http.responseText;
        response = JSON.parse(response);
        // console.log(response);
        
        var alpha2Code = response[0].alpha2Code;
        var alpha3Code = response[0].alpha3Code;
        capital = response[0].capital

        }
    }; 
    http.send();
}
function capitalClick(){window.alert("Capital: " + capital);}
