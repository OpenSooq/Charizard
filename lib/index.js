"use strict";
const path = require("path");
const fs = require("fs");
const {promisify} = require("util");
const proj = require("./proj");

/**
*/
async function start() {
    process.on("unhandledRejection", function(error) {
        console.log("unhandledRejection", error.message);
        process.exit(-1);
    });
    await proj.init();
    let commands = await promisify(fs.readdir)(path.join(__dirname, "commands"));
    commands = commands.filter((i)=>i.endsWith(".js")).map((i)=>path.basename(i).replace(/\.js/, "")).filter((i)=>!i.startsWith("_"));
    if (process.argv.length <= 2 || process.argv[2] == "help") {
        console.log("available commands are "+JSON.stringify(commands));
        process.exit();
    }
    const command = process.argv[2];
    if (commands.indexOf(command)<0) {
        console.log("unknown command "+command);
        process.exit();
    }
    await require("./commands/"+command).start();
}

module.exports.start = start;
