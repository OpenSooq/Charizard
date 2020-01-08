const Page = require("../models/page").model;
const PageLog = require("../models/pageLog");
const rp = require("request-promise");
const config = require("../proj").config;
const api = config.api_url;

exports.start = async ()=>{
    const results = await Page.find({status: true}).toArray().catch((error)=>{
        console.log(error); return [];
    });
    for (const page of results) {
        await addLog(page);
        // maximum 2 request per sec without having a key.
        if (config.api_key!="") {
            await sleep(1000);
        }
    }
};

const addLog = async (page)=>{
    const cateogires = ["performance", "accessibility", "best-practices", "pwa", "seo"];
    const strategies = ["desktop", "mobile"];
    const data = {name: page.name, pageId: page._id};
    try {
        for (const element of strategies) {
            const qs = {url: page.url, strategy: element, category: cateogires, key: config.api_key};
            const opt = {uri: api, qs: qs, useQuerystring: true};
            let res = await rp(opt);
            res = JSON.parse(res);
            const results = {};
            for (const category of cateogires) {
                const element = category=="best-practices"?"bestPractices":category;
                results[element] = res.lighthouseResult.categories[category].score;
            }
            data[element] = {cateogires: results, loadingExperience: res.loadingExperience};
        }
        await PageLog.add(data);
    } catch (error) {
        console.log(error);
    }
};
/**
 * @param {int} ms milliseconds.
 * @return {promise}.
 */
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

