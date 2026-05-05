const express = require("express");
const Db = require("./DB/db");
const middleware = require("./middleware/middleware")

const app = express();

Db.connect((err)=>{
    if(err){
      console.log("Db Connection Feild");
    }else{
        console.log("Db Connected");
    }
})


app.get("/",middleware,(req,res)=>{
    Db.query("SELECT * FROM contacts", (err, result) => {
        res.json(result)
    });
})

// middleware for eror heandling
app.use((err, req, res, next) => {
//   console.error(err.stack)
  res.send('Something broke!')
})
app.listen(3001,()=>{
    console.log("Server is lesting on port on " + 3001);
})