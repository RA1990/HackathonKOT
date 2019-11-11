class Pokemon {
    constructor() {
        this.currentWeatherToAppendWithPokemon = null;
        this.pokemonName = null;
        this.pokemonMove = null;
        this.pokemonImage = null;
        this.container = $('#display');
        this.domElements = {};
        this.pokemonArray = [];
        this.render = this.render.bind(this);
        this.getPokemon = this.getPokemon.bind(this);
        this.nasa = new Nasa(this.getPokemon);

    }

    render() {

        var name = $('<h1>', { text: this.pokemonName });
        var image = $('<img>').attr("src", this.pokemonImage).css({
            "width": "30%",
             "height": "30%",
            'vertical- align': 'top'
            });
        var modal = $("<div>").addClass("model");
        var textPokeName = $("<p>").text("Hello, I'm " + this.pokemonName);
        var textweatherInfo = $("<p>").text("It's :" + this.currentWeatherToAppendWithPokemon + " today");
        var textMovie = $("<p>").text("These are the movies that I like to watch before I go to sleep...");
        modal.append(textPokeName,textweatherInfo, textMovie);
        movie = new Movie();
        $('header').css("display",  "none");
        $("body").removeClass("loading");
        $("body").addClass("backgroundImage");
        $(".pokeIcon").append(image);
        $(".pokeIcon").append(modal);

    }
    getPokemon(count = 1, weather, warning) {

        var pokemonId=null;
        this.currentWeatherToAppendWithPokemon = weather;

        switch(weather){
            case "clear-day":
            pokemonId=5;
            break;
            case "partly-cloudy-day":
            case "cloudy":
            case "fog":
            pokemonId = 45;
            break;
            case "rain":
            case "wind":
            pokemonId = 1;
            break;
            case "clear-night":
            case "partly-cloudy-night":
            pokemonId = 65;
            break;

        }

        for (var i = 0; i < 1; i++) {
            var pokemonUrl = "https://pokeapi.co/api/v2/pokemon/" +pokemonId+ "/";

            $.ajax({
                url: pokemonUrl,
                method: 'get',
                dataType: 'json',
                success: function (response) {
                    var warningRespones = null;
                    if (warning === true) {
                        warningRespones = response.sprites.front_shiny;
                    } else {
                        warningRespones = response.sprites.front_default;
                    }
                    console.log(response);
                    debugger;
                    this.pokemonName = response.name;
                    this.pokemonImage = warningRespones;
                    this.render();
                }.bind(this),
                error: function (response) {
                    console.log("failed api");
                }
            });

        }
    }
}
