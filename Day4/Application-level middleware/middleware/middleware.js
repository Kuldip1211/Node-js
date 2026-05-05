const express  =  require("express");

const app = express();

const middleware = (req,res,next) => {
    if(req.query.id){
      if(req.query.id === "123"){
          next();
      }else{
        res.send("You Are Not Authenticated !!!");
      }
    }else{
        res.send("You are Now Alowed")
    }
}

module.exports = middleware;