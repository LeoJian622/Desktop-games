function users() {
	var users = [{
		user: 'tgame1',
		pwd: 'tgame1',
		online: false
	}, {
		user: 'tgame2',
		pwd: 'tgame2',
		online: false
	}, {
		user: 'tgame3',
		pwd: 'tgame3',
		online: false
	}, {
		user: 'tgame4',
		pwd: 'tgame4',
		online: false
	}, {
		user: 'tgame5',
		pwd: 'tgame5',
		online: false
	}, {
		user: 'tgame6',
		pwd: 'tgame6',
		online: false
	}, {
		user: 'tgame7',
		pwd: 'tgame7',
		online: false
	}, {
		user: 'tgame8',
		pwd: 'tgame8',
		online: false
	}, {
		user: 'tgame9',
		pwd: 'tgame9',
		online: false
	}, {
		user: 'tgame10',
		pwd: 'tgame10',
		online: false
	}, {
		user: 'tgame11',
		pwd: 'tgame11',
		online: false
	}, {
		user: 'tgame12',
		pwd: 'tgame12',
		online: false
	}, {
		user: 'tgame13',
		pwd: 'tgame13',
		online: false
	}, {
		user: 'tgame14',
		pwd: 'tgame14',
		online: false
	}, {
		user: 'tgame15',
		pwd: 'tgame15',
		online: false
	}, {
		user: 'tgame16',
		pwd: 'tgame16',
		online: false
	}, {
		user: 'tgame17',
		pwd: 'tgame17',
		online: false
	}, {
		user: 'tgame18',
		pwd: 'tgame18',
		online: false
	}, {
		user: 'tgame19',
		pwd: 'tgame19',
		online: false
	}];
	this.Authentication = function(req) {
		for (var index in users) {
			if (req.body.user == users[index].user && req.body.pwd == users[index].pwd && !users[index].online) {
				return true;
			}
		}
		return false;
	}
}

module.exports = users;