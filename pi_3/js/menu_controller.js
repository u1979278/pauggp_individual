function start_game(){
	name = prompt("User name");
	loadpage("./html/game.html");
}

function exit (){
	if (name != ""){
		alert("Leaving " + name + "'s game");
		loadpage("../index.html");
	}
	name = "";
	loadpage("../index.html");
}

function options(){
	// TODO: Open options menu
	loadpage("./html/options.html")
}

function gotomenu(){
	loadpage ("../index.html")
}
