const express = require("express");
const session = require("express-session");

const app = express();

app.use(session({
    secret: "KuldeeoSecrete",

    // It will not save session again if nothing changed
    resave: false,

    // Session created only when data stored
    saveUninitialized: false,

    // Session store for 1 minute
    cookie: { maxAge: 1000 * 60 }
}));


app.get("/", (req, res) => {
    console.log("route was called");
    res.send("Session start");
});


app.get("/set-session", (req, res) => {

    req.session.username = "kuldeep";

    res.send("Session stored");
});


app.get("/get-session", (req, res) => {

    if (req.session.username) {

        res.send(`Username from session: ${req.session.username}`);

    } else {

        res.send("Username was not saved");

    }

});


app.get("/delete-session", (req, res) => {

    req.session.destroy((err) => {

        if (err) {

            res.send("Error in session destroy");

        } else {

            res.send("Session was deleted");

        }

    });

});


app.listen(3002, () => {
    console.log("server is listening at port 3000");
});