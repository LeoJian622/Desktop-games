var app = angular.module('anApp', []); //定义angularjs module
app.controller('myCtrl', ['$http', '$scope', '$location', function($http, $scope, $location) { //定义控制器myCtrl 注入$http $scope服务

	//	$scope.url = "http://localhost:3000";	//写入连接端口
	//	$http.get(url).then(function(response) {	//调用$http服务获取端口传输文件
	//		$scope.sel = response.data;	//获取返回的json并赋值给$scope.sel
	//	}, function(errResponse) {	//当取值失败时
	//		alert("error");
	//	});

	//跳转到主页面   time:2017年11月28日17:10:34 账号验证
	$scope.sure = function() {
		var form = {
			username: $scope.name,
			password: $scope.passwd
		};
		var postCfg = {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			transformRequest: function(obj) {
				var str = [];
				for (var s in obj) {
					str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
				}
				return str.join("&");
			}
		};
		$http.post('/api/user', form, postCfg).then(function(response) {
			$scope.isLogin = response.data;
			if (response.data.status) {
				var url = "mainPage.html?name=" + $scope.name;
				location.href = url;
			} else {
				alert("账号或密码错误！");
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
		var url = "login.html";
		location.href = url;
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
			"password": $scope.repasswd,
			"tell": $scope.retell
		};
		$http.post($scope.url, form).then(function(response) {
			alert("注册成功！");
			$scope.name = $scope.rename;
			var url = "mainPage.html?name=" + $scope.name;
			location.href = url;
		});
	};

	$scope.show = [{
		name: "跑跑龟",
		url: "paopaogui.html",
		photo: "test1"
	}];



}]);
