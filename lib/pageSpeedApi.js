const rp = require("request-promise");
const config = require("./proj").config;
const api = config.api_url;

exports.getPageSpeed = (params)=>{
    if (config.api_key!=null) {
        params.key = config.api_key;
    }
    const url = `${api}?${prepareQs(params)}`;
    const opt = {uri: url};
    return rp(opt);
};

function prepareQs(params) {
    let q = "";
    for (const [key, value] of Object.entries(params)) {
        if (Array.isArray(value)) {
            value.forEach((element)=>{
                q+=`${key}=${element}&`;
            });
        } else {
            q+=`${key}=${value}&`;
        }
    }
    return q;
}

