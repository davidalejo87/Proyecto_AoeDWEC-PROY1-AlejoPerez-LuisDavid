fetch('https://age-of-empires-2-api.herokuapp.com/api/v1/units')
    .then(response => response.json())
    .then(json => console.log(json));