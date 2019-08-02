
$(document).ready(startApp);
var movie= null;
var weather=null;
var nasa=null;
var pokemon=null;

function startApp(){
   movie = new Movie();
   weather = new Weather();
   nasa = new Nasa();
   pokemon = new Pokemon();
}
