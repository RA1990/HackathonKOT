$(document).ready(initApp);

var pokemonList = [];

function initApp(){
    $('#get-pokemon').click(function() {
        getPokemon(5)
    });
}

function getPokemon(count = 1){
    // console.log('Get Pokemon   Called!');
    
    for(var i = 0; i < count; i++){
        var pokemonUrl = "https://pokeapi.co/api/v2/pokemon/"+(Math.floor(Math.random(i) * 100) + 1)+"/";//you do (Math.floor(Math.random(i) * 100) because
        //you want the i start from 1 to 9, so you get random number from all the pokemon, 9 times.
        $.ajax({//call this ajax function on each loop
            url: pokemonUrl,
            method: 'get',
            dataType:'json',
            success: function(response){
                // console.log("poki data success bulbasaur:", response);
                var newPokemon = new Pokemon(response.name, response.moves[0].move.url ,response.sprites.front_default, '#display');
                pokemonList.push(newPokemon);

                newPokemon.render();
            },
            error: function (response){
                consoel.log("failed api");
            }
        });
    }
//     $.ajax({//call this ajax function on each loop
//         url: pokemonUrl,
//         method: 'get',
//         dataType:'json',
//         success: function(response){
//             // console.log("poki data success bulbasaur:", response);
//             var newPokemon = new Pokemon(response.name, response.moves[0].move ,response.sprites.front_default, '#display');
//             pokemonList.push(newPokemon);

//             newPokemon.render();
//         },
//         error: function (response){
//             consoel.log("failed api");
//         }
// }
