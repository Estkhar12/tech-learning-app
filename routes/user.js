const express = require('express');


const userController = require('../controllers/user');

const router = express.Router();

router.get('/news', userController.getNews);

router.get('/', userController.getSignup);

router.post('/signup', userController.postSignup);

router.get('/login', userController.getLogin);

router.post('/login', userController.postLogin);

router.post('/logout', userController.postLogout);


module.exports = router;