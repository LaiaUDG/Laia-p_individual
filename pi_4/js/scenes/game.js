class GameScene extends Phaser.Scene {
    constructor (){
        super('GameScene');
		this.cards = null;
		this.firstClick = null;
		this.score = 100;
		this.correct = 0;
		this.items = []
		this.current_card = []
    }

    preload (){	
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
		let config = JSON.parse(localStorage.getItem("config"))
		let arraycards = [];
		arraycards=this.items.slice();
		arraycards=Phaser.Utils.Array.Shuffle(arraycards)
		arraycards = arraycards.slice(0,config.num_cards);
		arraycards = arraycards.concat(arraycards);
		arraycards=Phaser.Utils.Array.Shuffle(arraycards)
		for (var i = 0; i<arraycards.length; i++){
			this.current_card.add(this,this.current_card,{done: false, texture: back});
		}
		var mig = 400
		var x = mig - (config.num_cards * 100) + 50
		setTimeout(()=> {
			for (var i = 0; i<arraycards.length; i++){
				this.add.image(x,300,arraycards[i])
				x += 100
			}
		},1000)
		
		this.cameras.main.setBackgroundColor(0xBFFCFF);
		this.add.image(250, 300, arraycards[0]);
		this.add.image(350, 300, arraycards[1]);
		this.add.image(450, 300, arraycards[2]);
		this.add.image(550, 300, arraycards[3]);
		
		this.cards = this.physics.add.staticGroup();
		
		this.cards.create(250, 300, 'back');
		this.cards.create(350, 300, 'back');
		this.cards.create(450, 300, 'back');
		this.cards.create(550, 300, 'back');
		
		i = 0;
		this.cards.children.iterate((card)=>{
			card.card_id = arraycards[i];
			i++;
			card.setInteractive();
			card.on('pointerup', () => {
				card.disableBody(true,true);
				if (this.firstClick){
					if (this.firstClick.card_id !== card.card_id){
						this.score -= 20;
						this.firstClick.enableBody(false, 0, 0, true, true);
						card.enableBody(false, 0, 0, true, true);
						if (this.score <= 0){
							alert("Game Over");
							loadpage("../");
						}
					}
					else{
						this.correct++;
						if (this.correct >= 2){
							alert("You Win with " + this.score + " points.");
							loadpage("../");
						}
					}
					this.firstClick = null;
				}
				else{
					this.firstClick = card;
				}
			}, card);
		});
	}
	
	update (){	}
}

