const Page = require('../models/page');
const api = require('../pageSpeedApi');

exports.addUrl = async (req,res)=>{
    try{
        const page = await Page.add(req.body);
        res.status(201).json(page);
    }catch(error){
        console.log(error);
        res.status(500).json({error:error})
    }
};

exports.DeactivaeUrl = async (req,res)=>{
    try{
        const page = await Page.deactive(req.params);
        res.status(200).json({success:true});
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

exports.logs = async (req,res)=>{
    try{
        const cateogires = {performance:[],accessibility:[],bestPractices:[],pwa:[],seo:[]};
        const data ={labels:[],datasets:[]};
        const params = req.query;
        const page = await Page.withLogs(params);
        if(page.logs.length==0){
            res.status(200).json({});
        }
        page.logs.forEach(element => {
            const platform = element[params.platform].cateogires;
            for (const key in platform) {
            if (platform.hasOwnProperty(key)) {
                const el = platform[key];
                cateogires[key].push(el*100);   
            }
        }
        });

        for (const key in cateogires) {
            if (cateogires.hasOwnProperty(key)) {
                const element = cateogires[key];
                let obj = {
                    label: key,
                    data: element,
                    borderColor: [
                        `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 200)}, 1)`,
                    ],
                    fill: false,
                    borderWidth: 1
                };
                data.datasets.push(obj);
            }
        }
        var dates = getDates(new Date(params.from), new Date(params.to));                                                                                                           
        data.labels = dates;
        res.status(200).json(data);
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

exports.manager = async(req,res)=>{
    pages = await Page.page.find({status:true});
    res.render("../web/manage-url",{pages:pages});
}
exports.dashboard = async(req,res)=>{
    pages = await Page.page.find({status:true});
    res.render("../web/dashboard",{pages:pages});
}

exports.analyze = async (req,res)=>{
    try{
        const params = req.query;
    const cateogires = ["performance","accessibility","best-practices","pwa","seo"];
    const strategy = params.platform;
    let resp = await api.getPageSpeed({url:params.url,strategy:strategy,category:cateogires});
    resp = JSON.parse(resp);
    scories = {};
    for(let i=0; i < cateogires.length; i += 1) {
        let element = cateogires[i];
         scories[element] = Math.floor(resp.lighthouseResult.categories[cateogires[i]].score*100);
    }
    res.status(200).json(scories);
    }catch(error){
        res.status(500).json({message:error.message})
    }

};

const getDates = function(startDate, endDate) {
    var dates = [],
        currentDate = startDate,
        addDays = function(days) {
          var date = new Date(this.valueOf());
          date.setDate(date.getDate() + days);
          return date;
        };
    while (currentDate <= endDate) {
      dates.push(currentDate.toString().slice(4,10));
      currentDate = addDays.call(currentDate, 1);
    }
    return dates;
  };
  