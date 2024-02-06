// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
  

// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/

animate();

var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
    requestAnimFrame( animate );
	var currentTime = new Date().getTime();
	if (mLastFrameTime === 0) {
		mLastFrameTime = currentTime;
	}

	if ((currentTime - mLastFrameTime) > mWaitTime) {
		swapPhoto();
		mLastFrameTime = currentTime;
	}
}

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/

function swapPhoto() {
    // Increment the current index
	mCurrentIndex++;

	// Check if the current index is greater than or equal to the length of mImages
	if (mCurrentIndex >= mImages.length) {
	  // Set the current index back to 0
	  mCurrentIndex = 0;
	}
  
	// Check if the current index is less than 0
	if (mCurrentIndex < 0) {
	  // Set the current index to the last image in the array mImages
	  mCurrentIndex = mImages.length - 1;
	}
  
	// Access the 'photo' element in the HTML document
	var photoElement = document.getElementById('photo');
  
	// Set the src attribute of the 'photo' element to the corresponding value from the mImages array
	photoElement.src = mImages[mCurrentIndex].img;

	// Access the 'photo' element in the HTML document
  var photoElement = document.getElementById('photo');

  // Set the src attribute of the 'photo' element to the corresponding value from the mImages array
  photoElement.src = mImages[mCurrentIndex].img;

  // Create variables for location, description, and date
  var locationElement = document.getElementsByClassName('location')[0];
  var descriptionElement = document.getElementsByClassName('description')[0];
  var dateElement = document.getElementsByClassName('date')[0];

  // Set innerHTML for location, description, and date
  locationElement.innerHTML = "Location: " + mImages[mCurrentIndex].location;
  descriptionElement.innerHTML = "Description: " + mImages[mCurrentIndex].description;
  dateElement.innerHTML = "Date: " + mImages[mCurrentIndex].date;
  
  // Set the variable mLastFrameTime to zero
  var mLastFrameTime = 0;

  // Increase the current index number by 1 using the += operator
  mCurrentIndex += 1;
	console.log('swap photo');
}

// Counter for the mImages array
var mCurrentIndex = 0;

// XMLHttpRequest variable
var mRequest = new XMLHttpRequest();

// Array holding GalleryImage objects (see below).
var mImages = [];

// Holds the retrived JSON information
var mJson;

// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later
var mUrl = 'insert_url_here_to_image_json';


//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
function makeGalleryImageOnloadCallback(galleryImage) {
	return function(e) {
		galleryImage.img = e.target;
		mImages.push(galleryImage);
	}
}

$(document).ready(function() {

	// Call the fetchJSON function
	fetchJSON();
  
	// This initially hides the photos' metadata information
	// $('.details').eq(0).hide();
  
  });

window.addEventListener('load', function() {
	
	console.log('window loaded');

}, false);

function galleryImage() {
    //implement me as an object to hold the following data about an image:
    //1. location where photo was taken
    var location;
    //2. description of photo
    var description;
    //3. the date when the photo was taken  
    var date;
    //4. either a String (src URL) or an an HTMLImageObject (bitmap of the photo. https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement)
    var img;
}



function fetchJSON() {
	mRequest.onreadystatechange = function() {
        if(this.readyState >= 200 && this.status < 400){
            var mJson = JSON.parse(mRequest.responseText);
            console.log(mJson)
        } else {
            console.log("We connected to the server but an error occurred")
        }
    }
	mRequest.open(GET, mUrl, true)
    mRequest.send()

	};

function iterateJSON(mJson, mImages) {
  // Create a for loop
  for (var x = 0; x < mJson.images.length; x++) {
    // Create a new GalleryImage object at the current index of mImages
    mImages[x] = new GalleryImage();

    // Access the mImages array by using the variable x as the index
    // Set attributes using dot notation from mJson.images
    mImages[x].location = mJson.images[x].imgLocation;
    mImages[x].description = mJson.images[x].imgDescription;
    mImages[x].date = mJson.images[x].imgDate;
    mImages[x].img = mJson.images[x].imgPath;
  }
}