var puntuacions = function(){
    var vue_instance = new Vue ({
        el: "#puntuacions_id",
        data: {
            ranking: []
        },
        created: function(){
            let arrayranking = [];
            if(localStorage.getItem("Ranking")){
                console.log (JSON.parse(localStorage.getItem("Ranking")));
                arrayranking = JSON.parse(localStorage.getItem("Ranking"));
                console.log(arrayranking);
                if (!Array.isArray(arrayranking))arrayranking=[];
            }
            this.ranking = arrayranking;
            console.log(this.ranking);
        },
        methods:{
            exit: function(){
				loadpage("../");
			}
        },
    })
    return {};
}();