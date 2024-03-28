const router = require("express").Router();
const userConstoller = require("../controllers/userController")

router.post('/signup', userConstoller.signUpUser);
router.post('/signin', userConstoller.signInUser);
router.post('/auth', userConstoller.authUserToken);
router.put('/edit', userConstoller.editUser);
module.exports = router;