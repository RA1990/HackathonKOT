class Pokemon{
    constructor(pokemonName, pokemonMove, pokemonImage, elementId){  //pokemonName,pokemonMove,pokemonImage
        this.pokemonName=pokemonName;
        this.pokemonMove=pokemonMove;  
        this.pokemonImage=pokemonImage;

        this.container = $(elementId);
        // this.newPokemon=new Pokemon(this.pokemonName,this.pokemonMove,this.pokemonImage);

        console.log('New Pokemon Being Created:', this);
        this.domElements = {
        }
        // console.log(this.newStr());
    }
    
    render(){
        var name = $('<h1>', { text: this.pokemonName });
        // var move= $('<h2>', {text: this.pokemonMove});
        var move= $('<h2>').text(this.pokemonMove);
        var image= $('<img>').attr("src",this.pokemonImage);
        this.container.append(name);
        this.container.append(move);
        this.container.append(image);
         
    }
}