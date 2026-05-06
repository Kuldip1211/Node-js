const mysql = require("mysql2");

const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "deep70",
    database : "students"
})

/**
 * @TODO database connection 
 */
db.connect((err)=>{
    if(err){
        console.log("Db Connection Feield:" , err);
    }else{
        console.log("Db connection Successfully");
    }
})

module.exports=db