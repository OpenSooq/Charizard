const express = require("express");
const app = express();
const router = require("../routes/pages");
const proj = require("../proj");
exports.start = async ()=>{
    app.use(express.urlencoded({extended: true}));
    app.use(express.json());
    app.use("/", router);
    app.use(express.static( proj.config.basedir+ "/public"));
    app.listen(process.env.PORT, ()=> console.log("server started"));
};

