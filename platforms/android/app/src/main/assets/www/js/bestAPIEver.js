var capital;
function theBestAPI(){
    var http = new XMLHttpRequest();

    // const url = 'https://restcountries.eu/rest/v2/name/Slovak';
    const url = 'https://restcountries.eu/rest/v2/name/' + country;

    // console.log(url);
    
    http.open("GET", url);

    http.onreadystatechange = function () {
        if (http.readyState === 4 && http.status === 200) {
        
        var response = http.responseText;
        response = JSON.parse(response);
        
        capital = response[0].capital
        }
    }; 
    http.send();
}
function capitalClick(){window.alert("Capital: " + capital);}
