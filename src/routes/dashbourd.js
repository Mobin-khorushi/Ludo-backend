const express = require('express');
const dashRouter = express.Router();

dashRouter.get('',async(req,res) => {
    if(req.session.user === undefined)
        return res.render('login',{loginErr:'You need to login to continue'});
    res.render('dashbourd');
});
module.exports = dashRouter;