const mongooose = require('mongoose');
const dbConnection = ()=>{
    mongooose.connect('mongodb://localhost/pageSpeed',{ useNewUrlParser: true , useUnifiedTopology: true })
    return mongooose.connection;
};
exports.connect = dbConnection;