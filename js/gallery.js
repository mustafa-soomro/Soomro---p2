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

$(document).ready( function() {
	
	// This initially hides the photos' metadata information
	$('.details').eq(0).hide();
	
});

window.addEventListener('load', function() {
	
	console.log('window loaded');

}, false);

function GalleryImage() {
	//implement me as an object to hold the following data about an image:
	//1. location where photo was taken
	let location = "imgLocation"
	//2. description of photo
	let description = "description"
	//3. the date when the photo was taken
	let date = "date"
	//4. either a String (src URL) or an an HTMLImageObject (bitmap of the photo. https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement)
	let image = "imgPath"
}


function fetchJSON() {
	$.getJSON("images.json", function (responseText){

	});
	
}
