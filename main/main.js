//Smooth transition
$(document).ready(function() {
  $("a.scrollto").click(function () {
    elementClick = $(this).attr("href")
    destination = $(elementClick).offset().top;
    $("html:not(:animated),body:not(:animated)").animate({scrollTop: destination}, 1100);
    return false;
  });
});

//Slideshow
var slides = document.querySelectorAll('.slides .slide');
var currentSlide = 0;
var slideInterval = setInterval(nextSlide,2000);
 
function nextSlide() {
    goToSlide(currentSlide+1);
}
 
function previousSlide() {
    goToSlide(currentSlide-1);
}
 
function goToSlide(n) {
    slides[currentSlide].className = 'slide';
    currentSlide = (n+slides.length)%slides.length;
    slides[currentSlide].className = 'slide showing';
}

var playing = true;
var pauseBtn = document.getElementById('pause');

function pauseSlideshow() {
    pauseBtn.innerHTML = '&#9658;';
    playing = false;
    clearInterval(slideInterval);
}
 
function playSlideshow() {
    pauseBtn.innerHTML = '&#10074;&#10074;';
    playing = true;
    slideInterval = setInterval(nextSlide,2000);
}
 
pauseBtn.onclick = function() {
    if(playing) {
        pauseSlideshow();
    } else {
        playSlideshow();
    }
};

var next = document.getElementById('next');
var previous = document.getElementById('previous');
 
next.onclick = function() {
    pauseSlideshow();
    nextSlide();
};

previous.onclick = function() {
    pauseSlideshow();
    previousSlide();
};

//Google map
function initMap() {
    var uluru = {lat: 50.426174, lng: 30.3705865};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: uluru
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });
}