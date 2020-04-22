// var getDistance = function(location) {
  var apiId = "AIzaSyDF358DDIA1xQSD283AvlWr7F7r6NfBzMU"
  // var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiId 
  // var apiUrl = "https://maps.googleapis.com/maps/api/geocode/xml?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=" + apiId  
  var zip = "94016"
  var apiUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + zip + "&key=" + apiId 
  // make a request to the url
  fetch(apiUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        response.json().then(function(data) {
          console.log(data)
          console.log(data.results[0].geometry.location.lat)
          console.log(data.results[0].geometry.location.lng)
          // console.log(data.results[0].address_components[6].long_name)

        })
      }
    })


    // var origin1 = new google.maps.LatLng(55.930385, -3.118425);
    // var origin2 = 'Greenwich, England';
    // var destinationA = 'Stockholm, Sweden';
    // var destinationB = new google.maps.LatLng(50.087692, 14.421150);

    // var service = new google.maps.DistanceMatrixService();
    // service.getDistanceMatrix(
    //   {
    //     origins: [origin1, origin2],
    //     destinations: [destinationA, destinationB],
        // travelMode: 'DRIVING',
        // transitOptions: TransitOptions,
        // drivingOptions: DrivingOptions,
        // unitSystem: UnitSystem,
        // avoidHighways: Boolean,
        // avoidTolls: Boolean,
      // }, callback);

      // function callback(response, status) {
        // See Parsing the Results for
        // the basics of a callback function.
      // }

      // Initialize and add the map
// var map;
// function initMap() {
//   // The map, centered on Central Park
//   const center = {lat: 40.774102, lng: -73.971734};
//   const options = {zoom: 15, scaleControl: true, center: center};
//   map = new google.maps.Map(
//       document.getElementById('map'), options);
//   // Locations of landmarks
//   const dakota = {lat: 40.7767644, lng: -73.9761399};
//   const frick = {lat: 40.771209, lng: -73.9673991};
//   // The markers for The Dakota and The Frick Collection
//   var mk1 = new google.maps.Marker({position: dakota, map: map});
//   var mk2 = new google.maps.Marker({position: frick, map: map});
// }

// src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"

// var apiUrl2 = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDF358DDIA1xQSD283AvlWr7F7r6NfBzMU&callback=initMap"
var apiUrl2 = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=37.71,-122.45&destinations=48.4460029,-123.3328596&mode=drive&language=english&key=AIzaSyDF358DDIA1xQSD283AvlWr7F7r6NfBzMU"
fetch(apiUrl2)
.then(function(response) {
  // request was successful
  if (response.ok) {
    response.json().then(function(data) {
      console.log(data)
      // console.log(data.results[0].geometry.location.lat)
      // console.log(data.results[0].geometry.location.lng)
      // console.log(data.results[0].address_components[6].long_name)

    })
  }
})

// function GetDrivingDistance($lat1, $lat2, $long1, $long2)
// {
//     $url = "https://maps.googleapis.com/maps/api/distancematrix/json?origins="+$lat1+","+$long1+"&destinations="+$lat2+","+$long2+"&mode=driving&language=pl-PL&key=" + apiId 
//     $ch = curl_init();
//     curl_setopt($ch, CURLOPT_URL, $url);
//     curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
//     curl_setopt($ch, CURLOPT_PROXYPORT, 3128);
//     curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
//     curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
//     $response = curl_exec($ch);
//     curl_close($ch);
//     $response_a = json_decode($response, true);
//     $dist = $response_a['rows'][0]['elements'][0]['distance']['text'];
//     $time = $response_a['rows'][0]['elements'][0]['duration']['text'];

//     return array('distance' => $dist, 'time' => $time);
// }


// var test = GetDrivingDistance(400,-200,600,100)

// console.log ("test is : " test)