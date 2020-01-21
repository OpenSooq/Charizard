const Page = require("../models/page").model;
const PageLog = require("../models/pageLog");
const rp = require("request-promise");
const config = require("../proj").config;
const api = config.api_url;
const nodemailer = require("nodemailer");
const ejs = require("ejs");

const transporter = nodemailer.createTransport({
    host: config.email_host,
    port: config.email_port,
    secure: false,
    auth: {
        user: config.email_user,
        pass: config.email_password,
    },
});
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
        const averages = page.averages;
        for (const strategy of strategies) {
            const qs = {url: page.url, strategy: strategy, category: cateogires, key: config.api_key};
            const opt = {uri: api, qs: qs, useQuerystring: true};
            let res = await rp(opt);
            res = JSON.parse(res);
            const results = {};
            for (const category of cateogires) {
                const element = category=="best-practices"?"bestPractices":category;
                const score = Math.floor(res.lighthouseResult.categories[category].score*100);
                if (averages[strategy][element]) {
                    const diff =Math.floor(averages[strategy][element]-score);
                    if (diff > config.allowed_drop) {
                        if (config.alert) {
                            sendAlert({
                                category: element,
                                average: averages[strategy][element],
                                platform: strategy,
                                score: score,
                                page: page.name,
                                url: page.url,
                                diff: diff,
                            });
                        }
                    }
                    averages[strategy][element] = (averages[strategy][element]*page.logsCount+score)/(page.logsCount+1);
                } else {
                    averages[strategy][element] = score;
                }
                results[element] = score;
            }
            data[strategy] = {cateogires: results, loadingExperience: res.loadingExperience};
        }
        await Page.updateOne({name: page.name}, {$set: {averages: averages, logsCount: page.logsCount+1}});
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

/**
 * @param {object} alert
 */
async function sendAlert(alert) {
    const template = await ejs.renderFile("lib/email/template.ejs", alert);
    const mailOptions = {
        from: config.email_user,
        to: config.email_to,
        subject: `[charizard][alert] drop in ${alert.category} score ${alert.diff} in ${alert.page} page`,
        html: template,
    };
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
}

