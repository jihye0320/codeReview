const express = require('express');
const app = express();

//app을 http에 연결시키고, http를 다시 socket.io에 연결
//socket.io가 express를 직접 받아들이지 못하기 때문에
//socket.io는 io라는 
const http = require('http').Server(app);
const io = require('socket.io')(http);


//모든 request는 client.html 을 response 하도록 설정
app.get('/',function(req, res){
  res.sendFile(__dirname + '/client.html');
});

let count=1;
io.on('connection', function(socket){
  console.log('user connected: ', socket.id);
  const name = "user" + count++;
  io.to(socket.id).emit('change name',name);

  socket.on('disconnect', function(){
    console.log('user disconnected: ', socket.id);
  });

  socket.on('send message', function(name,text){
    const msg = name + ' : ' + text;
    console.log(msg);
    //모든 클라이언트들에게 event 전달
    io.emit('receive message', msg);
  });
});

//app.listen이 아니라 http.listen이다.
http.listen(3002, function(){
  console.log('server on!');
});
