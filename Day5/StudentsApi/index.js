const express = require("express");
const app = express();
const db = require("./config/db-config");
const { createStudentTable, insertStudents, getAllstudents,getOneStudents } = require("./schema/student-schema");
const { Connection } = require("mysql2");

// for access body we will use 
app.use(express.json());


// create student table 
createStudentTable();

/**
 * @To get all students
 */
app.get("/", (req, res) => {
    getAllstudents((err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Error Fetching Students"
            });
        }
        res.json(result);
    });
})
/**
 * @TODO get one students
 */
app.get("/single",(req,res)=>{
    const id  = req.query.id
    if(!id){
        res.status(400).json({ success: false , message : "Id is not provided"})
    }
    getOneStudents(id,(err,result)=>{
        if(err) return res.status(500).json({ message : err})
            if(result.length === 0) return res.status(404).json({success : false , message : "Student Was Not Found"});    
            return res.status(200).json({message:"success" , student : result});
    })
})

/**
 * @TODO post a single students
 */
app.post("/post-students", (req, res) => {
    const { name, email, age, course } = req.body;
    insertStudents(name, email, age, course, (err, reslt) => {
        if (err) return res.status(500).json({ message: err.sqlMessage })
        res.status(200).json({
            status : 200,
            message : "Student Add Successfuly"
        })
    });
})


app.listen(3002, () => {
    console.log("server is listing at port " + 3002);
})