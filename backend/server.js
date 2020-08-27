require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');

const jwt = require('jsonwebtoken')

app.use(express.json())

app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );


app.get('/home',authenticateToken,(req,res) => {
    // console.log(req);
    res.json(users.filter(users => users.name === req.user.name));
})

app.post('/login',(req,res) => {
    //Authenticate user

    const username = req.body.name;
    const pwd = req.body.password;
    const user  = {"name": username,"password":pwd,"success":true};

    const accessToken = generateAccessToken(user);
    // const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
    console.log("accessToken "+accessToken);
    console.log("data from front end "+JSON.stringify(user));
    const response = {accesstoken:accessToken};
    console.log(response);
    res.json(response);
})

function generateAccessToken(user){
    // return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET,{expiresIn : "15m"});
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
}


function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization'];
    const token  = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401)

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user) => {
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    })

}



app.listen(8000,function () {
    console.log("Server is running");
})