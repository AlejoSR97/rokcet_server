const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');

//api/productos

router.get('/', userController.getUser);
router.get('/auth', userController.authUser);
router.post('/', userController.createUser);
router.put('/', userController.updateUser);
router.delete('/', userController.deleteUser);

module.exports = router;