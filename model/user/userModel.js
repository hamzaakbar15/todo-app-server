var c = require('../../connection');
var utils = require('../../utils');
var bcrypt = require('bcryptjs');

var User = function(user){
    this.tablename = 'user';
    // this.task = task.task;
    // this.status = task.status;
    // this.created_at = new Date();
};

//Get all users.
User.getAllUser = function (result) {
    c.query("Select * from user", function (err, res) {

            if(err) {
                // console.log("error: ", err);
                result(null, err);
            }
            else{
            //   console.log('tasks : ', res);  

             result(null, res);
            }
        });   
};

User.loginUser = function(fields,result){
     console.log(JSON.stringify(fields));
     // chalao
    c.query("Select * FROM user WHERE email = ?",[fields.email], function(e,r){
        if(e){
            console.log('in iffff');
            result(e, null);
        }else{
            if(r == null){
                console.log('email or password is incorrect');
                result(null, e);
            }else{
                let hashedPassword = r[0].password;
                bcrypt.compare(fields.password, hashedPassword, function(err, res) {
                    if(res === true){
                        result(null, r);
                    }else{
                        result(null, err);
                    }
                });
            }
        }
    });
};

//Adding user.
User.addUser = function (fields, result) {
    c.query("INSERT INTO user SET ?",fields, function (err, res) {
        if(err) {
            // console.log("error: ", err);
            result(null, err);
        }
        else{
        //   console.log('tasks : ', res);  

            result(null, res);
        }
    });   
};

//Updating user.
User.updateUser = function(fields, id, result){
    c.query('UPDATE user SET ? WHERE id = ?',[fields,id],function(e,r){
        if(e){
            result(null, e);
        } else {
            result(null, r);
        }
    });
}

//Deleting user.
User.deleteUser = function(id, result){
    c.query(' DELETE FROM user WHERE  id = ?',id,function(e,r){
        if(e){
            result(null, e);
        } else {
            result(null, r);
        }
    });
}

//Getting user by id.
User.getUserById = function(id, result){
    c.query(' SELECT * FROM user WHERE  id = ?',id,function(e,r){
        if(e){
            result(null, e);
        } else {
            result(null, r);
        }
    });
}


//Get all Todo.
User.getAllTodo = function (result) {
    c.query("Select * from todo", function (err, res) {

            if(err) {
                // console.log("error: ", err);
                result(null, err);
            }
            else{
            //   console.log('todos : ', res);  

             result(null, res);
            }
        });   
};

//Adding Todo.
User.addTodo = function (fields, result) {
    c.query("INSERT INTO todo SET ?",fields, function (err, res) {
        if(err) {
            // console.log("error: ", err);
            result(null, err);
        }
        else{
        //   console.log('tasks : ', res);  

            result(null, res);
        }
    });   
};

//Getting user by id.
User.getTodoById = function(id, result){
    c.query(' SELECT * FROM todo WHERE  idTodo = ?',id,function(e,r){
        if(e){
            result(null, e);
        } else {
            result(null, r);
        }
    });
}

//Updating todo.
User.updateTodo = function(fields, id, result){
    c.query('UPDATE todo SET ? WHERE idTodo = ?',[fields,id],function(e,r){
        if(e){
            result(null, e);
        } else {
            result(null, r);
        }
    });
}

//Check email exists
User.checkEmail = function(email, result){
    c.query('Select * FROM user WHERE email = ?',email, function(e,r){
        if(e){
            result(e, null);
        }else{
            result(null, r);
        }
    });
}

module.exports= User;
