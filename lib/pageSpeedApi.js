const api = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";
const rp = require("request-promise");

exports.getPageSpeed = (params)=>{
    let url = `${api}?url=${params.url}&strategy=${params.strategy}`;
    params.category.forEach((element) => {
        url+=`&category=${element}`;
    });
    const opt = {uri: url};
    return rp(opt);
};

