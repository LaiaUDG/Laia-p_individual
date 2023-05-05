var load_obj = function(){
	var vue_instance = new Vue({
		el: "#saves_id",
		data: {
			saves: [],
			saves2: []
		},
		created: function(){
			let arrayPartides = [];
			let arrayPartides2 = [];
			if(localStorage.partides){
				arrayPartides = JSON.parse(localStorage.partides);
				if(!Array.isArray(arrayPartides)) arrayPartides = [];
			}
			this.saves = arrayPartides;
			if(localStorage.partides2){
				arrayPartides2 = JSON.parse(localStorage.partides2);
				if(!Array.isArray(arrayPartides2)) arrayPartides2 = [];
			}
			this.saves2 = arrayPartides2;
		},
		methods: { 
			enrere: function(){
				loadpage("../");
			},
			load: function(i){
				sessionStorage.idPartida = i;
				loadpage("../html/game.html");
			}
		}
	});
	return {}; 
}();

