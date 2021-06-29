
const dotenv = require('dotenv');

var MongoClient = require('mongodb').MongoClient;


dotenv.config();

MongoClient.connect(process.env.DBURI, function(err, db) {
    if (err) throw err;
    var dbo = db.db(process.env.DATABASE);
    dbo.listCollections({name: 'users'}).next(function(err, collinfo) {
        if (collinfo) {
            console.log("Synced with <Users-Collection>.")
        }else{
            dbo.createCollection("users", {autoIndexId: true,},function(err, res) {
                if (err) {
                    throw err;
                }
                console.log("Users-Collection created!");
                dbo.collection("users").createIndexes({name:1,email:1},{unique:true},(err,res)=>{
                    if(err){
                        throw err;
                    } 
                });
                dbo.collection("users").createIndexes({password:1,gid:1,appid:1,devid:1,lastlogin:1,country:1,online:1,totalwin:1,totalloss:1,totalgame:1},(err,res)=>{
                    if(err){
                        throw err;
                    }
                });
                
            });
        }
    });
    dbo.listCollections({name: 'admins'}).next(function(err, collinfo) {
        if (collinfo) {
            console.log("Synced with <Admins-Collection>.")
            db.close();

        }else{
            dbo.createCollection("admins", {autoIndexId: true,},function(err, res) {
                if (err) {
                    db.close();
                    throw err;
                }
                console.log("Admins-Collection created!");
                dbo.collection("admins").createIndexes({email:1},{unique:true},(err,res)=>{
                    if(err)
                        throw err;
                });
                dbo.collection("admins").createIndexes({password:1},(err,res)=>{
                    if(err)
                        throw err;
                });
                db.close();
            });
        }
    });

});
async function userExists(name) {
    MongoClient.connect(process.env.DBURI, function(err, db) {
        if (err) throw err;
        var dbo = db.db(process.env.DATABASE);

        dbo.collection("users").findOne({name:name}, function(err, result) {
            if (err) {
                db.close();
                throw err;
            }
            
            db.close();
            return true;
        });


    });
}
async function adminExists(name,pass) {
    await MongoClient.connect(process.env.DBURI, function(err, db) {
        if (err) throw err;
        var dbo = db.db(process.env.DATABASE);

        dbo.collection("admins").findOne({name:name,password:pass}, function(err, result) {
            if (err) {
                db.close();
                throw err;
            }
            db.close();

            if(result == null)
                return  Promise.resolve(false);
            else
                return  Promise.resolve(true);
            
        });
    });
}
async function addUser(obj){
    MongoClient.connect(process.env.DBURI, function(err, db) {
        if (err) throw err;
        var dbo = db.db(process.env.DATABASE);
        dbo.collection("users").insertOne(obj, function(err, res) {
          if (err) throw err;
          
          db.close();
          return true;
        });
      });
}
async function updateAdmin(obj,newObj){

    MongoClient.connect(process.env.DBURI, function(err, db) {
        if (err) throw err;
        var dbo = db.db(process.env.DATABASE);
        dbo.collection("admins").updateOne(obj,{$set:newObj}, function(err, res) {
          if (err) throw err;
          db.close();
          return true;
        });
      });
}
async function updateUser(obj,newObj){

    MongoClient.connect(process.env.DBURI, function(err, db) {
        if (err) throw err;
        var dbo = db.db(process.env.DATABASE);
        dbo.collection("users").updateOne(obj,{$set:newObj}, function(err, res) {
          if (err) throw err;
          db.close();
          return true;
        });
      });
}
async function addAdmin(obj){
    MongoClient.connect(process.env.DBURI, function(err, db) {
        if (err) throw err;
        var dbo = db.db(process.env.DATABASE);
        dbo.collection("admins").insertOne(obj, function(err, res) {
          if (err) throw err;
          
          db.close();
          return true;
        });
      });
}
async function dropAdmin(obj){
    MongoClient.connect(process.env.DBURI, function(err, db) {
        if (err) throw err;
        var dbo = db.db(process.env.DATABASE);
        dbo.collection("admins").deleteOne(obj, function(err, res) {
          if (err) throw err;
          
          db.close();
          return true;
        });
      });
}
async function dropUser(obj) {
    MongoClient.connect(process.env.DBURI, function(err, db) {
        if (err) throw err;
        var dbo = db.db(process.env.DATABASE);
        dbo.collection("users").deleteOne(obj, function(err, res) {
          if (err) throw err;
          db.close();
          return true;
        });
      });
}
module.exports = {userExists,addUser,addAdmin,updateAdmin,updateUser,dropUser,dropAdmin,adminExists};
