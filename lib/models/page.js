const PageLog = require("./pageLog").model;
const db = require("../proj").db;
const Ajv = require("ajv");
const ObjectID = require("mongodb").ObjectID;
const pageSchema = {
    "type": "object",
    "properties": {
        "name": {"type": "string", "minLength": 3},
        "url": {"type": "string", "pattern": "http(s)?.//.*"},
        "status": {"type": "boolean"},
        "createdAt": {"type": "object", "format": "date"},
        "averages": {"type": "object"},
        "logsCount": {"type": "integer"},
    },
    "required": ["name", "url", "status"],
};

const model = db.collection("page");
const validator = (new Ajv()).addSchema(pageSchema, "pageSchema");

const add = (data)=>{
    const obj = {
        name: data.name,
        url: data.url,
        averages: {mobile: {}, desktop: {}},
        status: true,
        logsCount: 0,
        createdAt: new Date(),
    };
    if (isValid(obj)) {
        return model.updateOne({name: data.name}, {$set: obj}, {upsert: true});
    } else {
        throw Error(validator.errorsText());
    }
};

const deactive = (data)=>{
    return model.updateOne({name: data.name}, {$set: {
        status: false,
    }});
};

const logs = async (data)=>{
    const page = await model.findOne({name: data.name}).catch((error)=>{
        throw Error(error.message);
    });
    return PageLog.find({page_id: new ObjectID(page._id),
        createdAt: {$gte: new Date(data.from), $lte: new Date(data.to+" 23:59:59")}}).
        sort({createdAt: 1}).toArray();
};

const pageList = ()=>{
    return model.find({status: true}).toArray();
};
/**
 * @param {object} obj page.
 * @return {boolean}.
 */
function isValid(obj) {
    return validator.validate( "pageSchema", obj);
}

// Public APIs

exports.add = add;
exports.logs = logs;
exports.deactive = deactive;
exports.model = model;
exports.pageList = pageList;

