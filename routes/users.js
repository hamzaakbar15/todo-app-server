const express = require('express');
const router = express.Router();
const middleWare = require('../middleware/auth');

//Requires controller modules.
const userController = require('../controller/user/userController');


/* GET users listing. */
router.get('/getusers', userController.list_all_users);
// router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
// });

/* Inserting user. */
router.post('/insert_user', userController.insert_user);

/* Updating user. */
router.post('/update_user/:id', userController.update_user);

/* Deleting user. */ 
router.get('/delete_user/:id', userController.delete_user);

/* Get user by ID */
router.get('/get_user_by_id/:id', userController.get_user_by_id);

router.post('/login_user', userController.login_user);

/* GET todo listing. */
// router.get('/todos', middleWare.checkToken, userController.list_all_todo);
router.get('/todos', userController.list_all_todo);

/* Inserting Todo */
router.post('/insert_todo', middleWare.checkToken, userController.insert_todo);

/* Get todo by ID */
router.get('/edit_todo/:id', userController.get_todo_by_id);

/* Updating todo. */
router.post('/update_todo/:id', userController.update_todo);

/* Check Email address exists */
router.get('/check_email/:email', userController.check_email);

module.exports = router;
