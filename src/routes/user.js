const express = require('express');
const userRouter = express.Router();
const pool = require('../services/database');
var MongoClient = require('mongodb').MongoClient;
userRouter.get('', async(req, res) => {
    if (req.session.user === undefined)
        return res.render('login', { loginErr: 'You need to login to continue' });
    await MongoClient.connect(process.env.DBURI, function(err, db) {
        if (err) throw err;
        var dbo = db.db(process.env.DATABASE);

        dbo.collection("users").find({}).toArray(function(err, result) {
            if (err) {
                db.close();
                throw err;
            }
            db.close();
            var data = [];
            if (result.length > 0) {
                result.forEach(element => {
                    var temp = {
                        name: element.name,
                        id: element.id,
                        email: element.email,
                        password: element.password,
                        coin: element.coins,
                        online: element.online,
                    };
                    data.push(temp);
                });
                console.log(data);
            }
            res.render('user',{data:data});
            return;
        });
    });
    /*
    pool.query("SELECT * FROM `user`", (err, rows, fields) => {
        if (err) {
            console.log(err);
            return;
        }
        var data = [];
        if (rows.length > 0) {
            rows.forEach(element => {
                var temp = {
                    name: element.name,
                    id: element.id,
                    email: element.email,
                    password: element.password,
                    coin: element.coins,
                    online: element.online,
                };
                data.push(temp);
            });
            console.log(data);
        }
        res.render('user',{data:data});
        return;
    });*/
});

module.exports = userRouter;