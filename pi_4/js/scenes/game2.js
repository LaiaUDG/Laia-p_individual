class GameScene extends Phaser.Scene {
    constructor (){
        super('GameScene');
		this.username = '';
		this.cards = null;
		this.firstClick = null;
		this.score = 100;
		this.correct = 0;
		this.items = [];
		this.current_card = [];
		this.time = null;
		this.penalti = null;
		this.config = JSON.parse(localStorage.getItem("config2"))||{dificulty:"hard"};
		this.nivell = 0;
		this.num_cartes = 2;
		this.punts = 0;
    }

    preload (){	
		this.username = sessionStorage.getItem("username","unknown");
		this.load.image('back', '../resources/back.png');
		this.load.image('cb', '../resources/cb.png');
		this.load.image('co', '../resources/co.png');
		this.load.image('sb', '../resources/sb.png');
		this.load.image('so', '../resources/so.png');
		this.load.image('tb', '../resources/tb.png');
		this.load.image('to', '../resources/to.png');
		this.items = ['cb','co','sb','so','tb','to'];
		this.load.image('save', '../resources/flatLight32.png');
		this.load.image('save_pres', '../resources/transparentLight32.png')
		this.Dificultat = () => {
			if (this.config.dificulty === "easy"){
				this.time = 3000;
				this.penalti = 10;
			} 
			if (this.config.dificulty === "hard"){
				this.time = 1000;
				this.penalti = 20;
			} 
			if (this.config.dificulty === "normal"){
				this.time = 2000;
				this.penalti = 15;
			}
		};
		this.Dificultat();
		console.log(this.config.dificulty)
	}

	save(array){
		//console.log(this.cards);
		//console.log(array);
		var partida = {
			"id": this.username,
			"score": this.score,
			"punts":this.punts,
			"penalti":this.penalti,
			"temps":this.time,
			"cartes":this.num_cartes,
			"nivells":this.nivell,
			"correct": this.correct,
			"config": this.config,
			"cartes" : array,
			"dors": [] //array amb objectes, carta, bool mostrar
		}
		var existeix = "";
		for (var i = 0; i<array.length; i++){
			//console.log(this.cards.children.entries[i]);
			var carta = this.cards.children.entries[i];
			//console.log(carta);
			//console.log(partida.dors.id);
			existeix = partida.dors.findIndex( (element) => element.id == carta.card_id);
			//console.log(existeix);
			if (existeix == -1){
				var actual = {"id": carta.card_id, "fet":!carta.active};
				partida.dors.push(actual);
			}
			else{
				if (! (!carta.active && partida.dors[existeix].fet)){
					partida.dors[existeix].fet=false;
				}
				
			}
		}
		console.log(partida);
		var ArrayPartides = [];
		if(localStorage.getItem("partides2")){
			ArrayPartides = JSON.parse(localStorage.partides2);
			if(!Array.isArray(ArrayPartides)) ArrayPartides = [];
		}
		ArrayPartides.push(partida);
		localStorage.setItem("partides2", JSON.stringify(ArrayPartides)); 
		console.log(partida);
		//alert("Partida guardada com a \"" + this.username);
		//loadpage("../");
	};

	load(){

	}
	
    create (){	
		var mig = 400;
		this.add.image(mig, 500, 'save_pres');
		var guardar = this.add.image(mig, 500, 'save');
		guardar.setInteractive();


		let arraycards = [];
		arraycards=this.items.slice();
		arraycards=Phaser.Utils.Array.Shuffle(arraycards);
		arraycards = arraycards.slice(0,this.num_cartes);
		arraycards = arraycards.concat(arraycards);
		arraycards=Phaser.Utils.Array.Shuffle(arraycards);
		for (var i = 0; i<arraycards.length; i++){
			Phaser.Utils.Array.Add(this.current_card,{done: false, texture: 'back'});
		}
		
		guardar.on('pointerup', () =>{
			guardar.visible = false;
			setTimeout(()=> {
				guardar.visible =true;
			}, 250)
			this.save(arraycards);
		})

		var y = 234;
		var x = mig - (this.num_cartes/2 * 100) + 50;
		this.cards = this.physics.add.staticGroup();
		for (var i = 0; i<arraycards.length; i++){
			if (i >= arraycards.length/2){
				y = 366;
				if(i== arraycards.length/2){x = mig - (this.num_cartes/2 * 100) + 50;}
			}
			else{y=234;}
			console.log(i);
			console.log(y);
			console.log(x);
			this.add.image(x,y,arraycards[i]);
			x += 100;
		}	
		console.log(this.num_cartes);
		console.log(this.time);
		console.log(this.penalti);
		var mostrar = false;
		setTimeout(() => {
			x = mig - (this.num_cartes/2 * 100) + 50;
			for (var i = 0; i<arraycards.length; i++){
				if (i >= arraycards.length/2){
					y = 366;
					if(i== arraycards.length/2){x = mig - (this.num_cartes/2 * 100) + 50;}
				}
				else{y=234;}
				this.cards.create(x, y, 'back');
				x += 100;
			}
			i = 0;
			var anterior = null
			this.cards.children.iterate((card)=>{
				//console.log(card.card_id)
				card.card_id = arraycards[i];
				//console.log(card.card_id)
				i++;
				card.setInteractive();
				card.on('pointerup', () => {
					if (!mostrar){
						if (this.firstClick){
							if (this.firstClick.card_id !== card.card_id){
								this.score -= this.penalti;
								mostrar = true;
								console.log(this.score);
								//console.log(this.firstClick);
								anterior = this.firstClick;
								setTimeout(() => {
									anterior.enableBody(false, 0, 0, true, true);
									card.enableBody(false, 0, 0, true, true);
									mostrar = false;
								}, this.time);		
								console.log(mostrar);
								if (this.score <= 0){
									function compare( a, b ) {
										if ( a.punts < b.punts ){
										return 1;
										}
										if ( a.punts > b.punts ){
										return -1;
										}
										else{
											if (a.nivell < b.nivell){
												return -1;
											}
											if (a.nivell > b.nivell){
												return 1;
											}
										}
										return 0;
									}
									let ranking = [];
									if (localStorage.getItem("Ranking")){
										console.log(ranking);
										ranking = JSON.parse(localStorage.getItem("Ranking"));
										console.log(ranking);
									}
									let obj = {id: this.username, nivell: this.nivell, punts: this.punts, inici: this.config.dificulty};
									console.log(obj);
									if (ranking.length == 10){
										if(ranking.at(9).punts < this.punts){
											ranking.pop();
											ranking.push(obj);
										}
										else if(ranking.at(9).punts == this.punts){
											if(ranking.at(9).nivell > this.nivell){
												ranking.pop();
												ranking.push();
											}
										}
									}
									else{
										ranking.push(obj);
									}
									ranking.sort(compare);
									console.log(ranking);
									localStorage.setItem("Ranking", JSON.stringify(ranking));
									alert("Game Over");
									loadpage("../");
								}
							}
							else{
								this.correct++;
								if (this.correct >= this.num_cartes){
									this.punts += Math.trunc(Math.sqrt(this.penalti/this.time * 1000))*this.num_cartes/2;
									console.log(this.punts);
									if (this.num_cartes < 6){
										if (this.time > 250){
											this.time -= 250;
											if(this.penalti>95){
												this.penalti += 1;
											}
										}
										else{
											this.Dificultat();
											this.num_cartes += 1; 	
										}								
									}
									else{
										this.penalti += 5;
										if(! this.time < 0){
											this.time -= 100;
										}
									}
									this.correct = 0;
									this.nivell += 1;
									setTimeout(() => {
										this.create();
									},500);
									this.add.displayList.removeAll();
								}
							}
							this.firstClick = null;
						}
						else{
							console.log("No firstClick")
							this.firstClick = card;	
						}
						card.disableBody(true,true);
						console.log()
					}			
				}, card);
			});
		}, this.time);			
		this.cameras.main.setBackgroundColor(0xBFFCFF);		
		
	}
	
	update (){	}
}


