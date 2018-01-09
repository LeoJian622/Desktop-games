var fs = require('fs');

function users() {
	
	var filepath = 'app/data/';
	var filename = 'user.json';

	var users = JSON.parse(fs.readFileSync(filepath + filename));

	//user  authentication
	this.authenticationUser = function(data) {
		returnData = {
			messages:'用户名不存在！',
			status:false
		};
		for (var i in users) {
			if (data.username == users[i].username) {
				if (data.password == users[i].password) {
					 if (!users[i].online) {
					 	users[i].online = true;
					 	returnData.messages = '登录成功';
					 	returnData.status = true;
					 } else {
					 	returnData.messages = '用户已登录!'
					 }
				} else {
					returnData.messages = '密码错误！';
				}
			}
		}
		return returnData;
	};

	//register 
	this.addUser = function(data) {
		for (var i in users) {
			if (data.username == users[i].username) {
				return {
					messages: '用户名已被注册！',
					status: false,
				};
			}
		}
		data.online = false;
		users.push(data);
		fs.writeFileSync(filepath + filename, JSON.stringify(users, null, 4));
		users[users.length - 1].online = true;
		return {
			messages: '注册成功！',
			status: true,
		};
	}

	//loginout
	this.loginout = function(data){
		console.log(data);
		for (var i in users) {
			if (data.username == users[i].username) {
				users[i].online = false;
				return {
					messages: '账号已退出！',
					status: false,
				};
			}
		}
	};
}


module.exports = users;
