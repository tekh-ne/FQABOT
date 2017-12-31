function loadScript(src) {

    document.write('<' + 'script src="' + src + '"' +
                  ' type="text/javascript"><' + '/script>');
}

loadScript('https://maps.googleapis.com/maps/api/js?v=AIzaSyC9Er_u96DS4t_1EfjdEnHs-3iQP_poylw&callback=initialize');


function initialize() {
    var myCenter = new google.maps.LatLng(10.801522, 106.640816);
    var epicenter = new google.maps.LatLng(10.8016241, 106.6408572); 
    var mapOptions = {
        center: myCenter,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoom: 16,
        panControl: false,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        overviewMapControl: false,
        draggable: false,
        disableDoubleClickZoom: true,
        scrollwheel: false
    };
    var map = new google.maps.Map(document.getElementById('googleMap'),
            mapOptions);

    var marker = new google.maps.Marker({
        position: epicenter,
        icon: '../../Themes/Tekh-neTheme/Content/Images/map-marker.png',
        disableAutoPan: true,
    });

    marker.setMap(map);

    google.maps.event.addDomListener(marker, 'mouseover', function () {
        if ($(window).width() > 768) {
            $('.osd-center-desktop').attr("style", "display: block !important");
        } else {
            $('.osd-center-mobile').attr("style", "display: block !important");
        }
    });

    google.maps.event.addDomListener(marker, 'mouseout', function () {
        if ($(window).width() > 768) {
            $('.osd-center-desktop').attr("style", "display: none !important");
        } else {
            $('.osd-center-mobile').attr("style", "display: none !important");
        }
    });

    google.maps.event.addDomListener(window, 'resize', function () {
        map.setCenter(myCenter);
    });
}

