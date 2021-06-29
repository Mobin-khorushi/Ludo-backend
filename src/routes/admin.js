const express = require('express');
const adminRouter = express.Router();
const pool = require('../services/database');
var MongoClient = require('mongodb').MongoClient;
adminRouter.get('', async(req, res) => {
    if (req.session.user === undefined)
        return res.render('login', { loginErr: 'You need to login to continue' });
    if (req.session.message) {
        return res.render('admin', { user: req.session.user, message: req.session.message });
    }
    res.render('admin', { user: req.session.user });
});
adminRouter.post('/password', async(req, res) => {
    var query = { name: req.session.user };
    var queryUpdate = { password: req.body.password };
    MongoClient.connect(process.env.DBURI, function(err, db) {
        if (err) throw err;
        var dbo = db.db(process.env.DATABASE);
        dbo.collection("admins").updateOne(query, { $set: queryUpdate }, function(err, resu) {
            if (err) throw err;
            db.close();
            if (res && resu) {
                req.session.user = req.body.email;
                req.session.message = "Password changed successfully";
                res.redirect('/dashbourd/admin');
            } else {
                req.session.message = "Could'nt be able to change password";
                res.redirect('/dashbourd/admin');
                return;
            }
            return true;
        });
    });
    if (res) {
        req.session.message = "Password changed successfully";
        res.redirect('/dashbourd/admin');
    } else {
        req.session.message = "Could'nt be able to change password";
        res.redirect('/dashbourd/admin');
        return;
    }
});
adminRouter.post('/email', async(req, res) => {

    var query = { name: req.session.user };
    var queryUpdate = { name: req.body.email };
    MongoClient.connect(process.env.DBURI, function(err, db) {
        if (err) throw err;
        var dbo = db.db(process.env.DATABASE);
        dbo.collection("admins").updateOne(query, { $set: queryUpdate }, function(err, resu) {
            if (err) throw err;
            db.close();
            if (res && resu) {
                req.session.user = req.body.email;
                req.session.message = "Email changed successfully";
                res.redirect('/dashbourd/admin');
            } else {
                req.session.message = "Could'nt be able to change email";
                res.redirect('/dashbourd/admin');
                return;
            }
            return true;
        });
    });
    
});
module.exports = adminRouter;