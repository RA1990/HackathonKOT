
class Nasa {

  constructor() {
    this.currentNasaPictureForBackground = null;
    this.marsPicFromRobot = null;
    this.currentDate = new Date();
    this.currentYear = this.currentDate.getFullYear();
    this.currentMonth = this.currentDate.getMonth() + 1;
    this.currentDay =this.currentDate.getDate();
    this.getPicturesOfMarsFromRobot();
    this.getPicturesAndVideosOfSpaceBasedOnCurrentDate();
    setTimeout(function () { this.render() }.bind(this), 5000);
  }

  getPicturesOfMarsFromRobot() {
    $.ajax({
      url: 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=4GZGei353YIcMShBD9LaDMgruc3fcMTPchEnDE7k',
      method: 'get',
      dataType: 'JSON',
      data: {
        'api_key': '4GZGei353YIcMShBD9LaDMgruc3fcMTPchEnDE7k'
      },
      success: function (response) {
        var picIndex = Math.floor(Math.random()*300);
        this.marsPicFromRobot = response["photos"][picIndex].img_src;
      }.bind(this),
      error: function (response) {
        console.log("retrieve Data From Nasa failed");
      }
    });

  }


  getPicturesAndVideosOfSpaceBasedOnCurrentDate() {
    $.ajax({
      url: ' https://api.nasa.gov/planetary/apod?api_key=4GZGei353YIcMShBD9LaDMgruc3fcMTPchEnDE7k',
      method: 'get',
      dataType: 'JSON',
      data: {
        date: this.currentYear + "-0" + this.currentMonth + "-" + this.currentDay,
        hd: "False",
        'api_key': '4GZGei353YIcMShBD9LaDMgruc3fcMTPchEnDE7k'
      },
      success: function (response) {
        console.log("success Nasa Data");
        this.currentNasaPictureForBackground= response.url;
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
