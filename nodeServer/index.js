//node server which will handle socket.io connection
var port = process.env.PORT || 5000
var io = require('socket.io')(port,{
    cors:{
        origin: '*'
    }
});
const users = {};
io.on('connection',socket=>{
    socket.on('new-user-joined',name=>{
        console.log("new user",name)
        users[socket.id] = name; 
        
        socket.broadcast.emit('user-joined',name);
    });
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]})
    });
    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });
})

