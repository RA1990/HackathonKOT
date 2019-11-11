
class Nasa {

  constructor(pokeCallback) {
    this.getPokeman = pokeCallback;
    this.getWarning = this.getWarning.bind(this);
    this.weather = new Weather(this.getWarning);
    this.weatherString = null;
  }

  getWarning(weatherString) {
    this.weatherString = weatherString;
    this.getPicturesOfMarsFromRobot();

  }
  getPicturesOfMarsFromRobot(string) {
    $.ajax({
      url: 'https://api.nasa.gov/neo/rest/v1/neo/browse?page=0&size=20&api_key=4GZGei353YIcMShBD9LaDMgruc3fcMTPchEnDE7k',
      method: 'get',
      dataType: 'JSON',
      data: {
        'api_key': '4GZGei353YIcMShBD9LaDMgruc3fcMTPchEnDE7k',
        page:0,
        size:20
      },
      success: function (response) {
        console.log("yvyyuv success:",response);
        var potentially_hazardous_asteroid = response.near_earth_objects[0].is_potentially_hazardous_asteroid;
        console.log(potentially_hazardous_asteroid);
        this.getPokeman( 0,this.weatherString,potentially_hazardous_asteroid);
      }.bind(this),
      error: function (response) {
        console.log("retrieve Data From Nasa failed");
      }
    });

  }

  render() {
    var  imageToAppendToDiv = $("<img>").attr("src",this.currentNasaPictureForBackground);
    imageToAppendToDiv.css("background-size","cover");
    imageToAppendToDiv.css("background-repeat", "no-repeat");
    imageToAppendToDiv.css("height","100vh");
    imageToAppendToDiv.css("width", "100vw");
    $('body').css("background-image", 'url("' + this.currentNasaPictureForBackground + '")');
    setTimeout(function () {
      var divToAppendToDom2 = $("<div>").css({
        'position': 'absolute',
        'height': '115%',
        'display': 'inline-block',
        'top': '1%'
      });
    var imageToAppendToDiv2 = $("<img>").attr("src", this.marsPicFromRobot);
    imageToAppendToDiv2.css("width","50%");
    imageToAppendToDiv2.css("height", "50%");
    imageToAppendToDiv2.css("padding", "30%");
    imageToAppendToDiv2.css("border-radius", "80%");
    imageToAppendToDiv2.css("background-size", "cover");
    imageToAppendToDiv2.css("background-repeat", "no-repeat");
    $(divToAppendToDom2).append(imageToAppendToDiv2);
    $("#movieNasaPokemon").append(divToAppendToDom2);
    }.bind(this), 2000);

  }
}
