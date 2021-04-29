const Express = require("express");
const app = Express();
app.use(Express.json());
const path=require('path');
const db=require('./dbConn');