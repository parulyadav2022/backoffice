const mysql = require("mysql");
const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'payment_gateway'
  })
  con.connect(function(error){
    if(error) {
      console.error(error)
      return
    }
    console.log("connected to mysql")
    
  })
  module.exports = con;