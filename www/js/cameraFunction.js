//function to take picture
function pics()
{navigator.camera.getPicture
    (onSuccess, onError, 
        { quality: 100, 
            destinationType: Camera.DestinationType.FILE_URI,
            allowEdit: true,
            correctOrientation: true,
            saveToPhotoAlbum: true
        }
    )
}
//function to open camera gallery
function openCamera()
{navigator.camera.getPicture
    (onSuccess, onError, 
        { destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        popoverOptions: new CameraPopoverOptions(300, 300, 100, 100, Camera.PopoverArrowDirection.ARROW_ANY, 300, 600)
        }
    )
}
//sucess function for taking picture
function onSuccess(imageURI) {
    var image = document.getElementById('myImage');
    image.src = imageURI;
}

