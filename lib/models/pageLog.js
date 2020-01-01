const db = require("../proj").db;

const model = db.collection("page_log");
const add = (data)=>{
    return model.insertOne(
        {
            page_id: data.pageId,
            desktop: data.desktop,
            mobile: data.mobile,
            createdAt: new Date(),
        },
    );
};

// Public APIs

exports.add = add;
exports.model = model;
