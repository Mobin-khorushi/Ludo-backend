const express = require('express');

const loginRouter = express.Router();
const logoutRouter = express.Router();
const app = express();
const pool = require('../services/database');
var MongoClient = require('mongodb').MongoClient;
loginRouter.get('', async(req, res) => {
    res.render('login');
});
loginRouter.post('', async(req, res) => {

    var username = req.body.username;
    var password = req.body.password;
    if (username == '') {
        return res.render('login', { loginErr: "Invalid username." });
    }
    if (password == '') {
        return res.render('login', { loginErr: "Invalid password." });
    }
    await MongoClient.connect(process.env.DBURI, function(err, db) {
        if (err) throw err;
        var dbo = db.db(process.env.DATABASE);

        dbo.collection("admins").findOne({ name: username, password: password }, function(err, result) {
            if (err) {
                db.close();
                throw err;
            }
            db.close();

            if (result == null)
                return res.render('login', { loginErr: "User not found" });
            else {
                req.session.user = req.body.username;
                res.redirect('dashbourd');
            }

        });
    });

    /*
    pool.query("SELECT * FROM `admin` WHERE (username=?) AND password =?",[req.body.username,req.body.password], (err,rows,fields)=>{
        if(err)
        {
            console.log(err);
            res.render('login',{loginErr:"Problem with connecting to database."});
            return;
        }
        if(rows.length > 0){
            
            
        }
        else{
            
        }
        
        return;
    });
    */
});
logoutRouter.get('', async(req, res) => {
    req.session.destroy((err) => {
        if (err)
            console.log(err);
        else
            res.redirect('login');
    });
});

module.exports = { loginRouter, logoutRouter };