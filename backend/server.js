require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const connection = require('./DBconnect');

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

app.post('/signup',(req,res) =>{
    const username = req.body.email;
    const pwd = req.body.password;
    
    const idgenerated = connection.uid({prefix:"IND"});
    const db = connection.dbconnection;
    const saltRounds = 10;

    bcrypt.hash(pwd,saltRounds,function (err,hash) {
        if(err) throw err;
        console.log(hash);
        console.log(pwd);
        console.log(idgenerated);

        db.query('INSERT INTO users (idusers,username,password) VALUES (?, ?, ?)', [idgenerated,username,hash],function (err,results,fields) {
            if(err) throw err;

            res.json({success:true});
        })
        // res.json({success:true});
    });


})

app.post('/login',(req,res) => {
    //Authenticate user

    const username = req.body.name;
    const pwd = req.body.password;
    const user  = {"name": username,"password":pwd,"success":true};

    const db = connection.dbconnection;

    db.query("SELECT password from users where username = ?",[username],function(err,results,fields){
        
        if(err) throw err;

        if(results.length === 0) {
            //throw error
        }
        
        else{
        dbpassword = results[0].password.toString();
            bcrypt.compare(pwd, dbpassword).then(function(result) {
                if(result){
                    res.json({success:true});
                }
                else{
                    console.log(pwd);
                }
            });
        }
    })

        
    

    // const accessToken = generateAccessToken(user);
    // const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
    // console.log("accessToken "+accessToken);
    // const response = {accesstoken:accessToken}; 
    // console.log(response);
    // res.json(response);
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

