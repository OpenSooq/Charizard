const mongoose = require('mongoose');
require('./pageLog');
const pageSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique:true
    },
    url:{
        type: String,
         required: true,
    },
    average:{
        type:Number,
        default:0
    },
    logs:[{ type: mongoose.Schema.Types.ObjectId, ref: 'PageLog' }],
    status:{
        type:Boolean,
        default:true
    },
    
},{timestamps:true});
const Page = mongoose.model('Page',pageSchema);
exports.page = Page;

exports.add = (data)=>{
    const page = new Page({
        name:data.name,
        url:data.url
    });
    return page.save();
};

exports.deactive = (data)=>{
    return Page.updateOne({ name: data.name }, {
        status : 0
      });
};

exports.withLogs = (data)=>{
    const page = Page.findOne({name:data.name}).populate({path:'logs',match:{createdAt: { $gte: data.from, $lte: data.to }}});
    return page;
}