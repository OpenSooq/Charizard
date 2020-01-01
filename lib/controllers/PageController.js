const Page = require("../models/page");
const api = require("../pageSpeedApi");
const create = async (req, res)=>{
    try {
        const params = req.body;
        await Page.add(params);
        res.status(201).json({name: params.name, url: params.url});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const deactivate = async (req, res)=>{
    try {
        const params = req.body;
        await Page.deactive(params);
        res.status(200).json({success: true, name: params.name});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const logs = async (req, res)=> {
    try {
        const colors = {performance: "#34e1eb", accessibility: "#8ceb34", bestPractices: "#ed2607",
            pwa: "#ed07de", seo: "#ed8607"};
        const cateogires = {performance: [], accessibility: [], bestPractices: [], pwa: [], seo: []};
        const data ={labels: [], datasets: []};
        const params = req.query;
        const logs = await Page.logs(params);
        if (logs.length==0) {
            return res.status(200).json([]);
        }
        logs.forEach((element) => {
            const createdAt = new Date(element.createdAt);
            data.labels.push(createdAt.toString().slice(4, 10));
            const platform = element[params.platform].cateogires;
            for (const [key, value] of Object.entries(platform)) {
                cateogires[key].push(value*100);
            }
        });

        for (const [key, value] of Object.entries(cateogires)) {
            const obj = {
                label: key,
                data: value,
                borderColor: [
                    `${colors[key]}`,
                ],
                fill: false,
                borderWidth: 1,
            };
            data.datasets.push(obj);
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const analyze = async (req, res)=>{
    try {
        const params = req.query;
        const cateogires = ["performance", "accessibility", "best-practices", "pwa", "seo"];
        const strategy = params.platform;
        let resp = await api.getPageSpeed({url: params.url, strategy: strategy, category: cateogires});
        resp = JSON.parse(resp);
        const scories = {};
        for (let i=0; i < cateogires.length; i += 1) {
            const element = cateogires[i];
            scories[element] = Math.floor(resp.lighthouseResult.categories[cateogires[i]].score*100);
        }
        res.status(200).json(scories);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const all = async (req, res)=>{
    try {
        const pages = await Page.pagesList();
        res.status(200).json(pages);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};
// Public APIs

exports.create = create;
exports.deactivate = deactivate;
exports.logs = logs;
exports.analyze = analyze;
exports.all = all;

