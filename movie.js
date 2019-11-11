class Movie {
  constructor() {
    // debugger;
    this.movieAjax();
  }


  movieAjax() {

    $.ajax({
      dataType: 'json',

      url: 'https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=1960-09-15&primary_release_date.lte=2019-10-22&api_key=c1cef9beae0322663aa3e02d19fd34be',

      method: 'get',
      data: {
        "api_key": "c1cef9beae0322663aa3e02d19fd34be"
      },
      success: function (response) {
        var currentWeather = 'sunny';
        console.log("Movie Response", response);
        var weatherGenreMaps = {
          sunny: [28/*, 12, 16, 35, 80, 99, 18, 37, 10402, 878, 53, 37*/],
          cloudy: [10751, 14, 36, 878, 27, 10752, 10770, 9648, 10749],
        }
        var moviesForCurrentWeather = [];
        var movieSearch = response.results;
        for (var movieIndex = 0; movieIndex < movieSearch.length; movieIndex++) {
          var genresIdArray = movieSearch[movieIndex].genre_ids; // return an Arrays of movies id

          var movieTitle = movieSearch[movieIndex].title;

          var movieReleaseDate = movieSearch[movieIndex].release_date;

          var moviePic = movieSearch[movieIndex].poster_path;

          for (var movieGenreIndex = 0; movieGenreIndex < genresIdArray.length; movieGenreIndex++) {
            var movieGenreId = genresIdArray[movieGenreIndex];
            if (weatherGenreMaps[currentWeather].includes(movieGenreId)) {
              moviesForCurrentWeather.push({
                title: movieTitle,
                release_date: movieReleaseDate,
                poster_path: moviePic,
              });
              break;
            }
          }
        }

        for (var movieIndex = 0; movieIndex < movieSearch.length; movieIndex++) {
          var genresIdArray = movieSearch[movieIndex].genre_ids; // return an Arrays of movies id
          for (var genreIndex = 0; genreIndex < genresIdArray.length; genreIndex++) {
            var currentGenreID = genresIdArray[genreIndex];  // currentGenreID =
            var weatherGenreIds = weatherGenreMaps[currentWeather]; //
            if (weatherGenreIds.indexOf(currentGenreID) !== -1) {
              moviesForCurrentWeather.push(movieSearch[movieIndex]);
            }
          }
        }
        console.log("movie info json ", moviesForCurrentWeather)



        for (var i = 0; i < 3; i++) {
          var randomMovie = Math.floor(Math.random() * moviesForCurrentWeather.length)

          var createTitle = moviesForCurrentWeather[randomMovie].title;

          var createPic = moviesForCurrentWeather[randomMovie].poster_path;
          console.log("picture:", createPic)

          var createDom = $("<div>").addClass("container");

          var picture = $("<img>").attr("src", 'http://image.tmdb.org/t/p/w300/' + createPic);

          var title = $("<div>").addClass("title");
          title.append(createTitle)


          createDom.append(picture, title).css({
            "display": "inline-block",
            "margin": "5%",
            "font-weight": "bold",
            'color' : 'white'
          });

          $("#movieNasaPokemon").append(createDom)


        }


      }.bind(this),
      error: function (response) {
        console.log("retrieve Data Error");
      }
    });
  }

}
