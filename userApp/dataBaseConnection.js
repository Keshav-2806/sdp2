const MongoClient=require("mongodb").MongoClient;
const dbName="userInformation";
const url="mongodb://localhost:27017";
//const mongoOptions={usernewUrlParse:true};
const state={
    db:null
};
const connect=(cb)=>{
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


const getDB=()=>{
    return state.db;
}
module.exports={getDB,connect};