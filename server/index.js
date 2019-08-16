const path = require('path')
const app = require("express")()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/index.html'))
});

io.on('connection', function(socket){
  console.log('a user connected')
  socket.on('emit-client', function(msg){
    console.log('message: ' + msg);
    io.emit('emit-server', msg);
  });
  // socket.on('disconnect', function () {
  //   console.log('user disconnected')
  // })
})

http.listen(1111, () => {
  console.log('Server listening on http://127.0.0.1:1111')
})