$(document).ready(startApp);
var weather = null;

function startApp(){

weather = new Weather();
weather.eventHandlers();

}
class Weather{

constructor(){
  
  this.latitude = null;
  this.longitude = null;
  this.showLocation = this.showLocation.bind(this);
  this.getLocation();
  this.eventHandlers = this.eventHandlers.bind(this);
  this.getWeatherData = this.getWeatherData.bind(this);
  this.getLocation = this.getLocation.bind(this);
}
eventHandlers(){
$('#getLocation').on('click',this.getLocation)
}

getLocation(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(this.showLocation);
  }else{
		console.log("Browser doesn't support geolocation!");
  }
  
}
showLocation(position) {
  console.log('Show Location:', this);
  $("#main").text("You are at: Lat : "+position.coords.latitude+" Long :"+ position.coords.latitude);
  this.latitude= position.coords.latitude;
  this.longitude = position.coords.longitude;

  this.getWeatherData(this.latitude,this.longitude); 
} 

getWeatherData(latitude, longitude){
    $.ajax({
      url: 'https://api.darksky.net/forecast/7e19d8769fa1c983a9ed3dd20c216244/' + this.latitude + ',' + this.longitude + '?exclude=alerts,flags?units=auto',
      method: 'get',
      dataType: 'jsonp',
      success: function (response) {
        var responseResult = $('<div>').addClass('currentLocation').css(
          'color' , 'red'
        ).text(response.timezone + ' '  + response.currently.temperature + ' ' + response.currently.icon );  
        $('#top').append(responseResult);
        console.log("Weather Information", response);
      if(response.currently.temperature > '70'){
        var iconSunnyResult = $('<img>', {
          'id' : 'iconDisplay',
          'src' : '/Users/catherine/lfz/c619_hackathon2/Team1/icon/sunny.png'
        });
      } else { 
        var iconElseResult = $('<img>', {
          'id' : 'iconDisplay',
          'src' : '/Users/catherine/lfz/c619_hackathon2/Team1/icon/partlycouldy.jpeg'
        });
      }
        $('#top').append(iconSunnyResult);
        $('#top').append(iconElseResult);
       /* console.log(response.timezone);
        console.log(response.currently.temperature);
        console.log(response.currently.icon); */
      }.bind(this),
      error: function(response){
          console.log("Error:", response)
      }

    });
  }
}