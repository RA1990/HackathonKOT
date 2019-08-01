$(document).ready(startApp);
var movie = null;
function startApp() {
  console.log("working");
  movie = new Movie();
}

class Movie {
  constructor() {
    this.newMovieDomArray = [];
    this.marsPicFromRobot = null;
    this.currentDate = new Date();
    this.currentYear = this.currentDate.getFullYear();
    this.currentMonth = this.currentDate.getMonth() + 1;
    this.currentDay = this.currentDate.getDate();
    this.getPicturesAndVideosOfSpaceBasedOnCurrentDate();
    this.MovieAjax();
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
    //debugger;
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
        //console.log("success Nasa Data");
       // console.log(response.url);
      }.bind(this),
      error: function (response) {
        console.log("retrieve Data From Nasa failed");
      }
    });
  }
  getTest() {
   // debugger;
    $.ajax({
      url: 'https://api.nasa.gov/neo/rest/v1/neo/3542519?api_key=4GZGei353YIcMShBD9LaDMgruc3fcMTPchEnDE7k',
      method: 'get',
      dataType: 'JSON',
      data: {
        'api_key': '4GZGei353YIcMShBD9LaDMgruc3fcMTPchEnDE7k'
      },
      success: function (response) {
        console.log("success Nasa Data");
        console.log(response);
      }.bind(this),
      error: function (response) {
        console.log("retrieve Data From Nasa failed");
      }
    });
  }


  MovieAjax() {
  // var movie = $("input").text();

  $.ajax({

    dataType: 'json',
    // url: 'https://api.themoviedb.org/3/discover/movie?query=' + movie + '&api_key=c1cef9beae0322663aa3e02d19fd34be',
    url: 'https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=1960-09-15&primary_release_date.lte=2019-10-22&api_key=c1cef9beae0322663aa3e02d19fd34be',
    // url: 'https://api.themoviedb.org/3/movie/550?api_key=c1cef9beae0322663aa3e02d19fd34be',
    method: 'get',
    data: {
      "api_key": "c1cef9beae0322663aa3e02d19fd34be"
    },
    success: function (response) {
      var currentWeather = 'sunny';

      console.log("Movie Response", response);
      //debugger
      // console.log("rtyfuhjk",response[0].title)
      var weatherGenreMaps = {
        sunny: [28/*, 12, 16, 35, 80, 99, 18, 37, 10402, 878, 53, 37*/],
        cloudy: [10751, 14, 36, 878, 27, 10752, 10770, 9648, 10749],


      }
    //  $(body).append(weatherGenreMaps.sunny[0])
      var moviesForCurrentWeather = [];

      var movieSearch = response.results; //return the json of the movie results
      // console.log("movie Search", movieSearch)

      for (var movieIndex = 0; movieIndex < movieSearch.length; movieIndex++) {
        var genresIdArray = movieSearch[movieIndex].genre_ids; // return an Arrays of movies id
        //  console.log("genresId",genresIdArray)
        var movieTitle = movieSearch[movieIndex].title;
        //  console.log("movie Title", movieTitle)

        // var movieReleaseDate = movieSearch[movieIndex].release_date;
        // console.log("Release Date",movieReleaseDate)

        var moviePic = movieSearch[movieIndex].poster_path;
        // console.log("pic", moviePic)
        for (var movieGenreIndex = 0; movieGenreIndex < genresIdArray.length; movieGenreIndex++) {
          var movieGenreId = genresIdArray[movieGenreIndex];

          if (weatherGenreMaps[currentWeather].includes(movieGenreId)) {
            moviesForCurrentWeather.push({
              title: movieTitle,
              // release_date: movieReleaseDate,
              poster_path: moviePic,
            });
            break;
          }
        }
      }

      console.log("final Output",moviesForCurrentWeather);





      //var randomMovie = Math.floor(Math.random() * moviesForCurrentWeather.length);
      // console.log(randomMovie)

      for(var i = 0; i < moviesForCurrentWeather.length; i++){
        var createTitle = moviesForCurrentWeather[i].title;
        // console.log("Title:", createTitle)

        var createPic = moviesForCurrentWeather[i].poster_path;
        console.log("picture:", createPic)

        var createDom = $("<div>").addClass("container");

        var picture = $("<img>").attr("src", 'http://image.tmdb.org/t/p/w300/'+createPic);

        var title = $("<div>").addClass("title");
        title.append(createTitle)




        createDom.append(picture, title);

        $(".main").append(createDom)


      }





    }.bind(this),

    error: function (response) {
      console.log("retrieve Data Error");
    }
  });

}


}






// success: function (response) {
//   var currentWeather = 'sunny';

//   console.log("Movie Response", response);
//   //debugger

//   var weatherGenreMaps = {
//     sunny: [28/*, 12, 16, 35, 80, 99, 18, 37, 10402, 878, 53, 37*/],
//     cloudy: [10751, 14, 36, 878, 27, 10752, 10770, 9648, 10749],


//   }

//   var moviesForCurrentWeather = [];

//   var movieSearch = response.results; //return the json of the movie results
//   // console.log("movie Search", movieSearch)

//   for (var movieIndex = 0; movieIndex < movieSearch.length; movieIndex++) {
//     var genresIdArray = movieSearch[movieIndex].genre_ids; // return an Arrays of movies id
//     //  console.log("genresId",genresIdArray)
//     var movieTitle = movieSearch[movieIndex].title;
//     //  console.log("movie Title", movieTitle)

//     // var movieReleaseDate = movieSearch[movieIndex].release_date;
//     // console.log("Release Date",movieReleaseDate)

//     var moviePic = movieSearch[movieIndex].poster_path;
//     // console.log("pic", moviePic)
//     for (var movieGenreIndex = 0; movieGenreIndex < genresIdArray.length; movieGenreIndex++) {
//       var movieGenreId = genresIdArray[movieGenreIndex];

//       if (weatherGenreMaps[currentWeather].includes(movieGenreId)) {
//         moviesForCurrentWeather.push({
//           title: movieTitle,
//           // release_date: movieReleaseDate,
//           poster_path: moviePic,
//         });
//         break;
//       }
//     }
//   }

//   console.log("final Output", moviesForCurrentWeather);





//   //var randomMovie = Math.floor(Math.random() * moviesForCurrentWeather.length);
//   // console.log(randomMovie)

//   var createTitle = moviesForCurrentWeather[randomMovie].title;
//   var createPic = moviesForCurrentWeather[randomMovie].poster_path;

//   var createDom = $("<div>").addClass("container");

//   var picture = $("<img>").attr("src", createPic);
//   var title = $("<div>").addClass("title");
//   title.append(createTitle)


//   createDom.append(picture, title);

//   $("#main").append(createDom)


// }.bind(this),








//----------------------------------------------------------------------------






// function testAjax(){
//   // var movie = $("input").text();

//   $.ajax({

//     dataType: 'json',
//     // url: 'https://api.themoviedb.org/3/discover/movie?query=' + movie + '&api_key=c1cef9beae0322663aa3e02d19fd34be',
//     url: 'https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=1960-09-15&primary_release_date.lte=2019-10-22&api_key=c1cef9beae0322663aa3e02d19fd34be',
//     // url: 'https://api.themoviedb.org/3/movie/550?api_key=c1cef9beae0322663aa3e02d19fd34be',
//     method: 'get',
//     data: { "api_key": "c1cef9beae0322663aa3e02d19fd34be"
//   },
//     success: function (response) {
//       var currentWeather = 'sunny';

//       console.log("Movie Response", response);

//       var weatherGenreMaps = {
//         sunny: [28/*, 12, 16, 35, 80, 99, 18, 37, 10402, 878, 53, 37*/ ],
//         cloudy: [10751, 14, 36 , 878, 27, 10752, 10770, 9648, 10749],


//       }

//       var moviesForCurrentWeather = [];

//       var movieSearch = response.results; //return the json of the movie results
//       // console.log("movie Search", movieSearch)

//       for (var movieIndex = 0; movieIndex < movieSearch.length; movieIndex++) {
//         var genresIdArray = movieSearch[movieIndex].genre_ids; // return an Arrays of movies id
//           //  console.log("genresId",genresIdArray)
//         var movieTitle = movieSearch[movieIndex].title;
//           //  console.log("movie Title", movieTitle)

//         var movieReleaseDate = movieSearch[movieIndex].release_date;
//           // console.log("Release Date",movieReleaseDate)

//         var moviePic = movieSearch[movieIndex].poster_path;
//           // console.log("pic", moviePic)
//         for (var movieGenreIndex = 0; movieGenreIndex < genresIdArray.length; movieGenreIndex++){
//           var movieGenreId = genresIdArray[movieGenreIndex];

//           if (weatherGenreMaps[currentWeather].includes(movieGenreId)){
//             moviesForCurrentWeather.push({
//               title: movieTitle,
//               release_date: movieReleaseDate,
//               poster_path: moviePic,
//             });
//             break;
//           }
//         }
//       }

//       //console.log("final Output",moviesForCurrentWeather)

//       var createDom = $("<div>").addClass("container");

//       var createPic = $("<div>").addClass("moviePic");
//       createPic.append(moviePic);

//       var createTitle = $("<div>").addClass("movieTitle");
//       createTitle.append(movieTitle);

//       var createDate = $("<div>").addClass("releaseDate");
//       createDate.append(movieReleaseDate);

//       createDom.append(createPic, createTitle, createDate)





//     // console.log("list of Movies",movieSearch)
//     // for(var movieIndex= 0; movieIndex < movieSearch.length; movieIndex++){
//     //   var genresIdArray = movieSearch[movieIndex].genre_ids; // return an Arrays of movies id
//     //   for( var genreIndex = 0; genreIndex < genresIdArray.length; genreIndex++){
//     //     var currentGenreID = genresIdArray[genreIndex];  // currentGenreID =
//     //     var weatherGenreIds = weatherGenreMaps[ currentWeather ]; //
//     //     if( weatherGenreIds.indexOf( currentGenreID ) !== -1){
//     //       moviesForCurrentWeather.push( movieSearch[movieIndex]);
//     //     }
//     //   }


//     // }
//     //   console.log("movie Title ", moviesForCurrentWeather)






//       // var movieSearch = response.results[0].title;
//       // console.log("movieSearch",movieSearch)


//     }.bind(this),

//     error: function(response){
//       console.log("retrieve Data Error");
//     }
//   });

// }
