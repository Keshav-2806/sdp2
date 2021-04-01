const Express = require("express");
const app = Express();
app.use(Express.json());
const path=require('path');
const db=require('./dbConnections');
//const collection="users";
app.post('/users', async (req,res)=>{
    if(!req.body.username||!req.body.password||!req.body.emailId||req.body.name.length>40||
        !req.body.phone||req.body.phone.length!=10||!req.body.pincode||
        req.body.pincode.length!=6){
        res.status(400).send("Please Enter valid input ")
        return;
    }
    const user={
        username:req.body.username,
        password:req.body.password,
        emailId:req.body.emailId,
        name:req.body.name,
        phone:req.body.phone,
        pincode:req.body.pincode
    };
    try{
        const users= await db.insertUser(user);
       
        res.send(users);
    }catch(error){
        res.send(error);
    }
});
app.get('/users', async (req,res)=>{
    try{
    const Users= await  db.getUsers()
    
    res.send(Users);  
   }catch(error){
    res.send(error)
   }
});
app.get('/users/:username',async(req,res)=>{
    const user=req.params.username;
    try{
        const Users=await db.getUserByUsername(user);
        res.send(Users);
    }catch(error){
        res.send(error); 
    }
});
app.delete('/users/:username',async (req,res)=>{
    const user=req.params.username;
    try{
    const User= await db.deleteByUsername(user);
       res.send(User);
    }catch(error){
        res.send(error)
    }
    });
db.connect((err)=>{
    if(err){
        console.log("unable to connect to database");
        process.exit(1);
    }else{
        app.listen(3002,()=>{
            console.log("connected to database");
        });
    }
});

