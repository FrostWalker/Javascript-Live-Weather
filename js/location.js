$(document).ready(function() {

    function fetch() {
        if (navigator.geolocation) navigator.geolocation.getCurrentPosition(display);
    }

    function display(pos) {
        $('#gps')[0].innerHTML = "lat: " + pos.coords.latitude + "<br>long: " + pos.coords.longitude;
        
        // $('#gpslat').text(pos.coords.latitude);
        // $('#gpslong').text(pos.coords.longitude);
        // $('#geoimage').attr('src', 'https://maps.googleapis.com/maps/api/staticmap?center='+pos.coords.latitude+','+pos.coords.longitude+'&zoom=13&size=640x640&scale=2&maptype=roadmap&markers=color:blue%7C'+pos.coords.latitude+','+pos.coords.longitude+'&key=AIzaSyB_7MPETk6tDET8H-1xvEGOom-yz3lAPKo')
    }

    fetch();
});