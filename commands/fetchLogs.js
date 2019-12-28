require('dotenv');
const Page = require('../models/page').page;
const PageLog = require('../models/pageLog');
const api = require('../pageSpeedApi');
const db = require('../db/config');
db.connect().then(()=>{}).catch(error=>{console.log(error.message)});

Page.find({status:true}).then(
results=>{
    results.forEach(page => {
        addLog(page);
    });
}
).catch(error=>{
    console.log(error);
});

const addLog = async (page)=>{
    const cateogires = ["performance","accessibility","best-practices","pwa","seo"];
    const strategies = ['desktop','mobile'];
    const data = {name:page.name,id:page._id};
    try{
        for(let i=0; i < strategies.length; i += 1) {
            const element = strategies[i];
            let res = await api.getPageSpeed({url:page.url,strategy:element,category:cateogires});
            res = JSON.parse(res);
            scories = {};
            for(let i=0; i < cateogires.length; i += 1) {
                let element = cateogires[i]=="best-practices"?"bestPractices":cateogires[i];
                 scories[element] = res.lighthouseResult.categories[cateogires[i]].score;
            }
            data[element] = {cateogires:scories,loadingExperience:res.loadingExperience};
        }
        const log = await PageLog.add(data);
        page.logs.push(log);
        await page.save();
    }catch(error){
        console.log(error);
    }
}