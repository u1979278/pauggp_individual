const back = "../resources/back.png";
const items = ["../resources/cb.png","../resources/co.png","../resources/sb.png",
"../resources/so.png","../resources/tb.png","../resources/to.png"];

var options_data = {
	cards:2, dificulty:"hard"
};
var load = function(){
	var json = localStorage.getItem("config");
	if (json)
		options_data = JSON.parse(json);
	else{
		options_data.cards = 2;
		options_data.dificulty = "hard";
	}
};
load();

var game = new Vue({
	el: "#game_id",
	data: {
		username:'',
		current_card: [],
		items: [],
		num_cards: options_data.cards,
		bad_clicks: 0
	},
	created: function(){
		this.username = sessionStorage.getItem("username","unknown");
		this.items = items.slice(); // Copiem l'array
		this.items.sort(function(){return Math.random() - 0.5}); // Array aleatòria
		this.items = this.items.slice(0, this.num_cards); // Agafem els primers numCards elements
		this.items = this.items.concat(this.items); // Dupliquem els elements
		this.items.sort(function(){return Math.random() - 0.5}); // Array aleatòria
		for (var i = 0; i < this.items.length; i++){
			this.current_card.push({done: false, texture: back});
		}

		// Dificulty "easy" -- const myTimeout = setTimeout(myGreeting, 5000);
		// Dificulty "normal" -- const myTimeout = setTimeout(myGreeting, 3000);
		// Dificulty "hard" -- const myTimeout = setTimeout(myGreeting, 1500);
	},
	methods: {
		clickCard: function(i){
			if (!this.current_card[i].done && this.current_card[i].texture === back)
				Vue.set(this.current_card, i, {done: false, texture: this.items[i]});
		}
	},
	watch: {
		current_card: function(value){
			if (value.texture === back) return;
			var front = null;
			var i_front = -1;
			for (var i = 0; i < this.current_card.length; i++){
				if (!this.current_card[i].done && this.current_card[i].texture !== back){
					if (front){
						if (front.texture === this.current_card[i].texture){
							front.done = this.current_card[i].done = true;
							this.num_cards--;
						}
						else{
							Vue.set(this.current_card, i, {done: false, texture: back});
							Vue.set(this.current_card, i_front, {done: false, texture: back});
							this.bad_clicks++;
							break;
						}
					}
					else{
						front = this.current_card[i];
						i_front = i;
					}
				}
			}			
		}
	},

	// PUNTUACIO
	computed: {
		score_text: function(){
			switch(options_data.dificulty){
				case "easy":
					return 100 - this.bad_clicks;
					break;
				case "normal":
					return 100 - this.bad_clicks * 10;
					break;
				case "hard":
					return 100 - this.bad_clicks * 20;
					break;
				default:
					return 100 - this.bad_clicks * 20;
			}
		}
	}
});





