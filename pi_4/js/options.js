var options = function(){
	// Aquí dins hi ha la part privada de l'objecte
	var options_data = {
		cards:2, dificulty:"hard"
	};
	var options_data2 = {
		dificulty:"normal"
	};
	var load = function(){
		var json = localStorage.getItem("config") || '{"cards":2,"dificulty":"hard"}';
		options_data = JSON.parse(json);
		var json2 = localStorage.getItem("config2")|| '{"dificulty":"normal"}	';
		options_data2 = JSON.parse(json2);
	};
	var save = function(){
		localStorage.setItem("config", JSON.stringify(options_data));
		localStorage.setItem("config2",JSON.stringify(options_data2));
	};
	load();
	var vue_instance = new Vue({
		el: "#options_id",
		data: {
			num: 2,
			dificulty: "normal",
			Sdificulty: "normal"
		},
		created: function(){
			this.num = options_data.cards;
			this.dificulty = options_data.dificulty;
			this.Sdificulty = options_data2.dificulty;
		},
		watch: {
			num: function(value){
				if (value < 2)
					this.num = 2;
				else if (value > 4)
					this.num = 4;
			}
		},
		methods: { 
			discard: function(){
				this.num = options_data.cards;
				this.dificulty = options_data.dificulty;
				this.Sdificulty = options_data2.dificulty;
			},
			save: function(){
				options_data.cards = this.num;
				options_data.dificulty = this.dificulty;
				console.log(this.Sdificulty);
				console.log(options_data2);
				options_data2.dificulty = this.Sdificulty;
				console.log(this.dificulty);
				save();
				loadpage("../");
			}
		}
	});
	return {
		// Aquí dins hi ha la part pública de l'objecte
		getOptionsString: function (){
			return JSON.stringify(options_data);
		},
		getOptions2String: function(){
			return JSON.stringify(options_data2);
		},
		getNumOfCards: function (){
			return options_data.cards;
		},
		getDificulty: function (){
			return options_data.dificulty;
		}
	}; 
}();



