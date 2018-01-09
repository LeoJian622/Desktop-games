function cards() {
	var cards = [
	{
		cardid:1,
		color: "red",
		direction: -1,
		step: -1,
		flag: true
	}, {
		cardid:2,
		color: "blue",
		direction: -1,
		step: -1,
		flag: true
	}, {
		cardid:3,
		color: "yellow",
		direction: -1,
		step: -1,
		flag: true
	}, {
		cardid:4,
		color: "green",
		direction: -1,
		step: -1,
		flag: true
	}, {
		cardid:5,
		color: "purple",
		direction: -1,
		step: -1,
		flag: true
	}, {
		cardid:6,
		color: "colorful",
		direction: -1,
		step: -1,
		flag: true
	}, {
		cardid:7,
		color: "red",
		direction: -1,
		step: -1,
		flag: true
	}, {
		cardid:8,
		color: "blue",
		direction: -1,
		step: -1,
		flag: true
	}, {
		cardid:9,
		color: "yellow",
		direction: -1,
		step: -1,
		flag: true
	}, {
		cardid:10,
		color: "green",
		direction: -1,
		step: -1,
		flag: true
	}, {
		cardid:11,
		color: "purple",
		direction: -1,
		step: -1,
		flag: true
	}, {
		cardid:12,
		color: "colorful",
		direction: -1,
		step: -1,
		flag: true
	}, {
		cardid:13,
		color: "red",
		direction: 1,
		step: 1,
		flag: true
	}, {
		cardid:14,
		color: "blue",
		direction: 1,
		step: 1,
		flag: true
	}, {
		cardid:15,
		color: "yellow",
		direction: 1,
		step: 1,
		flag: true
	}, {
		cardid:16,
		color: "green",
		direction: 1,
		step: 1,
		flag: true
	}, {
		cardid:17,
		color: "purple",
		direction: 1,
		step: 1,
		flag: true
	}, {
		cardid:18,
		color: "colorful",
		direction: 1,
		step: 1,
		flag: true
	}, {
		cardid:19,
		color: "red",
		direction: 1,
		step: 1,
		flag: true
	}, {
		cardid:20,
		color: "blue",
		direction: 1,
		step: 1,
		flag: true
	}, {
		cardid:21,
		color: "yellow",
		direction: 1,
		step: 1,
		flag: true
	}, {
		cardid:22,
		color: "green",
		direction: 1,
		step: 1,
		flag: true
	}, {
		cardid:23,
		color: "purple",
		direction: 1,
		step: 1,
		flag: true
	}, {
		cardid:24,
		color: "colorful",
		direction: 1,
		step: 1,
		flag: true
	}, {
		cardid:25,
		color: "red",
		direction: 1,
		step: 1,
		flag: true
	}, {
		cardid:26,
		color: "blue",
		direction: 1,
		step: 1,
		flag: true
	}, {
		cardid:27,
		color: "yellow",
		direction: 1,
		step: 1,
		flag: true
	}, {
		cardid:28,
		color: "green",
		direction: 1,
		step: 1,
		flag: true
	}, {
		cardid:29,
		color: "purple",
		direction: 1,
		step: 1,
		flag: true
	}, {
		cardid:30,
		color: "colorful",
		direction: 1,
		step: 1,
		flag: true
	}, {
		cardid:31,
		color: "red",
		direction: 1,
		step: 1,
		flag: true
	}, {
		cardid:32,
		color: "blue",
		direction: 1,
		step: 1,
		flag: true
	}, {
		cardid:33,
		color: "yellow",
		direction: 1,
		step: 1,
		flag: true
	}, {
		cardid:34,
		color: "green",
		direction: 1,
		step: 1,
		flag: true
	}, {
		cardid:35,
		color: "purple",
		direction: 1,
		step: 1,
		flag: true
	}, {
		cardid:36,
		color: "colorful",
		direction: 1,
		step: 1,
		flag: true
	}, {
		cardid:37,
		color: "red",
		direction: 1,
		step: 1,
		flag: true
	}, {
		cardid:38,
		color: "blue",
		direction: 1,
		step: 1,
		flag: true
	}, {
		cardid:39,
		color: "yellow",
		direction: 1,
		step: 1,
		flag: true
	}, {
		cardid:40,
		color: "green",
		direction: 1,
		step: 1,
		flag: true
	}, {
		cardid:41,
		color: "purple",
		direction: 1,
		step: 1,
		flag: true
	}, {
		cardid:42,
		color: "colorful",
		direction: 1,
		step: 1,
		flag: true
	}, {
		cardid:43,
		color: "red",
		direction: 1,
		step: 2,
		flag: true
	}, {
		cardid:44,
		color: "blue",
		direction: 1,
		step: 2,
		flag: true
	}, {
		cardid:45,
		color: "yellow",
		direction: 1,
		step: 2,
		flag: true
	}, {
		cardid:46,
		color: "green",
		direction: 1,
		step: 2,
		flag: true
	}, {
		cardid:47,
		color: "purple",
		direction: 1,
		step: 2,
		flag: true
	}, {
		cardid:48,
		color: "colorful",
		direction: 0,
		step: 1,
		flag: true
	}, {
		cardid:49,
		color: "colorful",
		direction: 0,
		step: 1,
		flag: true
	}, {
		cardid:50,
		color: "colorful",
		direction: 0,
		step: 1,
		flag: true
	}, {
		cardid:51,
		color: "colorful",
		direction: 0,
		step: 2,
		flag: true
	}, {
		cardid:52,
		color: "colorful",
		direction: 0,
		step: 2,
		flag: true
	}];

	this.getCard = function(id) {
		for (var i = cards.length - 1; i >= 0; i--) {
			if (cards[i].cardid == id) {
				return cards[i];
			}
		}
	};

	this.resetCards = function() {
		count = 0;
		for (card in cards) {
			cards[card].flag = true;
		}
		return true;
	};

	var count = 0;
	this.remainCards = true; //牌库还没见底
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