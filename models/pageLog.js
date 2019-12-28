const mongoose = require('mongoose');
const pageSchema = new mongoose.Schema({
    desktop:Object,
    mobile:Object
},{timestamps:true});
const PageLog = mongoose.model('PageLog',pageSchema);

exports.add = (data)=>{
    return PageLog.create(
        {
            desktop:data.desktop,
            mobile:data.mobile
        }
    );
};