const app=require('express')();
const server=require('http').createServer(app);
const io=require('socket.io')(server, { cors: { origin: "*", methods: ["GET", "POST"] } })
let off=0;
let ans=0;
let clients=0;

const path = require('path');


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


io.on('connection',(socket)=>{clients++;
    
console.log('client connected',clients,ans,off)
socket.broadcast.emit('new','time to offer')
socket.on('offer',(offer)=>{
    if(off===0){
        console.log('offer recieved')
    socket.broadcast.emit('offer',offer)
    off++;
    }
})
socket.on('answer',(answer)=>{
    if(ans===0){
        console.log('answer recieved')
    socket.broadcast.emit('answer',answer)
    ans++;
    }
})
socket.on('disconnect',()=>{clients--;
    console.log('client disconnected',clients,off,ans)
    
    if(clients===0){
        off=0;
        ans=0;
    }
})
}) 
server.listen(3000)
