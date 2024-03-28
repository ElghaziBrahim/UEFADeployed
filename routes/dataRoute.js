const router = require("express").Router();


const alldataController = require("../controllers/alldataController")

router.post('/groupes', alldataController.getAllByGroup);
router.post('/countries', alldataController.getAllByCountry);
module.exports = router;