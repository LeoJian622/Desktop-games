var app = angular.module('anApp', ['angular-md5']); //定义angularjs module
app.controller('myCtrl', ['$http', '$scope', '$location','md5', function($http, $scope, $location, md5) { //定义控制器myCtrl 注入$http $scope服务

	$http.defaults.headers.post = {
			'Content-Type': 'application/x-www-form-urlencoded'
		};
	//header配置
	var transformRequestCfg = {
		transformRequest: function(obj) {
			var str = [];
			for (var s in obj) {
				str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
			}
			return str.join("&");
		}
	};

	var userUrl = 'http://localhost:3000/api/user';

	//跳转到主页面   time:2017年11月28日17:10:34 账号验证
	$scope.sure = function() {
		$http.get(userUrl + "/" + $scope.name + "/" + md5.createHash($scope.passwd)).then(function(response) {
			alert(response.data.messages);
			if (response.data.status) {
				$scope.isLogin = response.data.status;
				var url = "mainPage.html?name=" + $scope.name;
				location.href = url;
			} 
		});
	}

	//主页初始数据
	$scope.mainPageInit = function() {
		var myUrl = $location.absUrl();
		$scope.getName = myUrl.split("=")[1];
		$scope.getName = $scope.getName.substring(0, $scope.getName.length - 2);
	};

	//返回主页
	$scope.returnMain = function() {
		var url = "mainPage.html?name=" + $scope.name;
		location.href = url;
	};

	//退出到登陆页
	$scope.out = function() {
		$http.put(userUrl + "/" + $scope.name).then(function(response) {
			alert(response.data.messages);
			if (!response.data.status) {
				$scope.isLogin = response.data.status;
				var url = "login.html";
				location.href = url; 
			} 
		});
	};

	//到用户主页
	$scope.goUser = function() {
		var url = "user.html?name=" + $scope.name;
		location.href = url;
	};

	//到游戏页
	$scope.goGame = function(item) {
		var url = item.url + "?name=" + $scope.getName;
		location.href = url;
	};

	//跳转到注册页面
	$scope.registered = function() {
		var url = "registered.html";
		location.href = url;
	};


	//注册用户
	$scope.registeredIt = function() {
		var form = {
			"username": $scope.rename,
			"password": md5.createHash($scope.repasswd),
			"tell": $scope.retell
		};
		$http.post(userUrl, form, transformRequestCfg).then(function(response) {
			alert(response.data.messages);
			if (response.data.status) {
				$scope.name = $scope.rename;
				var url = "mainPage.html?name=" + $scope.tell;
				location.href = url;
			}
		});
	};

	$scope.show = [{
		name: "跑跑龟",
		url: "paopaogui.html",
		photo: "test1"
	}];



}]);
