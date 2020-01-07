var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
// socket의 HTTP통신을 통하여 작동하기 때문에 HTTP를 매개변수로 넣어준다.
io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' })
// 이벤트를 작성해준다.


// 해당 요청이 오면 index.html을 보여준다.
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
})
// Sochet.io의 인스턴스가 HTTP서버 객체를 통해서 전달되며
// io.on('connection')의 이벤트를 작성해준다.
io.on('connection', function (socket) {
    // socket.broadcast.emit('hi');
    // 이벤트를 전체적으로 보내주려면 broadcast를 사용한다.
    socket.on('chat message', function (msg) {
        // 소켓을 통해 들어온 이벤트 중에 chat message가 있으면 콜백함수가 실행된다.
        io.emit('chat message', msg);
        // 소켓을 통해 받아온 메세지를 보낸다

    })
});
// 노드 서버를 실행해준다.
http.listen(3000, function () {
    console.log('listening on *3000')
})