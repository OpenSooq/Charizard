const express = require('express');
const router = express.Router();
const controller = require('../controllers/PageController');
router.post('/url',controller.addUrl);
router.get('/logs',controller.logs);
router.get('/analyze',controller.analyze);
router.post('/:name/deactivate',controller.DeactivaeUrl);
router.get('/',(req,res)=>{
    return res.render("../web/index");
});
router.get('/manager',controller.manager);
router.get('/dashboard',controller.dashboard);
module.exports = router;
