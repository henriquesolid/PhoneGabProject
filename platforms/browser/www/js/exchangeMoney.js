
// currency below
// http://apilayer.net/api/live?access_key=0c926538381be4e7284c7b41ed282fda&convert?from=EUR&to=GBP&amount=100 


//the free version of the API only prevides american exchange rate, so I had to translate from america to other currencys
var USDUSD; //dolar exchange
var USDEUR; //euro exchange
var USDBRL; //Brasil exchange, I am Brazilian
var USDGBP; //pound exchange
var USDJPY; //japanese exchange
var USDKRW; //korean exchange, my girlfriend is korean
var Real;   //AMERICA TO REAL
var Pound;  //POUND TO REAL
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
                // console.log(response);
                
                //CREATE A VARIABLE WITH DOLLAT TO EURO, FROM THE JSON ANSWER
                //the .toprecision makes it with the number of caracter, example euro we need just the first tree digits.
                USDUSD =  response.quotes.USDUSD.toPrecision(3);  
                USDEUR =  response.quotes.USDEUR.toPrecision(2);
                USDBRL =  response.quotes.USDBRL.toPrecision(3);
                USDGBP =  response.quotes.USDGBP.toPrecision(3);
                USDJPY =  response.quotes.USDJPY.toPrecision(5);
                USDKRW =  response.quotes.USDKRW.toPrecision(6);
            
            //fill the field ammount in dolar with one dolar.
                document.getElementById('AmmountToConvert').value = USDUSD; //WHICH WILL BE ALWAYS ONE.
            
                document.getElementById('exchangeLocal').value = currency; //currency from opencage AT THE SECOND SELECTION AS VALUE AND BELLOW AS READIBLE INFORMATION
                document.getElementById('exchangeLocal').innerHTML = currency + " - local currency"; 


                //here are the conversions.
                Real =  USDUSD / USDBRL;
                Pound = USDUSD / USDGBP;
                Euro = USDUSD / USDEUR;
                Yen = USDUSD / USDJPY;
                Won = USDUSD / USDKRW;
                calcT();//call the function to do the maths
            }
        };
        http.send();


}
var AmmountToConvert; //user money input 
var ToCurrency; //first currency selection
var FromCurrency; //second selection, the currency that will be exchnaged
var AmmounToConvertTimesFromCurrency = 0;  //ammount to convert times the first currency, the variable name makes it obvious
function calcT(){
    // console.log("calcT called");
    AmmountToConvert = document.getElementById('AmmountToConvert').value; //get the ammount of money and store in a variable
    AmmountToConvert = parseInt(AmmountToConvert); //transforme into int, maybe is unnecesary
  
    //first field selection
    FromCurrency = document.getElementById('FromCurrency').value;
    
    // ((ammount * selector um(ex: real) * selector dois(ex: pound)  ===just thinking loudely
                //valor br in dollar THAN dollar in pound
                //

                //a switch with the values to do the maths
                //this switch in the future should be an from array
                //one more thing here are important those variable with the exchange rate converted.
    switch(FromCurrency){ 
        case "United States Dollar": //if american is selected it will do the ammount input from the user times the dollar
            AmmounToConvertTimesFromCurrency = (AmmountToConvert * USDUSD);

        break;

        case "Brazilian Real"://same history as above but brazilian real, the ones below as the same way
            AmmounToConvertTimesFromCurrency = (AmmountToConvert * Real);

        break;
        
        case "British Pound":
            AmmounToConvertTimesFromCurrency = (AmmountToConvert * Pound) ;
        break;
        
        case "Euro":
            AmmounToConvertTimesFromCurrency = (AmmountToConvert * Euro);

        break;
        
        case "Japanese Yen":
            AmmounToConvertTimesFromCurrency = (AmmountToConvert * Yen);

        break;
        
        case "South Korean Won":            
            AmmounToConvertTimesFromCurrency = (AmmountToConvert * Won);

        break;
    }


    //second currency selector
    ToCurrency = document.getElementById('ToCurrency').value;


    //if the currency is not one of the bellow the user will get a  notification that the local currency is not provided yet.
    //it will do the maths with Euro and notify the user about it.
    if (ToCurrency != 'United States Dollar' 
    &&
    ToCurrency != 'Euro'
    &&
    ToCurrency != 'Brazilian Real'
    &&
    ToCurrency != 'British Pound'
    &&
    ToCurrency != 'Japanese Yen'
    &&
    ToCurrency != 'South Korean Won'
    ){
    var alertCurrency = "Sorry the local currency is not available at the currency converter tool.<br> Euro has been selected instead."
    //if the currency is not support by the tool, euro will be selected instead.
    document.getElementById('currencyNotSupported').innerHTML = alertCurrency;
    document.getElementById('exchangeLocal').value = "Euro";
    document.getElementById('exchangeLocal').innerHTML = "Euro"; 
    document.getElementById('numberTwo').value = AmmountToConvert * Euro;

    }
    else{

        document.getElementById('currencyNotSupported').innerHTML = "";

    // document.getElementById('numberTwo').value = ((AmmounToConvertTimesFromCurrency) * ToCurrency) ;

    //here get the second selection and convert into the exchange
    switch(ToCurrency){
        case "United States Dollar":
            ToCurrency = USDUSD;

         break;

        case "Brazilian Real":
            ToCurrency = USDBRL;

        break;
        
        case "British Pound":
            ToCurrency = USDGBP;
        break;
        
        case "Euro":
            ToCurrency = USDEUR;

        break;
        
        case "Japanese Yen":
            ToCurrency = USDJPY;

        break;
        
        case "South Korean Won":            
            ToCurrency = USDKRW;
        break;
    }
        //if the country use a currency available in the tool, the program run with no problem
        document.getElementById('numberTwo').value = ((AmmounToConvertTimesFromCurrency) * ToCurrency) ;

    }
    // document.getElementById('numberTwo').value = ((AmmounToConvertTimesFromCurrency) * ToCurrency) ;

}

//end currency function
//happy days, wasn't easy to create this function, and is not perfect....