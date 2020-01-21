#! /usr/bin/env node
"use strict";
const path = require("path");
const basedir = path.normalize(path.join(__dirname, ".."));
require("dotenv").config({path: basedir+"/.env"});
const MongoClient = require("mongodb").MongoClient;
const _config = {
    mongo_url: "mongodb://127.0.0.1:27017/charizard",
    port: 3000,
    api_url: "https://www.googleapis.com/pagespeedonline/v5/runPagespeed",
    api_key: "",
    alert: false,
    email_user: "",
    email_host: "",
    email_port: 587,
    email_password: "",
    email_to: "",
    allowed_drop: 0,
};

/** The project singleton  */
class Project {
    /** @constructor  */
    constructor() {
        this.config={};
        this.load_config(_config);
        this.config.basedir = basedir;
    }


    /**
     *
     */
    async init() {
        const connection = await MongoClient.connect(this.config.mongo_url, {useUnifiedTopology: true});
        this.db = connection.db();
    }

    /**
     * configure the project from environment variables
     * @param {Object} template configuration template
     * @return {Object} configuration
     * */
    load_config(template) {
        for (const [key, value] of Object.entries(template)) {
            const is_int = (typeof(value)=="number" && Number.isInteger(value));
            const env_key = key.toUpperCase();
            let env = process.env[env_key];
            if (typeof(env)=="undefined") env=value;
            this.config[key] = (is_int?parseInt(env):env);
        }
        return this.config;
    }
}

global.proj=global.proj || new Project();

/** @type {Project} */
const proj=global.proj;

module.exports = proj;
