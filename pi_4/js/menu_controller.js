var menu = function(){
	var vue_instance = new Vue({
		el: "#menu_id",
		data:{},
	created: function(){
		console.log("inici");
	},
	methods :{
		start_game: function(){
				console.log("start_game");
				name = prompt("User name");
				sessionStorage.setItem("username", name);
				loadpage("./html/game.html");
		},
		phaser_jocs: function(){
			var x = document.getElementById("Jocs");
			var b = document.getElementById("Inici")
			console.log(x.style.display);
			console.log(b.style.display);
			if (x.style.display == 'grid'){
				console.log("Primer");
				x.style.display = "none";
			} 
			else {
				x.style.display = 'grid';
				b.style.display = 'none';
			}
		},
		phaser_game: function(){
			name = prompt("User name");
			sessionStorage.setItem("username", name);
			loadpage("./html/phasergame.html");
		},
		phaser_game2: function() {
			name = prompt("User name");
			sessionStorage.setItem("username2", name);
			loadpage("./html/phasergame2.html");
		},
		exit: function() {
			if (name != ""){
				alert("Leaving " + name + "'s game");
			}
			name = "";
			loadpage("../");
		},
		options: function(){
			loadpage("./html/options.html");
		},
		load: function(){
			loadpage("./html/load.html");	
		},
		puntuacions: function(){
			loadpage("./html/puntuacions.html");
		}
	},
	watch:{

	},
	});
	return {};
}();

/*
function start_game(){

}

function phaser_jocs(){
	
}

function phaser_game(){
	
}

function phaser_game2(){
	
}

function exit (){

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
*/
