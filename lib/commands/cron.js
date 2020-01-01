const Page = require("../models/page").model;
const PageLog = require("../models/pageLog");
const api = require("../pageSpeedApi");

exports.start = async ()=>{
    const results = await Page.find({status: true}).toArray().catch((e)=>{
        console.log(e); return [];
    });
    for (const page of results) {
        addLog(page);
    }
};

const addLog = async (page)=>{
    const cateogires = ["performance", "accessibility", "best-practices", "pwa", "seo"];
    const strategies = ["desktop", "mobile"];
    const data = {name: page.name, pageId: page._id};
    try {
        for (const element of strategies) {
            let res = await api.getPageSpeed({url: page.url, strategy: element, category: cateogires});
            res = JSON.parse(res);
            const results = {};
            for (const category of cateogires) {
                const element = category=="best-practices"?"bestPractices":category;
                results[element] = res.lighthouseResult.categories[category].score;
            }
            data[element] = {cateogires: results, loadingExperience: res.loadingExperience};
        }
        PageLog.add(data);
    } catch (error) {
        console.log(error);
    }
};
