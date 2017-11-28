var app = angular.module('ppgApp', []);	
app.controller('paopaoguiCtrl', [ '$http', '$scope', '$location', '$anchorScroll', function( $http, $scope, $location, $anchorScroll) {	
	
	//返回主页
	$scope.returnMain = function() {
		var url = "mainPage.html?name=" + $scope.name;
		location.href = url;
	};
	
	//初始数据
	$scope.init = function() {
		var myUrl = $location.absUrl();
		$scope.getName = myUrl.split("=")[1];//获得名字
		$scope.getName = $scope.getName.substring(0,$scope.getName.length - 2);//不明bug，名字会自动带些奇怪的东西
		
		$scope.showChoose = false;//初始隐藏颜色选择界面
		$scope.playsNum = 99;//在线人数
		$scope.winPower = 50;//胜率
		$scope.tortoiseColor = [//乌龟颜色记录
				"red",
				"yellow",
				"blue",
				"green",
				"purple",
				"pink",
		];
		$scope.tortoise = {//乌龟当前行记录
				red : 30,
				yellow : 30,
				blue : 30,
				green : 30,
				purple : 30,
				pink : 30
		};
		$scope.tortoiseIn = {//乌龟当前格记录
				red : 0,
				yellow : 1,
				blue : 2,
				green : 3,
				purple : 4,
				pink : 5
		};
		$scope.tortoiseDie = {//乌龟当前层记录
				red : 0,
				yellow : 0,
				blue : 0,
				green : 0,
				purple : 0,
				pink : 0
		};
		$scope.show = [];
		for(var i=0; i<30; i++) {
			$scope.show.push({id:i,inChoose:false});
		}
		$scope.show.push(
		               {id:30,inChoose:false,tortoise:[
		                          {all:[{name:"red",photo:"test1"}]},
		                          {all:[{name:"yellow",photo:"test2"}]},
		                          {all:[{name:"blue",photo:"test3"}]},
		                          {all:[{name:"green",photo:"test4"}]},
		                          {all:[{name:"purple",photo:"test5"}]},
		                          {all:[{name:"pink",photo:"test6"}]}
		                          ]}
		               );//行初始信息记录
		$scope.cardIn = $scope.cards;//将卡牌信息复制，便于删除
		$scope.card = [];
		for(var i=0; i<4 ;i++) {
			$scope.getCard();
		}//起始手牌4张
		$scope.player = [
					{name:"red",photo:"test1"},
					{name:"yellow",photo:"test2"},
					{name:"blue",photo:"test3"},
					{name:"green",photo:"test4"},
                    {name:"purple",photo:"test5"},
                    {name:"pink",photo:"test6"}
		               ];//玩家
	};
	
	//对象深拷贝,js中数组、对象无法通过等于直接拷贝，等于为浅拷贝，改变其中一个会影响另一个
	$scope.objDeepCopy = function (source) { 
	    var sourceCopy = source instanceof Array ? [] : {};
	    for (var item in source) {
	        sourceCopy[item] = typeof source[item] === 'object' ? $scope.objDeepCopy(source[item]) : source[item];
	    }
	    return sourceCopy;
	}
	
	//colorful选择颜色事件
	$scope.chooseIt = function(item) {
		$scope.showChoose = false;//关闭颜色选择框
		$scope.item.color = item;//改变卡牌颜色
		$scope.actionCard($scope.item, $scope.ind);//代入使用卡牌事件
	};
	
	//在使用卡牌时。哦，在这停顿一下
	$scope.actionStop = function(item, index) {
		if(item.color == "colorful") {
			alert("请点击按钮选择你要移动的乌龟");
			$scope.showChoose = true;//开启颜色选择框
			$scope.item = item;//记录卡牌属性
			$scope.ind = index;//记录卡牌位置
		}
		else {
			$scope.actionCard(item, index);
		}
	};
	
	$scope.actionCard = function(item, index) {//点击卡牌事件
		var line = $scope.tortoise[item.color];//根据卡牌所说颜色找到该乌龟当前行
		var ge = $scope.tortoiseIn[item.color];//根据卡牌所说颜色找到该乌龟当前格
		var ceng = $scope.tortoiseDie[item.color];//根据卡牌所说颜色找到该乌龟当前层
		$scope.newLine = line - item.step;//计算移动到的行
		if($scope.newLine > 30) {//初始格不允许后退
			alert("闭嘴！不准后退！");
		}
		else {
			if($scope.newLine < 0) {//胜利
				alert("you win!" + item.color);
			}
			else {
				$scope.inAction = $scope.objDeepCopy($scope.show[line].tortoise[ge]);//要移动的乌龟列表
				if(ceng != 0) {//如果不是最底下那只，删掉底下其他乌龟
					$scope.inAction.splice(0,ceng);
				}
				$scope.show[line].tortoise[ge].all.splice(ceng,6-ceng);//删除原格子乌龟
				for(var i=ceng; i<6; i++) {//补至6格
					$scope.show[line].tortoise[ge].all.push({});
				}
				if($scope.inAction.all.length < 6) {//当记录下的乌龟不足6只
					for(var i=$scope.inAction.all.length; i<6; i++) {//补至6格
						$scope.inAction.all.push({});
					}
				}
				
				$scope.tortoise[item.color] = $scope.newLine;//更新该颜色乌龟行数
	
				if($scope.show[$scope.newLine].tortoise == undefined) {//判断新行是否有格子，如果没有，则创建6个空格
					$scope.show[$scope.newLine].tortoise = [];
					for(var i=0; i<6; i++) {
						$scope.show[$scope.newLine].tortoise.push({all:[]});
					}
				}
				alert("请点击你要到的格子，空格则单独，有龟则叠置。");
				$scope.show[$scope.newLine].inChoose = true;//开启允许点击
				
				$scope.card.splice(index,1);//卡牌删除
				$scope.getCard();//获得新卡牌
			}
			var topLine = 24;//滚动判断
			if($scope.newLine < 3) {
				topLine = 0;
			}
			else if($scope.newLine > 24) {
				topLine = 24;
			}
			else {
				topLine = $scope.newLine - 3;
			}
			$location.hash(topLine + "");//滚动位置固定
			$anchorScroll();
		}
	};
	
	$scope.choose = function(item, n) {
		if(!item.inChoose) {
			alert("不是这一行，童鞋！");
		}
		else {
			$scope.tortoiseIn[$scope.inAction.all[0].name] = n;//更新该颜色乌龟格数
			if($scope.show[$scope.newLine].tortoise[n].all.length == 0 || $scope.show[$scope.newLine].tortoise[n].all[0].name == undefined) {//如果要去的格子没有乌龟存在
				$scope.show[$scope.newLine].tortoise[n] = $scope.objDeepCopy($scope.inAction);
			}
			else {
				for(var i=0; i<6; i++) {//找到还没被其他乌龟占领的层数
					if($scope.show[$scope.newLine].tortoise[n].all[i] == [] || $scope.show[$scope.newLine].tortoise[n].all[i].name == undefined) {
						var inIt = i;
						break;
					}
				}
				for(var i=inIt; i<6; i++) {//骑上去
					$scope.show[$scope.newLine].tortoise[n].all[i] = $scope.inAction.all[i-inIt];
				}
				$scope.tortoiseDie[$scope.inAction.all[0].name] = inIt;//更新该颜色乌龟层数
			}
			$scope.show[$scope.newLine].inChoose = false;//颜色提醒关闭
		}
	};
	
	//抽取手牌
	$scope.getCard = function() {
		if($scope.cardIn.length > 0) {//判断牌库数量
			var num = Math.floor(Math.random() * $scope.cardIn.length);//随机抽取
			$scope.card.push($scope.cardIn[num]);//加入手牌
			$scope.cardIn.splice(num, 1);//从牌库中删除
		}
		else {
			alert("牌库已空。");
		}
	};
	
	
	
	$scope.cards = [{
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
	

} ]);

app.filter('reverse', function() {//数组倒序
    return function(items) {
        return items.slice().reverse();
    };
});