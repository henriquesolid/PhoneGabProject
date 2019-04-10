function CreateFileFunction(){

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemCallback, onError);
   
}

function fileSystemCallback(fs){

    // Name of the file I want to create
    var fileToCreate = "newPersistentFile.txt";

    // Opening/creating the file
    fs.root.getFile(fileToCreate, fileSystemOptionals, getFileCallback, onError);
}

var fileSystemOptionals = { create: true, exclusive: false };

var fileEntryGlobal;
var contentGlobal = "";

function getFileCallback(fileEntry){

    fileEntryGlobal = fileEntry;


}

function readInput(){
    textToWrite = document.getElementById('input').value;

    writeFile(textToWrite);

}

// Let's write some files
function writeFile(newText) {

    readFile();

    contentGlobal = contentGlobal + newText;

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
            console.log("Successful file write...");
        };

        fileWriter.onerror = function (e) {
            console.log("Failed file write: " + e.toString());
        };

    });
}

// Let's read some files
function readFile() {

    // Get the file from the file entry
    fileEntryGlobal.file(function (file) {
        // Create the reader
        var reader = new FileReader();
        reader.readAsText(file);
    
        reader.onloadend = function() {

            console.log("Successful file read: " + this.result);
            console.log("file path: " + fileEntryGlobal.fullPath);
            contentGlobal = this.result;
            

        };
    }, onError);
}




function onError(msg){
    console.log(msg);
}