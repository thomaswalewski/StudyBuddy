const fs = require('fs');
const path = require('path');
const express = require("express");
const cors = require("cors");
const _ = require("lodash");
const https = require("https");

const mysql = require('mysql');
const { json } = require("express");
const { get } = require("lodash");
const { stringify } = require("querystring");
const session = require("express-session");

const app = express();

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}))

const {
    PORT = 5555,
    NODE_ENV = "development",
    SESS_NAME = "sid",
    SESS_SECRET = "aaa",
    SESS_LIFETIME = 1000 * 60 * 10,
} = process.env;

const IN_PROD = NODE_ENV === "production";

app.use(
    session({
        name: SESS_NAME,
        resave: false,
        saveUninitialized: false,
        secret: SESS_SECRET,
        cookie: {
            maxAge: SESS_LIFETIME,
            sameSite: IN_PROD ? "none" : true,
            secure: IN_PROD,
            httpOnly: true,
        },
    })
);

// This is the db connection I use with "node index.js" and it works perfectly

// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "StudyBuddy",
// });


// This is the connection that I have been using with docker 
const db = mysql.createConnection({
    host: "db",
    user: "root",
    password: "",
    database: "StudyBuddy",
    // Here I map to the internal port 3306 because its mapping between containers
    port: 3306,
});

// When I run the above connection, it connects to the database, but for any query I run
// it says the table "does not exist". If you want you can try this yourself by running the
// docker compose up --build and then going to http://localhost:5555/user/5/assignments
// it will log the error in the console. 

db.connect((err) => {
    if (err) {
        throw (err);
    }
    console.log("Connected to MYSQL.");
})



app.get("/loginState", (req, res) => {
    try {
        let response = { isLoggedIn: false };
        if (req.session.userEmail) {
            response = { isLoggedIn: true, userEmail: req.session.userEmail };
        }
        res.json(response);
        res.sendStatus(200);
    } catch (err) {
        res.statusMessage = err.message;
        res.status(500).end();
    }
});

app.post("/login", async (req, res) => {
    console.log("Starting");
    try {
        console.log("Start Login");
        const email = req.body.email;
        const password = req.body.password;
        if (email && password) {
            console.log("Verifying user...");
            var query = db.query('select id, email, pass_word from user where email = ' + email, (err, result) => {
                if (err) {
                    return res.sendStatus(500);
                }
                const resEmail = result[0].email;
                const resID = result[0].id;
                const resPassword = result[0].id;
                if (resEmail !== email || resPassword !== password) {
                    console.log("BAD CRIDENTIALS");
                    res.statusMessage = "email or password does not match.";
                    res.status(401).end();
                }
                req.session.userEmail = resEmail;
                console.log(req.session.userEmail);
                const response1 = { id: resID };
                res.json(response1);
                req.session.save();
                res.status(201);
            })
        }
    } catch (err) {
        res.statusMessage = err.message;
        res.status(401).end();
    }
});

app.post("/logout", (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                res.statusMessage = "Could not logout.";
                res.sendStatus(500);
            }
            res.clearCookie(SESS_NAME);
            res.statusMessage = "Logout successful.";
            res.sendStatus(200);
        });
    } catch {
        res.statusMessage = "Could not logout.";
        res.sendStatus(500);
    }
});

app.get("/user/:id/assignments", (req, res) => {
    var query = db.query(`select a.name, a.feeling from users u join assignments a on u.id = a.user_id where a.user_id = ` + req.params.id, (err, result) => {
        if (err) {
            console.log(err)
            return res.sendStatus(500);
        }
        res.send(result);
    })
});

app.get("/test", (req, res) => {
    var query = db.query('select * from nums', (err, result) => {
        if (err) {
            console.log(err)
            return res.sendStatus(500);
        }
        res.send(result);
    })
});

app.post("/user/:id/newtask", (req, res) => {
    if (!req.body.name || !req.body.hours || !req.body.feeling) {
        return sendStatus(400);
    }
    breaks = req.body.breaks
    if (!breaks) {
        breaks = 0;
    }


    var query = db.query('insert into assignments (species, height, garden_id) values)', (err, result) => {
        if (err) {
            return res.sendStatus(500);
        }
        res.send(result);
    })
});

app.listen(5555, () => console.log("up and running"));