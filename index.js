const express = require('express')
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const path = require('path');
const bodyparser = require('body-parser');
const session = require('express-session');
const {v4:uuidv4} = require('uuid');
const router = require('./router')

app.set('view engine', 'ejs');

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

app.use(session({
    secret:uuidv4(),
    resave:false,
    saveUninitialized:true
}));

//route
app.get('/',(req,res) =>{
    res.sendFile(`${__dirname}/public/index.html`)

})

app.get('/connect',(req,res)=> {
    res.render('login',{title: "Login"})
})

app.use('/route', router)

//load static asset
app.use('/static',express.static(path.join(__dirname,'public')))
app.use('/assets',express.static(path.join(__dirname,'public/assets')))


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