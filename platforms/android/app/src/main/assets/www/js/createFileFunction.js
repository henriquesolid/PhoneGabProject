function CreateFileFunction(){

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemCallback, onError);
   
}

function fileSystemCallback(fs){

    // Name of the file I want to create
    var fileToCreate = "visitedPlace.txt";

    // Opening/creating the file
    fs.root.getFile(fileToCreate, fileSystemOptionals, getFileCallback, onError);
}

var fileSystemOptionals = { create: true, exclusive: false };

var fileEntryGlobal;
var contentGlobal = "";
var contentGlobal2 = "";

function getFileCallback(fileEntry){

    fileEntryGlobal = fileEntry;


}

function readInput(){
    textToWrite = document.getElementById('tripFeedback').value;

    writeFile(textToWrite);

}

// Let's write some files
function writeFile(newText) {

    readFile();

    
    // window.alert("country " + country + " city " + city + " neighbor " + neighbor);
    var placeVisited = document.getElementById('placeVisited').value;
    // window.alert("placeVisited: " + placeVisited);
    contentGlobal = contentGlobal + "Place: " + placeVisited + "<br>Your feedback: " + newText + "<br>";
    // contentGlobal = contentGlobal + "Country: " + country + "<br>Your feedback: " + newText + "<br>";
    // contentGlobal = newText;



    var dataObj = new Blob([contentGlobal], { type: 'text/plain' });

    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntryGlobal.createWriter(function (fileWriter) {

        // If data object is not passed in,
        // create a new Blob instead.
        if (!dataObj) {
            dataObj = new Blob(['Hello'], { type: 'text/plain' });
        }

        fileWriter.write(dataObj);

        fileWriter.onwriteend = function() {
            // console.log("Successful file write...");
            document.getElementById('writeSucess').innerHTML = contentGlobal;
            document.getElementById('writeAlert').innerHTML = "<img src='img/logo.svg' width='20' height='20'> <br>This place has been saved at the visited places panel.<br>Click here to visit this section.";
            
        };

        fileWriter.onerror = function () {
            // console.log("Failed file write: " + e.toString());
            document.getElementById('writeAlert').innerHTML = "error...";

        };

    });
}

// Let's read some files
function readFile() {
    // window.alert("readfile called");

    // Get the file from the file entry
    fileEntryGlobal.file(function (file) {
        // Create the reader
        var reader = new FileReader();
        reader.readAsText(file);
    
        reader.onloadend = function() {

            // window.alert("Successful file read: " + this.result);
            

            // console.log("Successful file read: " + this.result);
            // window.alert("file path: " + fileEntryGlobal.fullPath);

            // console.log("file path: " + fileEntryGlobal.fullPath);
            contentGlobal = this.result;
            

        };
    }, onError);
}

function timeMAchine(){
    console.log("timemachine called");

    contentGlobal2 = contentGlobal2 + city +", " + country + " at " + timemachineDate + " " + temperature + "<br>";
  
    var dataObj = new Blob([contentGlobal2], { type: 'text/plain' });

    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntryGlobal.createWriter(function (fileWriter) {

        // If data object is not passed in,
        // create a new Blob instead.
        if (!dataObj) {
            dataObj = new Blob(['Error'], { type: 'text/plain' });
        }

        fileWriter.write(dataObj);

        fileWriter.onwriteend = function() {
            // console.log("Successful file write...");
            document.getElementById('timemachineDIV').innerHTML = contentGlobal2;
            document.getElementById('writeAlert2').innerHTML = "This place has been saved!";
            
        };

        fileWriter.onerror = function (e) {
            // console.log("Failed file write: " + e.toString());
            document.getElementById('writeAlert2').innerHTML = "error...";

        };

    });
}
