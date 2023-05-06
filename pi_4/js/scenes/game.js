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
		this.config = JSON.parse(localStorage.getItem("config"))||{cards:2,dificulty:"hard"};
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
		this.load.image('save', '../resources/flatLight32.png');
		this.load.image('save_pres', '../resources/transparentLight32.png')
		this.items = ['cb','co','sb','so','tb','to']
	}
	
	save(array){
		console.log(this.cards);
		console.log(array);
		var partida = {
			"id": this.username,
			"score": this.score,
			"correct": this.correct,
			"config": this.config,
			"cartes" : array,
			"dors": [] //array amb objectes, carta, bool mostrar
		}
		var existeix = "";
		for (var i = 0; i<array.length; i++){
			//console.log(this.cards.children.entries[i]);
			var carta = this.cards.children.entries[i];
			console.log(carta);
			console.log(partida.dors.id);
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
		var ArrayPartides = [];
		if(localStorage.partides){
			ArrayPartides = JSON.parse(localStorage.partides);
			if(!Array.isArray(ArrayPartides)) ArrayPartides = [];
		}
		ArrayPartides.push(partida);
		localStorage.partides = JSON.stringify(ArrayPartides);
		console.log(partida);
		alert("Partida guardada com a \"" + this.username);
		loadpage("../");
	};

	load(){
		print("jaja");
	}


    create (){	
		console.log(this.username);

		//creació del buto save		
		var mig = 400;
		this.add.image(mig, 400, 'save_pres');
		var guardar = this.add.image(mig, 400, 'save');
		guardar.setInteractive();
	
		console.log(this.config)
		console.log(this.config.cards)
		var arraycards = [];
		arraycards=this.items.slice();
		arraycards=Phaser.Utils.Array.Shuffle(arraycards)
		arraycards = arraycards.slice(0,this.config.cards);
		arraycards = arraycards.concat(arraycards);
		arraycards=Phaser.Utils.Array.Shuffle(arraycards)	
		
		guardar.on('pointerup', () =>{
			guardar.destroy();
			guardar=null;
			this.save(arraycards);
		})

		//console.log(arraycards.length)
		for (var i = 0; i<arraycards.length; i++){
			Phaser.Utils.Array.Add(this.current_card,{done: false, texture: 'back'});
		}

		var x = mig - (this.config.cards * 100) + 50;
		this.cards = this.physics.add.staticGroup();
		for (var i = 0; i<arraycards.length; i++){
			this.add.image(x,300,arraycards[i])
			x += 100;
		}
		

		console.log(this.config.dificulty)
		if (this.config.dificulty === "easy"){
			this.time = 3000;
			this.penalti = 10;
		} 
		if (this.config.dificulty === "hard"){
			this.time = 1000;
			this.penalti = 25;
		} 
		if (this.config.dificulty === "normal"){
			this.time = 2000;
			this.penalti = 20;
		} 
		console.log(this.time);
		console.log(this.penalti);
		var mostrar = false
		setTimeout(() => {
			console.log(this.cards)
			x = mig - (this.config.cards * 100) + 50;
			for (var i = 0; i<arraycards.length; i++){
				this.cards.create(x, 300, 'back');
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
					console.log(this.cards);
					if (!mostrar){
						if (this.firstClick){
							if (this.firstClick.card_id !== card.card_id){
								this.score -= this.penalti;
								mostrar = true;
								//console.log(this.score);
								//console.log(this.firstClick);
								anterior = this.firstClick;
								setTimeout(() => {
									console.log(this.cards);
									anterior.enableBody(false, 0, 0, true, true);
									card.enableBody(false, 0, 0, true, true);
									mostrar = false;
								}, this.time);		
								//console.log(mostrar);
								if (this.score <= 0){
									alert("Game Over");
									loadpage("../");
								}
							}
							else{
								console.log(this.score);
								this.correct++;
								if (this.correct >= this.config.cards){
									alert("You Win with " + this.score + " points.");
									loadpage("../");
								}
							}
							this.firstClick = null;
						}
						else{
							console.log("No firstClick")
							this.firstClick = card;	
						}
						 card.disableBody(true,true);
						 console.log(this.cards);
						//console.log(card);
					}			
				}, card);
			});
		}, this.time);			
		this.cameras.main.setBackgroundColor(0xBFFCFF);		
		//console.log(this.cards);
	}

	update (){	}
}

