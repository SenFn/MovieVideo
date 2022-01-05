$(function () {
    //Kết nối tới server socket đang lắng nghe    
    var socket = io.connect('http://20.192.4.125:3000');

    //Socket nhận data và append vào giao diện
    socket.on("send", function (data) {
        if(data.room != ROOM) return;
        $("#content").append("<p class='message'>" + data.username + ": " + data.message + "</p>")
    })

    //Bắt sự kiện click gửi message
    $("#sendMessage").click( function () {

        var username = USER;
        var message = $('#message').val();

        if (username == '' || message == '') {
            return;
        } else {
            //Gửi dữ liệu cho socket
            socket.emit('send', {username: USER, message: message, room: ROOM});
            $('#message').val('');
        }
    })
})