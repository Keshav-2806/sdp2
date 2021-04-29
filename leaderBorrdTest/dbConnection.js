const MongoClient=require("mongodb").MongoClient;
const dbName="organizationDetails";
const url="mongodb://localhost:27017";
const collection="UserDetails";
//const mongoOptions={usernewUrlParse:true};
const state={
    db:null
};
     const connect= (cb)=>{
    if(state.db){
        cb();
    }else{
        MongoClient.connect(url,/*mongoOptions,*/{ useUnifiedTopology: true },(err,client)=>{
            if(err){
                cb(err);
            }else{
                state.db=client.db(dbName);
                cb();
            }
        });
    }
}
const Express = require("express");
const app = Express();
app.use(Express.json());
const path=require('path');
const db=require('./dbConn');