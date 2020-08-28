const mysql = require('mysql');

// Generate unique id
function randomStr(strLength) {
    const chars = [...'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' ];
    return [...Array(strLength) ]
    .map(() => chars[Math.trunc(Math.random() * chars.length)])
    .join('');
}


function uid(options = {}) {

    const now = String(Date.now());
    const middlePos = Math.ceil(now.length / 2);
    let output = `${now.substr(0, middlePos)}-${randomStr(6)}-${now.substr(middlePos)}`;
    // We add a 3 letter CODE in front of the id to make it more recognizable
    if (options.prefix) output = `${options.prefix}-${output}`;
    return output;
}

// function call: uid({ prefix: 'IND' });

// CREATE TABLE `sampleexpressdb`.`users` (
//     `idusers` VARCHAR(25) NOT NULL,
//     `username` VARCHAR(45) NULL,
//     `password` VARCHAR(45) NULL,
//     PRIMARY KEY (`idusers`));
  

//mysqlconnection
const mysqlConnection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Beepboop@007",
    database:"sampleexpressdb",
    multipleStatements: false
});

mysqlConnection.connect((err) => {
    if(!err){
        console.log("Success");
    }
    else{
        console.log(err);
    }
});

exports.dbconnection = mysqlConnection;
exports.uid = uid;


