exports.start = async ()=>{
    const db = require("../proj").db;
    const page = db.collection("page");
    const pageLog = db.collection("page_log");
    await page.createIndex({name: 1}, {unique: true, background: true});
    await pageLog.createIndex({page_id: 1}, {background: true});
};
