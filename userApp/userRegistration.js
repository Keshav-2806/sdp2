const express = require("express")
const app=express();
app.use(express.json());
let Users=[
];
app.get('/Users',(req,res)=>{
    res.send(Users);
});
app.post('/Users',(req,res)=>{
    if(!req.body.username||!req.body.password||!req.body.emailId||req.body.name.length>40||
        req.body.address.length>150||!req.body.phone||req.body.phone.length!=10||!req.body.pincode||
        req.body.pincode.length!=6){
        res.status(400).send("Please Enter valid input ")
        return;
    }
    const user={
        username:req.body.username,
        password:req.body.password,
        emailId:req.body.emailId,
        name:req.body.name,
        address:req.body.address,
        phone:req.body.phone,
        pincode:req.body.pincode
    };
    Users.push(user);
    res.send(user);
});
app.get('/Users/:username',(req,res)=>{
    const User=Users.find(c=>c.username===req.params.username);
    if(!User)res.status(404).send("This User with the given username was not found")
    res.send(User);
});
app.listen(3007,()=>console.log("User registration show"));
