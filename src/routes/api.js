const express = require('express');
const apiRouter = express.Router();
const mysql = require('mysql');
var MongoClient = require('mongodb').MongoClient;
const pool = require('../services/database');

apiRouter.get('/user', async(req, res) => {
    await MongoClient.connect(process.env.DBURI, function(err, db) {
        if (err) throw err;
        var dbo = db.db(process.env.DATABASE);

        dbo.collection("users").find({}).toArray(function(err, result) {
            if (err) {
                db.close();
                return console.log(err);
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
                        googleid: element.googleid,
                        appleid: element.appleid,
                        guestid: element.guestid,
                        country: element.country,
                        deviceid: element.deviceid,
                        image: element.image,
                        totalplay: element.totalplay,
                        totalwin: element.totalwin,
                        totalfail: element.totalfail
                    };
                    data.push(temp);
                });
                res.status(200).send({ code: 200, message: "done", data: data });
            } else {
                res.status(404).send({ code: 404, message: "No user found in database", data: null });
            }
            return;
        });
    });
    /*
    pool.query("SELECT * FROM `user`",(err,rows,fields)=>{
        if(err)
        {
            console.log(err);
            res.status(500).send("Error in connecting to database.");
            return;
        }
        if(rows.length > 0){
            var data = [];
            rows.forEach(element => {
                var temp = {
                    name:element.name,
                    id:element.id,
                    email:element.email,
                    password:element.password,
                    coin:element.coins,
                    online:element.online,
                    googleid:element.googleid,
                    appleid:element.appleid,
                    guestid:element.guestid,
                    country:element.country,
                    deviceid:element.deviceid,
                    image:element.image,
                    totalplay:element.totalplay,
                    totalwin:element.totalwin,
                    totalfail:element.totalfail
                };
                data.push(temp);
            });
            res.status(200).send({code:200,message:"done",data:data});
        }
        else{
            res.status(404).send({code:404,message:"No user found in database",data:null});
        }
        return;
    });*/
});
apiRouter.get('/user/:name', async(req, res) => {
    await MongoClient.connect(process.env.DBURI, function(err, db) {
        if (err) throw err;
        var dbo = db.db(process.env.DATABASE);

        dbo.collection("users").find({ name: req.params.name }).toArray(function(err, result) {
            if (err) {
                db.close();
                console.log(err);
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
                        googleid: element.googleid,
                        appleid: element.appleid,
                        guestid: element.guestid,
                        country: element.country,
                        deviceid: element.deviceid,
                        image: element.image,
                        totalplay: element.totalplay,
                        totalwin: element.totalwin,
                        totalfail: element.totalfail
                    };
                    data.push(temp);
                });
                res.status(200).send({ code: 200, message: "Done!", data: data });
            } else {
                res.status(404).send({ code: 404, message: "No user found in database", data: null });
            }
            return;
        });
    });
    /*pool.query("SELECT * FROM `user` WHERE name=?",[req.params.name],(err,rows,fields)=>{
        if(err)
        {
            console.log(err);
            res.status(500).send({code:500,message:"Error connecting to database",data:null});
            return;
        }
        if(rows.length > 0){
            var data = [];
            rows.forEach(element => {
                var temp = {
                    name:element.name,
                    id:element.id,
                    email:element.email,
                    password:element.password,
                    coin:element.coins,
                    online:element.online,
                    googleid:element.googleid,
                    appleid:element.appleid,
                    guestid:element.guestid,
                    country:element.country,
                    deviceid:element.deviceid,
                    image:element.image,
                    totalplay:element.totalplay,
                    totalwin:element.totalwin,
                    totalfail:element.totalfail
                };
                data.push(temp);
            });
            res.status(200).send({code:200,message:"Done!",data:data});
        }
        else{
            res.status(404).send({code:404,message:"No user found in database",data:null});
        }
        return;
    });*/
});
apiRouter.delete('/user/:name', async(req, res) => {
    await MongoClient.connect(process.env.DBURI, function(err, db) {
        if (err) throw err;
        var dbo = db.db(process.env.DATABASE);

        dbo.collection("users").deleteOne({ name: req.params.name }, function(err, result) {
            if (err) {
                db.close();
                res.status(500).send({ code: 500, message: "Error connecting to database", data: null });
                throw err;
            }
            db.close();
            var data = [];
            if (result.deletedCount > 0) {
                res.status(200).send({ code: 200, message: "User has been removed from database", data: { name: req.params.name } });
            } else {
                res.status(404).send({ code: 404, message: "No user found in database", data: null });
            }
            return;
        });
    });
    /*
    pool.query("SELECT * FROM `user` WHERE name=?",[req.params.name],(err,rows,fields)=>{
        if(err)
        {
            console.log(err);
            res.status(500).send({code:500,message:"Error connecting to database",data:null});
            return;
        }
        if(rows.length > 0){
            pool.query("DELETE FROM `user` WHERE name=?",[req.params.name],(err,rows,fields)=>{
                if(err)
                {
                    console.log(err);
                    res.status(500).send({code:500,message:"Error connecting to database",data:null});
                    return;
                }
                res.status(200).send({code:200,message:"User has been removed from database",data:{name:req.params.name}});
                return;
            });
        }
        else{
            res.status(404).send({code:404,message:"No user found in database",data:null});
            return;
        }
        return;
    });*/
});
apiRouter.post('/user', async(req, res) => {

    var temp = {
        name: (req.body.name) ? req.body.name : null,
        email: (req.body.email) ? req.body.email : null,
        password: (req.body.password) ? req.body.password : null,
        coins: (req.body.coin) ? req.body.coin : null,
        online: (req.body.online) ? req.body.online : null,
        googleid: (req.body.googleid) ? req.body.googleid : null,
        appleid: (req.body.appleid) ? req.body.appleid : null,
        guestid: (req.body.guestid) ? req.body.guestid : null,
        country: (req.body.country) ? req.body.country : null,
        deviceid: (req.body.deviceid) ? req.body.deviceid : null,
        image: (req.body.image) ? req.body.image : null,
        totalplay: (req.body.totalplay) ? req.body.totalplay : null,
        totalwin: (req.body.totalwin) ? req.body.totalwin : null,
        totalfail: (req.body.totalfail) ? req.body.totalfail : null
    };
    await MongoClient.connect(process.env.DBURI, function(err, db) {
        if (err) throw err;
        var dbo = db.db(process.env.DATABASE);

        dbo.collection("users").insertOne(temp, function(err, result) {
            if (err) {
                db.close();
                res.status(500).send({ code: 500, message: "Error connecting to database", data: null });
                return console.log(err);
            }
            db.close();
            if (result.insertedCount > 0) {
                res.status(201).send({ code: 201, message: "New user has been added to database", data: temp });
            } else {
                res.status(404).send({ code: 404, message: "Unable to insert user", data: temp });
            }
            return;
        });
    });
    /*
    pool.query("INSERT INTO `user` (`name`,`email`,`password`,`coins`,`online`,`googleid`,`appleid`,`guestid`,`country`,`deviceid`,`image`,`totalplay`,`totalwin`,`totalfail`) \
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)\
    ",[temp.name,temp.email,temp.password,temp.coins,temp.online,temp.googleid,temp.appleid,temp.guestid,temp.country,temp.deviceid,temp.image,temp.totalplay,temp.totalwin,temp.totalfail],(err,rows,fields)=>{
        if(err){
            console.log(err);
            res.status(500).send({code:500,message:"Error connecting to database",data:null});
            return;
        }
        res.status(201).send({code:201,message:"New user has been added to database",data:temp});
    });*/
});
apiRouter.put('/user', async(req, res) => {
    if (req.body.user) {
        await MongoClient.connect(process.env.DBURI, function(err, db) {
            if (err) throw err;
            var dbo = db.db(process.env.DATABASE);

            dbo.collection("users").findeOne({

                "$or": [{
                    "name": req.body.name,
                }, {
                    "email": req.body.email
                }]
            }, function(err, result) {
                if (err) {
                    db.close();
                    res.status(500).send({ code: 500, message: "Error connecting to database", data: null });
                    return console.log(err);
                }
                db.close();
                if (result !== null) {
                    var tempQ = {};
                    if (req.body.name)
                        tempQ.name = mysql.escape(req.body.name);
                    if (req.body.email)
                        tempQ.email = mysql.escape(req.body.email);
                    if (req.body.password)
                        tempQ.password = mysql.escape(req.body.password);
                    if (req.body.coin)
                        tempQ.coin = mysql.escape(req.body.coin);
                    if (req.body.online)
                        tempQ.online = mysql.escape(req.body.online);
                    if (req.body.googleid)
                        tempQ.googleid = mysql.escape(req.body.googleid);
                    if (req.body.appleid)
                        tempQ.appleid = mysql.escape(req.body.appleid);
                    if (req.body.guestid)
                        tempQ.guestid = mysql.escape(req.body.guestid);
                    if (req.body.country)
                        tempQ.country = mysql.escape(req.body.country);
                    if (req.body.deviceid)
                        tempQ.deviceid = mysql.escape(req.body.deviceid);
                    if (req.body.totalfail)
                        tempQ.totalfail = mysql.escape(req.body.totalfail);
                    if (req.body.totalplay)
                        tempQ.totalplay = mysql.escape(req.body.totalplay);
                    if (req.body.totalwin)
                        tempQ.totalwin = mysql.escape(req.body.totalwin);
                    if (req.body.image)
                        tempQ.image = mysql.escape(req.body.image);
                    if (tempQ == null) {
                        res.status(204).send({ code: 204, message: "Method is not alowed", data: null });
                        return;
                    }
                    res.status(201).send({ code: 201, message: "User has been updated", data: temp });
                } else {
                    res.status(404).send({ code: 404, message: "Unable to find user", data: temp });
                }
                return;
            });
        });
        /*
        pool.query("SELECT * FROM `user` WHERE name=? OR email=?", [req.body.user, req.body.user], (err, rows, fields) => {
            if (err) {
                console.log(err);
                res.status(500).send({ code: 500, message: "Error connecting to database", data: null });
                return;
            }
            if (rows.length > 0) {

                console.log(tempQ);
                tempQ = tempQ.slice(0, -1);
                console.log(tempQ);
                var sqlQuery = "UPDATE `user` SET " + tempQ + " WHERE name=? OR email=?";
                console.log(sqlQuery);
                pool.query(sqlQuery, [req.body.user, req.body.user], (err, rows, fields) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send({ code: 500, message: "Error connecting to database", data: null });
                        return;
                    }
                    res.status(201).send({ code: 201, message: "User has been updated", data: null });
                });
            } else {
                res.status(404).send({ code: 404, message: "No user found in database.", data: null });
            }
        });*/
    } else {
        res.status(400).send({ code: 400, message: "Method is not alowed", data: null });
    }
});

module.exports = apiRouter;