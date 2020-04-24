
  var apiId = "AIzaSyDF358DDIA1xQSD283AvlWr7F7r6NfBzMU"

    var latEnd
    var lngEnd
    var cnt = 0

    // addd form Submit Handler 

    var formSubmitHandler = function(event) {
      event.preventDefault();
      // get value from input element
      var city = cityInputEl.value.trim();
    
      if (city) {
        // pass the data to getUserRepos() as an argument
        getEventDetails(city);
        // clear the form after username is passed
        cityInputEl.value = "";
      }  else {
        alert("Please enter a city"); // need to replace with a modal or eliminate //
      }
    };



    // add getEventDetails
    
var getEventDetails = function(city) {
  // event.preventDefault();
  
  // var city = "monterey"; // city will be dynamically pulled from "#city-input" //
  var radius = "25"; // radius will be dynamically pulled from "#radius-input" //
  var unit = "miles"; // default setting is miles, so possibly remove this query parameter //
  var geoPoint = "9q924"; // leving this as an example in case we add geoHash logic //
  var apiKey = 	"wiO6LdHQcAaR730qpDy1jHq0phsKbsxE";
  var apiUrlTicketCity = "https://app.ticketmaster.com/discovery/v2/events.json?city=" + city + "&apikey=" + apiKey + "";
  
  fetch(apiUrlTicketCity).then(function(response) {
    return response.json()
  })
  .then(function(data) {
    // add a modal here
    // if (data.page.totalElements === 0) {
      // add module logic here }
    // else use the logic below {}
    console.log(data);
    var lat = data._embedded.events[0]._embedded.venues[0].location.latitude;
    var lon = data._embedded.events[0]._embedded.venues[0].location.longitude;
    console.log(lat, lon);

    var apiUrlTicketEvents = "https://app.ticketmaster.com/discovery/v2/events.json?latlong=" + lat + "," + lon + "&radius=" + radius + "&unit=" + unit + "&apikey=" + apiKey + "";

    fetch(apiUrlTicketEvents).then(function(response) {
      return response.json()
    })
    .then(function(data) {
      console.log(data);
      // pass data to displayEventDetails
      displayEventDetails(data);
      // put the name of Dan's function here Dan function (data)
      
    })
  })
};
    
    
    // do not delete below line. it will give you lat and lon based on address
    // var apiUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=" + apiId
    // do not delete below line. it will give you lat and lon based on zip code
    // var apiUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + zipcode + "&key=" + apiId 
    var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?radius=25&postalCode=93940&apikey=wiO6LdHQcAaR730qpDy1jHq0phsKbsxE"
    // make a request to the url
    // start funtion dan function (data)
    fetch(apiUrl)
      .then(function(response) {
        // request was successful
        if (response.ok) {
          response.json().then(function(data) {
            console.log(data)
            console.log(data._embedded.events[0]._embedded.venues[0].location.longitude)
            lngEnd = data._embedded.events[0]._embedded.venues[0].location.longitude
            latEnd = data._embedded.events[0]._embedded.venues[0].location.latitude
            lngEnd = parseFloat(lngEnd)
            latEnd = parseFloat(latEnd)
            var elementLatE = document.getElementById("store-temp-latEnd")
            elementLatE.textContent=latEnd
            var elementLngE = document.getElementById("store-temp-lngEnd")
            elementLngE.textContent = lngEnd 
            console.log("test query selector :" + document.querySelector("#store-temp-latEnd").textContent)

          
          
          
          
          })
        }
      })


      var latStart
      var lngStart
      
      
      var map, infoWindow;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 6
        });
        infoWindow = new google.maps.InfoWindow;
      
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            var elementLatS = document.getElementById("store-temp-latStart")
            elementLatS.textContent=position.coords.latitude
            var elementLngS = document.getElementById("store-temp-lngStart")
            elementLngS.textContent = position.coords.longitude
            console.log("lat of curr pos : " + position.coords.latitude)
            latStart = position.coords.latitude
            lngStart = position.coords.longitude
            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }
      
      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      
       
      }




      document.querySelector("#search-button").addEventListener("click",function(){
        // function initMap() {
        
          latStart = document.querySelector("#store-temp-latStart").textContent
          lngStart = document.querySelector("#store-temp-lngStart").textContent
          latEnd = document.querySelector("#store-temp-latEnd").textContent
          lngEnd = document.querySelector("#store-temp-lngEnd").textContent
          latStart = parseFloat(latStart)
          lngStart = parseFloat(lngStart)
          latEnd = parseFloat(latEnd)
          lngEnd = parseFloat(lngEnd)
          console.log("lat variables : " + latStart + lngStart + latEnd + lngEnd)
          var bounds = new google.maps.LatLngBounds;
          var markersArray = [];
        
          var origin1 = {lat: latStart, lng: lngStart};
          var origin2 = {lat: 37.71, lng: -122.45};
          var destinationA = {lat: 40.0097571, lng: -76.6297189};
          var destinationB ={lat: latEnd, lng: lngEnd};
        
          var destinationIcon = 'https://chart.googleapis.com/chart?' +
              'chst=d_map_pin_letter&chld=D|FF0000|000000';
          var originIcon = 'https://chart.googleapis.com/chart?' +
              'chst=d_map_pin_letter&chld=O|FFFF00|000000';
          var map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 55.53, lng: 9.4},
            zoom: 10
          });
          var geocoder = new google.maps.Geocoder;
        
          var service = new google.maps.DistanceMatrixService;
          service.getDistanceMatrix({
            origins: [origin1],
            destinations: [destinationB],
            travelMode: 'DRIVING',
            unitSystem: google.maps.UnitSystem.IMPERIAL,
            avoidHighways: false,
            avoidTolls: false
          }, function(response, status) {
            if (status !== 'OK') {
              alert('Error was: ' + status);
            } else {
              var originList = response.originAddresses;
              var destinationList = response.destinationAddresses;
              var outputDiv = document.getElementById('output');
              console.log("output is :" + outputDiv)
              outputDiv.innerHTML = '';
              deleteMarkers(markersArray);
        
              var showGeocodedAddressOnMap = function(asDestination) {
                var icon = asDestination ? destinationIcon : originIcon;
                return function(results, status) {
                  if (status === 'OK') {
                    map.fitBounds(bounds.extend(results[0].geometry.location));
                    markersArray.push(new google.maps.Marker({
                      map: map,
                      position: results[0].geometry.location,
                      icon: icon
                    }));
                  } else {
                    alert('Geocode was not successful due to: ' + status);
                  }
                };
              };
        
              for (var i = 0; i < originList.length; i++) {
                var results = response.rows[i].elements;
                geocoder.geocode({'address': originList[i]},
                    showGeocodedAddressOnMap(false));
                    
                for (var j = 0; j < results.length; j++) {
                  geocoder.geocode({'address': destinationList[j]},
                      showGeocodedAddressOnMap(true));
                  outputDiv.innerHTML += originList[i] + ' to ' + destinationList[j] +
                      ': ' + results[j].distance.text + ' in ' +
                      results[j].duration.text + '<br>';
                      console.log("results is : " + results[j].distance.text)
                }
              }
            }
          });
        // }
        })
        
        function deleteMarkers(markersArray) {
          for (var i = 0; i < markersArray.length; i++) {
            markersArray[i].setMap(null);
          }
          markersArray = [];
        }