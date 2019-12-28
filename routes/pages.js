const express = require('express');
const router = express.Router();
const controller = require('../controllers/PageController');
router.post('/url',controller.addUrl);
router.get('/logs',controller.logs);
router.post('/:name/deactivate',controller.DeactivaeUrl);
router.get('/index',(req,res)=>{
    return res.render("../web/index");
});
router.get('/manager',controller.manager);
router.get('/dashboard',controller.dashboard);
module.exports = router;
