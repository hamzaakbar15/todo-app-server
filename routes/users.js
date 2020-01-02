var express = require('express');
var router = express.Router();
const withAuth = require('../middleware');

//Requires controller modules.
var user_controller = require('../controller/user/userController');


/* GET users listing. */
router.get('/getusers', user_controller.list_all_users);
// router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
// });

/* Inserting user. */
router.post('/insert_user', user_controller.insert_user);

/* Updating user. */
router.post('/update_user/:id', user_controller.update_user);

/* Deleting user. */ 
router.get('/delete_user/:id', user_controller.delete_user);

/* Get user by ID */
router.get('/get_user_by_id/:id', user_controller.get_user_by_id);

router.post('/login_user', user_controller.login_user);

/* GET todo listing. */
router.get('/todos', withAuth, user_controller.list_all_todo);

/* Inserting Todo */
router.post('/insert_todo', user_controller.insert_todo);

/* Get todo by ID */
router.get('/edit_todo/:id', user_controller.get_todo_by_id);

/* Updating todo. */
router.post('/update_todo/:id', user_controller.update_todo);

/* Check Email address exists */
router.get('/check_email/:email', user_controller.check_email);

module.exports = router;
