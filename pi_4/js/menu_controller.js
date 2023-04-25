function start_game(){
	name = prompt("User name");
	
	sessionStorage.setItem("username", name);
	
	loadpage("./html/game.html");
}

function phaser_jocs(){
	var x = document.getElementById("Jocs");
	var b = document.getElementsByTagName("Inici")
	console.log(x.style.display);
	if (x.style.display == 'grid'){
		console.log("Primer");
		x.style.display = 'none';
	} 
	else {
		x.style.display = 'grid';
		b.style.display = 'none';
	}
}

function phaser_game(){
	loadpage("./html/phasergame.html");
}

function phaser_game2(){
	loadpage("./html/phasergame.html");
}

function exit (){
	if (name != ""){
		alert("Leaving " + name + "'s game");
	}
	name = "";
}

function options(){
	loadpage("./html/options.html");
}

function load(){
	loadpage("./html/load.html");
}

function puntuacions(){
	loadpage("./html/puntuacions.html")
}