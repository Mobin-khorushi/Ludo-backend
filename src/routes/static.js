const express = require('express');
const statRouter = express.Router();

statRouter.get('',async(req,res) => {
    if(req.session.user === undefined)
        return res.render('login',{loginErr:'You need to login to continue'});
    
    res.render('static');
});
module.exports = statRouter;