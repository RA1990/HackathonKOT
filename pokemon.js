class Pokemon {
    constructor() {
        this.pokemonName = null;
        this.pokemonMove = null;
        this.pokemonImage = null;
        this.getPokemon();
        this.container = $('#display');
        this.domElements = {
        }
    }

    render() {
        var pokemonDiv=$("<div>").addClass("pokemonPic")
        var name = $('<h1>', { text: this.pokemonName });
        var move = $('<h2>').text(this.pokemonMove);
        var image = $('<img>').attr("src", this.pokemonImage).css({"width": "400%", "height": "400%", "padding": "5%"});
        pokemonDiv.append(image);
        $('#movieNasaPokemon').append(pokemonDiv);

    }
    getPokemon(count = 1) {
        for (var i = 0; i < count; i++) {
            var pokemonUrl = "https://pokeapi.co/api/v2/pokemon/" + (Math.floor(Math.random(i) * 100) + 1) + "/";
            $.ajax({
                url: pokemonUrl,
                method: 'get',
                dataType: 'json',
                success: function (response) {
                    this.pokemonName = response.name;
                    this.pokemonMove = response.moves[0].move.name;
                    this.pokemonImage = response.sprites.front_default;
                    this.render();
                }.bind(this),
                error: function (response) {
                    console.log("failed api");
                }
            });

        }
    }
}
