
function CreateFile(){
    console.log("CreateFile called");
//get access to file system
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemCallback, onError
    );
}

function fileSystemCallback(fs){
    console.log("fileSystemCallback called");

    // Name of the file I want to create
    var fileToCreate = "filewithneighbors.txt";

    // Opening/creating the file
    fs.root.getFile(fileToCreate, fileSystemOptionals, getFileCallback, onError);
}

var fileSystemOptionals = { create: true, exclusive: false };

//after file system called, filesystem call back get the file system result and open/create the file
//getfilecallback create a file with the 
function getFileCallback(fileEntry){
    console.log("getFileCallback called");

    var contentFromInput = "oi";


    // var textInsert = document.getElementById('yourText').value;
    var dataObj = new Blob([contentFromInput], { type: 'text/plain' });
    // Now decide what to do
    // Write to the file
    writeFile(fileEntry, dataObj);

    // Or read the file
    readFile(fileEntry);
}

// Let's write some files
function writeFile(fileEntry, dataObj) {
    console.log("writeFile called");
    console.log(neighbor + " :neighbor");

    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function (fileWriter) {

        // If data object is not passed in,
        // create a new Blob instead.
        if (!dataObj) {
            dataObj = new Blob(['write new blob'], { type: 'text/plain' });
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
var varFile;
// Let's read some files
function readFile(fileEntry) {
    console.log("readFile called");

    // Get the file from the file entry
    fileEntry.file(function (file) {
        
        // Create the reader
        var reader = new FileReader();
        reader.readAsText(file);

        reader.onloadend = function() {
            console.log("Successful file read: " + this.result);
            varFile = this.result;
            console.log("file path: " + fileEntry.fullPath);
        };

    }, onError);
}

