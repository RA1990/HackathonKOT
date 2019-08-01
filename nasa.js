
class Nasa {

  constructor() {
    debugger;
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
  debugger;
    $.ajax({
      url: 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=4GZGei353YIcMShBD9LaDMgruc3fcMTPchEnDE7k',
      method: 'get',
      dataType: 'JSON',
      data: {
        'api_key': '4GZGei353YIcMShBD9LaDMgruc3fcMTPchEnDE7k'
      },
      success: function (response) {
        console.log("success Nasa Data");
        console.log(response);
        var picIndex = Math.floor(Math.random()*800);
        this.marsPicFromRobot = response["photos"][picIndex].img_src;
        console.log(this.marsPicFromRobot);
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
        console.log(response.url);
        this.currentNasaPictureForBackground= response.url;
      }.bind(this),
      error: function (response) {
        console.log("retrieve Data From Nasa failed");
      }
    });
  }

  render() {

    //var divToAppendToDom = $("<div>")
    var  imageToAppendToDiv = $("<img>").attr("src",this.currentNasaPictureForBackground);
    imageToAppendToDiv.css("background-size","cover");
    imageToAppendToDiv.css("background-repeat", "no-repeat");
    imageToAppendToDiv.css("height","100vh");
    imageToAppendToDiv.css("width", "100vw");
    //$(divToAppendToDom).append(imageToAppendToDiv);
    $('body').css("background-image", 'url("' + this.currentNasaPictureForBackground + '")')
    //.append(imageToAppendToDiv);
    // position: absolute;
    // top: 50 %;
    // left: 50 %;
    // transform: translate(-50 %, -50 %);
    // width: 50 %;

    var divToAppendToDom2 = $("<div>")
    var imageToAppendToDiv2 = $("<img>").attr("src", this.marsPicFromRobot);
    imageToAppendToDiv2.css("background-size", "cover");
    imageToAppendToDiv2.css("background-repeat", "no-repeat");
    $(divToAppendToDom2).append(imageToAppendToDiv2);
    $("#movieNasaPokemon").append(divToAppendToDom2);
  }





}
