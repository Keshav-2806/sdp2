'use strict';
let Users=[{
        id:1,name:"keshav"
    },
    {
        id:2,name:"jack"
    },{
        id:3,name:"john"
    }]
const express = require("express")
const app=express();
app.use(express.json());
app.get('/Users',(req,res)=>{
  res.send(Users);
});
app.get('/Users/:id',(req,res)=>{
    const User=Users.find(c=>c.id===parseInt(req.params.id));
    if(!User)res.status(404).send("This User with the given ID was not found")
    res.send(User);
});
app.post('/Users',(req,res)=>{
    const User={
        id:Users.length+1,
        name:req.body.name
    };
    Users.push(User);
    res.send(User);
});
app.put('/Users/:id',(req,res)=>{
   const User=Users.find(c=>c.id===parseInt(req.params.id));
   User.name=req.body.name;
   res.send(User);
});

app.delete('/Users/:id',(req,res)=>{
    const User=Users.find(c=>c.id===parseInt(req.params.id));
    const index=Users.indexOf(User);
    Users.splice(index,1);
    res.send(User);
});
app.listen(3003,()=>console.log('User data show '));