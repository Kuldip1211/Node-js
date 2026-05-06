const express =  require("express");
const path = require("path");
const app = express();
const { body , validationResult } = require("express-validator");


// set middleware
app.set("view engine", 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

var validationRagistration = [
    body("name").notEmpty().withMessage("Name can not Be Empty").isLength({ min : 3}).withMessage("Name must be at least 3 character"),
    body("email").isEmail().withMessage("Please Provided a Valid Email"),
    body("password").isLength({min:5,max:10}).withMessage("Password Not match creatiare Please Provide valid password"),
    body("gender").notEmpty().withMessage("Gander is required"),
    body("country").notEmpty().withMessage("Please select the city")
]

app.get("/",(req,res)=>{
    res.render("index");
})

app.post("/savedata", validationRagistration, (req,res)=>{
    const error = validationResult(req);
    
    const fromData = req.body;
    console.log(fromData);
    res.send("Form Was Submited");
})

app.listen(3001,()=>{
    console.log("server is listing");
})