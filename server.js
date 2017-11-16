var express = require('express'); //引入express框架
var app = express(); //声明express框架入口
var path = require('path'); //引入path模块，处理路径
var port = process.env.PORT || 3000; //定义监听接口，指定或者默认3000

app.use('/static', express.static(path.join(__dirname, '/public'))); //采用中间件，在请求的url存在'/static'时，访问public目录下的静态资源

app.use(function(req, res) { //访问非静态资源返回的文件
	res.sendFile(path.join(__dirname, '/public/index.html'));
});

var server = app.listen(port, function() { //启动服务器
	console.log('TechNode  is on port ' + port + '!');
});

var io = require('socket.io').listen(server); //引入’'socket.io' 并对服务器端口进行监听  声明为 io

var linkCount = 0; //统计链接数
var messages = []; //用于保存聊天消息

io.sockets.on('connection', function(socket) { //给sockets注册'connection'事件
	linkCount++;
	console.log('socket is connectioned,total:' + linkCount);
	socket.on('messages.read', function() { //socket注册读取消息事件'messages.read'
		console.log('messages.read');
		socket.emit('messages.read', messages); //发射'messages.read' 传递参数messages
	});
	socket.on('messages.create', function(message) { //socket注册读取消息事件'messages.create'
		messages.push(message); //把收到message保存到messages
		console.log('messages.create');
		io.sockets.emit('messages.add', message); //发射'messages.add' 传递参数messages
	});
	socket.on('disconnect', function() {//给sockets注册'disconnect'事件
		linkCount--;
		console.log('socket is disconnected,total:' + linkCount);
	});
});