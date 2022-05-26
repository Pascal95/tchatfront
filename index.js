const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.get('/',(req,res) =>{
    res.sendFile(`${__dirname}/public/index.html`)

})

io.on('connection',(socket) => {
    console.log('un utilisateur s\'est connecté');

    socket.on("disconnect",() =>{
        console.log('un utilisateur s\'est deco')
    })
    socket.on("chat message",(msg) =>{
        io.emit("chat message",msg)
    })
})


server.listen(8000,() =>{
    console.log('Ecoute du port')
})