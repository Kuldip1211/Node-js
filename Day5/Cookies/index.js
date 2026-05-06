const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

// middleware to use cookie parse
/**
 * @TODO IN THIS WE ALSO PASS THE PASSWORD FOR PROTECTED BUT THEN ALSO DIFFRANT WAY TO GET IT 
 */
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Cookie will start");
});

// rooute to save cookie
app.get("/save-cookie",(req,res)=>{
    res.cookie("username","kuldeep",{
        maxAge:1000*60,
        // Then browser JavaScript can access the cookie.
        httpOnly : false,
        /**
         * @TO IF WE SET PASSOWRD THEN WE ADD MORE ATTRIBUTE NAME IS SIGNED
         */
        // signed:true
    })
    res.send("cookie was saved");
})

// how to get route 
app.get("/get-cookie",(req,res)=>{
    const username = req.cookies.username;
    // ^ FOR GET SIGNED COOKIE
    // req.signedCookies.userneme
    res.send("USername is" + username);
})

// how to destory cookie 
app.get("/delet-cookie",(req,res)=>{
    res.clearCookie("username");
    res.send("cookie was deleted");
})

app.listen(3002,()=>{
    console.log("Server is listing at port " + 3002)
})
