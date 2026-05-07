const db = require("../config/db-config");

const callback = (err, result) => {
    if (err === null) return result;
    return err;
}

// Create Table
const createStudentTable = () => {

    const query = `
        CREATE TABLE IF NOT EXISTS students (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            age INT NOT NULL,
            course VARCHAR(100),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;

    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Students Table Created");
        }
    });
}

/**
 * @TODO insert student 
 */
const insertStudents = (name, email, age, course, callback) => {
    const Q = "INSERT INTO students ( name , email , age , course ) VALUES ( ? , ? , ? , ?);"

    db.query(Q, [name, email, age, course], (err, result) => {
        if (err) {
            callback(err, null)
        } else {
            callback(null, result);
        }
    })
}
/**
 * @TODO get all student 
 */
const getAllstudents = (callback) => {
    const Q = "SELECT * FROM students";

    db.query(Q, (err, result) => {
        if (err) {
            console.log("Error in fetch all data " + err);
            callback(err, null)
        }
        callback(null, result);
    })
}
/**
 * @TODO get one student by id
 */
const getOneStudents = (id, callback) => {
    const Q = "SELECT * FROM students Where id = ?";

    db.query(Q, id, (err, result) => {
        if (err) return callback(err, null);
        return callback(null, result)
    })
}

/**
 * @TODO delete one student
 */

/**
 * @TODO update stident
 */
const updateSingleStudent = (id, name, email, age, course, callback) => {

    const Q = `UPDATE students
               SET name = ?, email = ?, age = ?, course = ?
               WHERE id = ?`;

    db.query(Q, [name, email, age, course, id], (err, result) => {

        if (err) {
            callback(err, null);
        } else {
            console.log(Q);
            console.log(result);

            callback(null, result);
        }
    });
};

const deleteStiudents = (id , callback) =>{
    const Q = `DELETE FROM students where id = ?`

    try {
        db.query(Q,id,(err,result)=>{
             if(err)  return callback(err,null)
                return callback(null , result)
        })
    } catch (error) {
        callback(error , null)
    }
} 

module.exports = {
    createStudentTable,
    insertStudents,
    getAllstudents,
    getOneStudents,
    updateSingleStudent,
    deleteStiudents
};