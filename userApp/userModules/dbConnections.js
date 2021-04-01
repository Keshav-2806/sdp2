const MongoClient=require("mongodb").MongoClient;
const dbName="userInformation";
const url="mongodb://localhost:27017";
const collection="users";
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
const getDB=()=>{
    return state.db;
}
 async function insertUser(user){
    const result =await getDB().collection(collection).insertOne(user);
    return result;
} 
 async function getUsers(){
    const UserDetails= await getDB().collection(collection).find({}).toArray();
    return UserDetails; 
}
 async function getUserByUsername(user){
    const userDetailss=await getDB().collection(collection).find({username:user}).toArray();
    console.log(userDetailss);
    return userDetailss;
}
 async function deleteByUsername(user){
    const deleteUsername=await getDB().collection(collection).deleteOne({username:user});
    return deleteUsername;
}
module.exports={getDB,connect,insertUser,getUsers,deleteByUsername,getUserByUsername}; 