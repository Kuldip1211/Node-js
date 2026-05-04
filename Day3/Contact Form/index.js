const express = require("express");
const path = require("path");
const mysql = require("mysql2");

const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "deep70",
    database: "contact_from"
});

db.connect((err) => {
    if (err) {
        console.log("DB Connection Error:", err);
    } else {
        console.log("MySQL Connected");
    }
});

// set middleware
app.set("view engine", 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'));

app.get("/", (req, res) => {
    let data = []
    db.query("SELECT * FROM contacts", (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        data = result
        // send data to EJS here
        res.render("index", { data: result });
        // res.json(result);
    });
})

app.post("/contact",  (req, res) => {
    const PostData = req.body;
    // res.json(PostData);
    const sql = `
        INSERT INTO contacts (first_name, last_name, email, message) 
        VALUES (?, ?, ?, ?)
        `;

     db.query(
        sql,
        [PostData.first_name, PostData.last_name, PostData.email, PostData.message],
        (error, result) => {
            if (error) {
                return res.status(500).send(error);
            } else {
                res.redirect("/");
            }
        }
    );
})

app.post("/updatevalue",  (req, res) => {
    const id = req.query.id;
    const PostData = req.body;
    const sql = `
        UPDATE contacts 
        SET first_name = '${PostData.first_name}', last_name = '${PostData.last_name}', email = '${PostData.email}', message = '${PostData.message}'
        WHERE id = ${id}
    `;

     db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect("/");
    });
})

app.get("/delete",  (req, res) => {
    const id = req.query.id;
    const sql = `
            DELETE FROM contacts
            WHERE id = ${id}
        `;
         db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect("/");
    });
  
})
app.get('/update',  (req, res) => {
    const id = req.query.id;

    db.query(`SELECT * FROM contacts WHERE id=${id}`, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        data = result
        // send data to EJS here
        res.render("update", { data: result });
        // res.json(result);
    });
    // res.render("update")
})

app.listen(3001, () => {
    console.log("Server is listing at port " + 3001);
})

