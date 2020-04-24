
 
 var entireFunction = function(){
 
 var apiId = "AIzaSyDF358DDIA1xQSD283AvlWr7F7r6NfBzMU"

    var latEnd
    var lngEnd
    var cnt = 0

    // do not delete below line. it will give you lat and lon based on address
    // var apiUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=" + apiId
    // do not delete below line. it will give you lat and lon based on zip code
    // var apiUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + zipcode + "&key=" + apiId 
    var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?radius=25&postalCode=93940&apikey=wiO6LdHQcAaR730qpDy1jHq0phsKbsxE"
    // make a request to the url
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

       



   var mapBlock = {
     
        origin: 'Chicago, IL',
        destination: 'Los Angeles, CA',
        waypoints: [
          {
            location: 'Joplin, MO',
            stopover: false
          },{
            location: 'Oklahoma City, OK',
            stopover: true
          }],
        provideRouteAlternatives: false,
        travelMode: 'DRIVING',
        drivingOptions: {
          departureTime: new Date(/* now, or future date */),
          trafficModel: 'pessimistic'
        },
        unitSystem: google.maps.UnitSystem.IMPERIAL
      }

      mapBlock.route()
  //     // DirectionsService.route()

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
            unitSystem: google.maps.UnitSystem.METRIC,
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

      }

      // setTimeout(entireFunction,1000)

      // entireFunction()

      function initMap() {
        var directionsService = new google.maps.DirectionsService();
        var directionsRenderer = new google.maps.DirectionsRenderer();
        var chicago = new google.maps.LatLng(41.850033, -87.6500523);
        var mapOptions = {
          zoom:7,
          center: chicago
        }
        var map = new google.maps.Map(document.getElementById('map'), mapOptions);
        directionsRenderer.setMap(map);

  
      
      function calcRoute() {
        var start = document.getElementById('start').value;
        var end = document.getElementById('end').value;
        var request = {
          origin: start,
          destination: end,
          travelMode: 'DRIVING'
        };
        directionsService.route(request, function(result, status) {
          if (status == 'OK') {
            directionsRenderer.setDirections(result);
          }
        });
      }
      alert()
      console.log(google)
      }