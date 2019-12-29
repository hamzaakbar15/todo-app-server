var userModel = require('../../model/user/userModel');
var formidable = require('formidable');
var utils = require('../../utils');
var bcrypt = require('bcryptjs');

//Get All Users.
exports.list_all_users = function(req, res) {
    userModel.getAllUser(function(err, user) {
      if (err){
        res.send({status:false, message:'failed to show user list', response:err});
      }else{
        // console.log('res', user);
      res.send({status:true, message:'users list', response:user});
    //   res.send(user);
      }
    });
  };

//Inserting User.
// exports.insert_user = function(req, res){
//     var form = new formidable.IncomingForm();
//     form.parse(req,function(err,fields,files){
//         // console.log(fields);
//         var pass = utils.encrypt(fields.password);
//         // console.log(pass);
//         fields.iv = pass.iv;
//         fields.password = pass.Password;
//         userModel.addUser(fields, function(err, result){
//             if(err){
//                 res.send({status:false, message:'failed to add user.', response:err});
//             }else{
//                 res.send({status:true, message:'User has been added!.', response:result});
//             }
//         });
//     });
// };

exports.insert_user = function(req, res){
    // var form = new formidable.IncomingForm();
    // form.parse(req,function(err,fields,files){
        var fields = req.body;
        console.log(fields);
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(fields.password, salt, function(err, hash) {
                fields.password = hash;
                userModel.addUser(fields, function(err, result){
                    if(err){
                        res.send({status:false, message:'failed to add user.', response:err});
                    }else{
                        res.send({status:true, message:'User has been added!.', response:result});
                    }
                });
            });
        });
    // });
};


exports.login_user = function(req, res){
    // var form = new formidable.IncomingForm();
    // form.parse(req,function(err,fields,files){
        var fields = req.body;
        // console.log(fields);
       userModel.loginUser(fields, function(err, result){
            if(err){
                res.send({status:false, message:'Login failed.', response:err});
            }else if(result == null){
                res.send({status:false, message:'Login failed.', response:result});
            }else{
                let customResponse = {
                    'id' : result[0].id,
                    'name' : result[0].name,
                    'email' : result[0].email,

                };
                res.send({status:true, message:'Login successful.', response:customResponse});
            }
       }) ;
};
  
//Updating User.
exports.update_user = function(req, res){
    var id = req.params.id;
    var form = new formidable.IncomingForm();
    form.parse(req,function(err,fields,files){
        var pass = utils.encrypt(fields.password);
        // console.log(pass);
        fields.iv = pass.iv;
        fields.password = pass.Password;
        userModel.updateUser(fields, id, function(err, result){
            if(err){
                res.send({status:false, message:'failed to update user.', response:err});
            }else{
                res.send({status:true, message:'User has been updated!.', response:result});
            }
        });
    });
};

//Deleting User.
exports.delete_user = function(req, res){
    var userId = req.params.id;
    userModel.deleteUser(userId, function(err, result){
        if(err){
            res.send({status:false, message:'failed to delete user.', response:err});
        }else{
            res.send({status:true, message:'User has been deleted!.', response:result});
        }
    });
};

//Get User By Id.
exports.get_user_by_id = function(req, res){
    var userId = req.params.id;
    userModel.getUserById(userId, function(err, result){
        if(err){
            res.send({status:false, message:'failed to get user by id.', response:err});
        }else{
            if(result.length > 0){
                res.send({status:true, message:'Got user by id.', response:result});
            }else{
                res.send({status:true, message:'No user found by id '+userId, response:result});
            }
        }
    });
};


//Inserting Todo
exports.insert_todo = function(req, res){

    var fields = req.body;
    userModel.addTodo(fields, function(err, result){
        if(err){
            res.send({status:false, message:'failed to add todo.', response:err});
        }else{
            res.send({status:true, message:'Todo has been added!.', response:result});
        }
    });
};
  

//Get All Todo.
exports.list_all_todo = function(req, res) {
    userModel.getAllTodo(function(err, data) {
      if (err){
        res.send({status:false, message:'failed to show todo list', response:err});
      }else{
        res.send({status:true, message:'todo`s list', response:data});
      }
    });
};

//Get Todo By Id.
exports.get_todo_by_id = function(req, res){
    var todoId = req.params.id;
    userModel.getTodoById(todoId, function(err, result){
        if(err){
            res.send({status:false, message:'failed to get todo by id.', response:err});
        }else{
            if(result.length > 0){
                res.send({status:true, message:'Got todo by id.', response:result});
            }else{
                res.send({status:true, message:'No todo found by id '+todoId, response:result});
            }
        }
    });
};

//Updating Todo
exports.update_todo = function(req, res){
    var id = req.params.id;
    var fields = req.body;
    userModel.updateTodo(fields, id, function(err, result){
        if(err){
            res.send({status:false, message:'failed to update todo.', response:err});
        }else{
            res.send({status:true, message:'Todo has been updated!.', response:result});
        }
    });
};

exports.check_email = function(req, res){
    var email = req.params.email;
    userModel.checkEmail(email, function(err, result){
        if(err){
            res.send({status:false, message:'failed to get user by email.', response:err});
        }else{
            if(result.length > 0){
                res.send({status:true, message:'Email exists', response:result});
            }else{
                res.send({status:false, message:'Email not exists', response:err});
            }
        }
    });
};