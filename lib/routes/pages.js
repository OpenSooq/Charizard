const express = require("express");
const router = express();
const controller = require("../controllers/PageController");
router.post("/page/create", controller.create);
router.get("/page/logs", controller.logs);
router.get("/page/analyze", controller.analyze);
router.post("/page/deactivate", controller.deactivate);
router.get("/page/all", controller.all);

module.exports = router;
