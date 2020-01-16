let jwt = require("jsonwebtoken");
// const config = require("../config.js");
var userModel = require("../model/user/userModel");

// console.log("TCL: config", config);

let checkToken = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  console.log("TCL: checkToken -> token", token);
  if (token) {
    jwt.verify(
      String(token)
        .slice(6)
        .trim(),
        'reactTodoApp',
      (err, decoded) => {
        if (err) {
          return res.json({ success: false, message: "Token is not valid" });
        } else {
          req.decoded = decoded;
          userModel.verifyToken(
            {
              idUser: req.decoded.id,
              token: String(token)
                .slice(6)
                .trim()
            },
            function(e, r) {
              if (e) {
                return res.send({
                  status: 0,
                  message: "Some Error Occured While Verifying token."
                });
              } else {
                if (r.length > 0) {
                  next();
                } else {
                  return res.send({
                    status: 0,
                    message: "Token is not authenticated."
                  });
                }
              }
            }
          );
        }
      }
    );
  } else {
    return res.json({ success: false, message: "Auth token is not supplied" });
  }
};
module.exports = { checkToken: checkToken };