const express = require("express");
const app = express();
const router = require("../routes/pages");
const config = require("../proj").config;
exports.start = async ()=>{
    app.use(express.urlencoded({extended: true}));
    app.use(express.json());
    app.use("/", router);
    app.use(express.static( config.basedir+ "/public"));
    app.listen(config.port, ()=> console.log("server started"));
};

