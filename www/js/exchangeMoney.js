
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
//    console.log("currencyExchange called");

    //store in a variable the http request
    var http = new XMLHttpRequest();    
    //http://apilayer.net/api/live?access_key=0c926538381be4e7284c7b41ed282fda&convert?from=EUR&to=GBP&amount=100

    //create a variable with the URL that has the JSON
    const url = 'http://www.apilayer.net/api/live?access_key=0c926538381be4e7284c7b41ed282fda';
  //GET THE INFORMATION
    http.open("GET", url);


//READY THE HTTP REQUEST
        http.onreadystatechange = function () {
            if (http.readyState === 4 && http.status === 200) {

                //STORE IN A VARIABLE THE HTTP RESPONSE
                var response = http.responseText;

                //TRANSLTE THE RESPONSE IN JSON
                var response = JSON.parse(response);
                
                //CREATE A VARIABLE WITH DOLLAT TO EURO, FROM THE JSON ANSWER
                //the .toprecision makes it with the number of caracter, example euro we need just the first tree digits.
                USDUSD =  response.quotes.USDUSD.toPrecision(3);
                USDEUR =  response.quotes.USDEUR.toPrecision(2);
                USDBRL =  response.quotes.USDBRL.toPrecision(3);
                USDGBP =  response.quotes.USDGBP.toPrecision(3);
                USDJPY =  response.quotes.USDJPY.toPrecision(5);
                USDKRW =  response.quotes.USDKRW.toPrecision(6);
            
            //fill the field ammount in dolar with one dolar.
                document.getElementById('AmmountToConvert').value = USDUSD; 
            
                document.getElementById('exchangeLocal').value = currency; 
                document.getElementById('exchangeLocal').innerHTML = currency; 


                calcT();
                Real =  USDUSD / USDBRL;
                Pound = USDUSD / USDGBP;
                Euro = USDUSD / USDEUR;
                Yen = USDUSD / USDJPY;
                Won = USDUSD / USDKRW;
            }
        };
        http.send();


}
var AmmountToConvert; 
var ToCurrency;
var FromCurrency;
var AmmounToConvertTimesFromCurrency;
function calcT(){
    // console.log("calcT called");
    AmmountToConvert = document.getElementById('AmmountToConvert').value; 
    AmmountToConvert = parseInt(AmmountToConvert);
  
    //first field selection
    FromCurrency = document.getElementById('FromCurrency').value;
    
    // ((ammount * selector um(ex: real) * selector dois(ex: pound)
                //valor br in dollar THAN dollar in pound
    switch(FromCurrency){
        case "Dollar":
            AmmounToConvertTimesFromCurrency = (AmmountToConvert * USDUSD);

        break;

        case "Reais":
            AmmounToConvertTimesFromCurrency = (AmmountToConvert * Real);

        break;
        
        case "Pound":
            AmmounToConvertTimesFromCurrency = (AmmountToConvert * Pound) ;
        break;
        
        case "Euro":
            AmmounToConvertTimesFromCurrency = (AmmountToConvert * Euro);

        break;
        
        case "Yen":
            AmmounToConvertTimesFromCurrency = (AmmountToConvert * Yen);

        break;
        
        case "Won":            
            AmmounToConvertTimesFromCurrency = (AmmountToConvert * Won);

        break;
    }

    
   

    //second currency selector
    ToCurrency = document.getElementById('ToCurrency').value;

    if (ToCurrency != 'Dollar' 
        &&
        ToCurrency != 'Euro'
        &&
        ToCurrency != 'Reais'
        &&
        ToCurrency != 'Pound'
        &&
        ToCurrency != 'Won'
        &&
        ToCurrency != 'Yen'
    ){
        var alertCurrency = "Sorry the local currency is not available at the currency converter tool.<br> Euro has been selected instead."
        document.getElementById('currencyNotSupported').innerHTML = alertCurrency;
        document.getElementById('exchangeLocal').value = "Euro";
        document.getElementById('exchangeLocal').innerHTML = "Euro"; 


        console.log("Sorry the local currency is not available at the currency converter tools, Euro has beselecteden  instead.");
    }
    else{
        document.getElementById('currencyNotSupported').innerHTML = "";
    }






    switch(ToCurrency){
        case "Dollar":
            ToCurrency = USDUSD;

         break;

        case "Reais":
            ToCurrency = USDBRL;

        break;
        
        case "Pound":
            ToCurrency = USDGBP;
        break;
        
        case "Euro":
            ToCurrency = USDEUR;

        break;
        
        case "Yen":
            ToCurrency = USDJPY;

        break;
        
        case "Won":            
            ToCurrency = USDKRW;
        break;
    }


    document.getElementById('numberTwo').value = ((AmmounToConvertTimesFromCurrency) * ToCurrency) ;
    
}

//end currency function
