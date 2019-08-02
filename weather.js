class Weather {
  constructor() {

    this.latitude = null;
    this.longitude = null;
    this.showLocation = this.showLocation.bind(this);
    this.getLocation();
    this.getWeatherData = this.getWeatherData.bind(this);
    this.getLocation = this.getLocation.bind(this);
  }
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showLocation);
    } else {
      console.log("Browser doesn't support geolocation!");
    }

  }
  showLocation(position) {
    $("#main").text("You are at: Lat : " + position.coords.latitude + " Long :" + position.coords.latitude);
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
    this.getWeatherData(this.latitude, this.longitude);
  }
  getWeatherData(latitude, longitude) {
    $.ajax({
      url: 'https://api.darksky.net/forecast/7e19d8769fa1c983a9ed3dd20c216244/' + this.latitude + ',' + this.longitude + '?exclude=alerts,flags?units=auto',
      method: 'get',
      dataType: 'jsonp',
      success: function (response) {
        var responseResult = $('<div>').addClass('currentLocation').text(response.timezone + ' ' + response.currently.temperature + ' ' + response.currently.icon);
        $('#top').append(responseResult);
        console.log("Weather Information", response);
        if (response.currently.temperature > '70') {
          var iconSunnyResult = $('<img>', {
            'id': 'iconDisplay',
            'src': '/Users/rauljauregui/lfz/c619_hackathon2/icon/sunny.png'
          });
        } else {
          var iconElseResult = $('<img>', {
            'id': 'iconDisplay',
            'src': '/Users/rauljauregui/lfz/c619_hackathon2/icon/partlycouldy.jpeg'
          });
        }

        $('.weatherIcon').append(iconSunnyResult);
        $('.weatherIcon').append(iconElseResult)
      }.bind(this),
      error: function (response) {
        console.log("Error:", response)
      }
    });
  }
}
