function calculateDaysBewteenDates(startDate, endDate) {
    var start = new Date(startDate);
    var end = new Date(endDate);
    var diff = end.getTime() - start.getTime();
    var days = diff / (1000 * 60 * 60 * 24);
    return days;
}
// find all images without alternate text
// and give them a red border
function findImagesWithoutAltText(){
    var images = document.getElementsByTagName('img');
    for (var i = 0; i < images.length; i++) {
        if (images[i].alt == '') {
            images[i].style.border = '3px solid red';
        }
    }
}

// Express server on port 3000
var express = require('express');
// Return the current time 
var app = express();