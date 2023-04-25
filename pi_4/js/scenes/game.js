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
		this.items = ['cb','co','sb','so','tb','to']
	}
	
    create (){	

		function barreja() {return Math.random()-0.5;}
		function score(){
			
		}
		/*
		function save(){
			{
				id = this.username;
				var cartes = []// array.cards --> copiarem parelles de cartes 
				for (var i = 0; i<this.cards.length; i++){
					cartes [i] = 
				}
			}
		}
		function load(){

		}
		*/
		console.log(this.config)
		console.log(this.config.cards)
		let arraycards = [];
		arraycards=this.items.slice();
		arraycards=Phaser.Utils.Array.Shuffle(arraycards)
		arraycards = arraycards.slice(0,this.config.cards);
		arraycards = arraycards.concat(arraycards);
		arraycards=Phaser.Utils.Array.Shuffle(arraycards)
		console.log(arraycards.length)
		for (var i = 0; i<arraycards.length; i++){
			Phaser.Utils.Array.Add(this.current_card,{done: false, texture: 'back'});
		}
		var mig = 400;
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
		console.log(this.time)
		console.log(this.penalti)
		var mostrar = false
		setTimeout(() => {
			x = mig - (this.config.cards * 100) + 50;
			for (var i = 0; i<arraycards.length; i++){
				this.cards.create(x, 300, 'back');
				x += 100;
			}
			i = 0;
			var anterior = null
			this.cards.children.iterate((card)=>{
				console.log(card.card_id)
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
								console.log(this.firstClick);
								anterior = this.firstClick;
								setTimeout(() => {
									anterior.enableBody(false, 0, 0, true, true);
									card.enableBody(false, 0, 0, true, true);
									mostrar = false;
								}, this.time);		
								console.log(mostrar)
								if (this.score <= 0){
									alert("Game Over");
									loadpage("../");
								}
							}
							else{
								console.log(this.score);
								this.correct++;
								if (this.correct >= this.config.cards){
									let ranking = [];
									if (localStorage.getItem("Ranking")){
										console.log(ranking);
										ranking = JSON.parse(localStorage.getItem("Ranking"));
									}
									const obj = {id: this.username, punts: this.score};
									
									//ranking.push(obj);
									//ranking.sort(function(a,b){return b-a});
									ranking.splice(10,1);
									console.log(ranking);
									localStorage.setItem("Ranking", JSON.stringify(ranking));
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
						console.log()
					}			
				}, card);
			});
		}, this.time);			
		this.cameras.main.setBackgroundColor(0xBFFCFF);		
		
	}
	
	update (){	}
}

