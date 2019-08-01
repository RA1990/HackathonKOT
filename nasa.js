
class Nasa {

  constructor() {
    this.marsPicFromRobot = null;
    this.currentDate = new Date();
    this.currentYear = this.currentDate.getFullYear();
    this.currentMonth = this.currentDate.getMonth() + 1;
    this.currentDay = this.currentDate.getDate();
    this.getPicturesAndVideosOfSpaceBasedOnCurrentDate();
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
        console.log("success Nasa Data");
        console.log(response);
        this.marsPicFromRobot = response["photos"][0].img_src;
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
      }.bind(this),
      error: function (response) {
        console.log("retrieve Data From Nasa failed");
      }
    });

  }

  render() {




  }





}
