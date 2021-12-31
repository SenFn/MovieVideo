var path = require("path");
var express = require("express");
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = 3000;

//Chỉ ra đường dẫn chứa css, js, images...
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', __dirname + '/views');;
app.set('view engine', 'html');
//Tạo router
app.get("/", function (req, res) {
    res.redirect(`/default/user`);
});

app.get("/:idRoom/:userName", function (req, res) {
    var room = req.params.idRoom;
    var user = req.params.userName;
    console.log(room +"|"+ user)
    res.render(path.join(__dirname , "/views/chat.html"), {room:room, user: user});
});

//Tạo socket 
io.on('connection', function (socket) {
    socket.on('send', function (data) {
        console.log(data)
        io.sockets.emit('send', data);
    });
});


server.listen(port, () => {
    console.log(`Listening on ${port}!`);
});