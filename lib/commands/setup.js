exports.start = ()=>{
    const db = require("../proj").db;
    const page = db.collection("page");
    const pageLog = db.collection("page_log");
    page.createIndex({name: 1}, {unique: true});
    pageLog.createIndex({page_id: 1});
};
