
$(document).ready(startApp);
var weather = null;
function startApp() {
  weather = new Weather();
}
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
        $('#main').append(responseResult);
        console.log("Weather Information", response);

      }.bind(this),
      error: function (response) {
        console.log("Error:", response)
      }
    });
  }
}






