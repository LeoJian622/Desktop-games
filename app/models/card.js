function cards() {
	var cards = [{
		color: "red",
		direction: -1,
		step: -1,
		flag: true
	}, {
		color: "blue",
		direction: -1,
		step: -1,
		flag: true
	}, {
		color: "yellow",
		direction: -1,
		step: -1,
		flag: true
	}, {
		color: "green",
		direction: -1,
		step: -1,
		flag: true
	}, {
		color: "purple",
		direction: -1,
		step: -1,
		flag: true
	}, {
		color: "colorful",
		direction: -1,
		step: -1,
		flag: true
	}, {
		color: "red",
		direction: -1,
		step: -1,
		flag: true
	}, {
		color: "blue",
		direction: -1,
		step: -1,
		flag: true
	}, {
		color: "yellow",
		direction: -1,
		step: -1,
		flag: true
	}, {
		color: "green",
		direction: -1,
		step: -1,
		flag: true
	}, {
		color: "purple",
		direction: -1,
		step: -1,
		flag: true
	}, {
		color: "colorful",
		direction: -1,
		step: -1,
		flag: true
	}, {
		color: "red",
		direction: 1,
		step: 1,
		flag: true
	}, {
		color: "blue",
		direction: 1,
		step: 1,
		flag: true
	}, {
		color: "yellow",
		direction: 1,
		step: 1,
		flag: true
	}, {
		color: "green",
		direction: 1,
		step: 1,
		flag: true
	}, {
		color: "purple",
		direction: 1,
		step: 1,
		flag: true
	}, {
		color: "colorful",
		direction: 1,
		step: 1,
		flag: true
	}, {
		color: "red",
		direction: 1,
		step: 1,
		flag: true
	}, {
		color: "blue",
		direction: 1,
		step: 1,
		flag: true
	}, {
		color: "yellow",
		direction: 1,
		step: 1,
		flag: true
	}, {
		color: "green",
		direction: 1,
		step: 1,
		flag: true
	}, {
		color: "purple",
		direction: 1,
		step: 1,
		flag: true
	}, {
		color: "colorful",
		direction: 1,
		step: 1,
		flag: true
	}, {
		color: "red",
		direction: 1,
		step: 1,
		flag: true
	}, {
		color: "blue",
		direction: 1,
		step: 1,
		flag: true
	}, {
		color: "yellow",
		direction: 1,
		step: 1,
		flag: true
	}, {
		color: "green",
		direction: 1,
		step: 1,
		flag: true
	}, {
		color: "purple",
		direction: 1,
		step: 1,
		flag: true
	}, {
		color: "colorful",
		direction: 1,
		step: 1,
		flag: true
	}, {
		color: "red",
		direction: 1,
		step: 1,
		flag: true
	}, {
		color: "blue",
		direction: 1,
		step: 1,
		flag: true
	}, {
		color: "yellow",
		direction: 1,
		step: 1,
		flag: true
	}, {
		color: "green",
		direction: 1,
		step: 1,
		flag: true
	}, {
		color: "purple",
		direction: 1,
		step: 1,
		flag: true
	}, {
		color: "colorful",
		direction: 1,
		step: 1,
		flag: true
	}, {
		color: "red",
		direction: 1,
		step: 1,
		flag: true
	}, {
		color: "blue",
		direction: 1,
		step: 1,
		flag: true
	}, {
		color: "yellow",
		direction: 1,
		step: 1,
		flag: true
	}, {
		color: "green",
		direction: 1,
		step: 1,
		flag: true
	}, {
		color: "purple",
		direction: 1,
		step: 1,
		flag: true
	}, {
		color: "colorful",
		direction: 1,
		step: 1,
		flag: true
	}, {
		color: "red",
		direction: 1,
		step: 2,
		flag: true
	}, {
		color: "blue",
		direction: 1,
		step: 2,
		flag: true
	}, {
		color: "yellow",
		direction: 1,
		step: 2,
		flag: true
	}, {
		color: "green",
		direction: 1,
		step: 2,
		flag: true
	}, {
		color: "purple",
		direction: 1,
		step: 2,
		flag: true
	}, {
		color: "colorful",
		direction: 0,
		step: 1,
		flag: true
	}, {
		color: "colorful",
		direction: 0,
		step: 1,
		flag: true
	}, {
		color: "colorful",
		direction: 0,
		step: 1,
		flag: true
	}, {
		color: "colorful",
		direction: 0,
		step: 2,
		flag: true
	}, {
		color: "colorful",
		direction: 0,
		step: 2,
		flag: true
	}];

	this.showCardstatus = function() {
		console.log(cards);
	};

	this.resetCards = function() {
		count = 0;
		for (card in cards) {
			cards[card].flag = true;
		}
		return true;
	};

	var count = 0;
	this.remainCards = true;
	this.drawCard = function() {
		do {
			card = cards[Math.floor(Math.random() * cards.length)];
		} while (!card.flag && count <= 52)
		card.flag = false;
		count++;
		if (count == 52) {
			this.remainCards = false;
		}
		return card;
	};
};

module.exports = cards;


// debug
// c = new cards();
// var x = 0;
// result = c.drawCard();
// c.showCardstatus();
// console.log('-----------------------------------');
// console.log(result);
// console.log('-----------------------------------');
// result = c.drawCard();
// c.showCardstatus();
// console.log('-----------------------------------');
// console.log(result);
// console.log('-----------------------------------');