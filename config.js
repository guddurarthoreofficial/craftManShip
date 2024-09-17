const mysql = require("mysql");
const { hostname } = require("os");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", 
  database: "test",
});

con.connect((err)=>{
    if(err){
        console.log("error",err);
    }else{
        console.log("connected")
    }
})

module.exports = {con}
