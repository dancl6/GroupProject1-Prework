
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

