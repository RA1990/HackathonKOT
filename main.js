
$(document).ready(startApp);
var movie= null;
var weather=null;
var nasa=null;
var pokemon=null;

function startApp(){
   pokemon = new Pokemon();
   $('header').text('Welcome to the Movie Finder! click allow')
   $("body").addClass("loading");
   //$('body').text("Welcome to the Movie Finder!, click allow ");


}
