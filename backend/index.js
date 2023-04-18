const fs = require('fs');
const path = require('path');
const express = require("express");
const cors = require("cors");
const _ = require("lodash");
const https = require("https");

const mysql = require('mysql2');
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

// This is the connection that I have been using with docker 
const db = mysql.createConnection({
    host: "db",
    user: "root",
    password: "",
    database: "StudyBuddy",
    charset: 'utf8mb4',
    // Here I map to the internal port 3306 because its mapping between containers
    port: 3306,
});


db.connect((err) => {
    if (err) {
        throw (err);
    }
    console.log("Connected to MYSQL.");
})

async function initializeConnection() {
    try {
        await db.promise().query("SET NAMES 'utf8mb4'");
        console.log('Character set successfully set to utf8mb4');
    } catch (error) {
        console.error('Error setting character set:', error);
    }
}

initializeConnection();


app.get("/loginState", (req, res) => {
    try {
        let response = { isLoggedIn: false };
        if (req.session.userId) {
            response = { isLoggedIn: true, userId: req.session.userId, is_parent: req.session.is_parent, child_id: req.session.child_id };
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
            var query = db.query("select id, email, pass_word, is_parent, child_id from users where email = '" + email + "'", (err, result) => {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                }
                if (!result) {
                    res.statusMessage = "email or password does not match.";
                    res.status(401).end();
                }
                const resEmail = result[0].email;
                const resID = result[0].id;
                const resPassword = result[0].pass_word;
                const is_parent = result[0].is_parent;
                const child_id = result[0].child_id;
                if (resEmail !== email || resPassword !== password) {
                    console.log("BAD CRIDENTIALS");
                    res.statusMessage = "email or password does not match.";
                    res.status(401).end();
                }
                req.session.userEmail = resEmail;
                req.session.userId = resID;
                req.session.child_id = child_id;
                req.session.is_parent = is_parent;
                console.log(req.session.userEmail);
                const response1 = { email: resEmail };
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
    var query = db.query(`select a.name, a.id, a.feeling, a.due_date, a.minutes_spent, a.hours_needed from users u join assignments a on u.id = a.user_id where a.user_id = ` + req.params.id + " AND a.completed = 0 order by a.due_date LIMIT 8", (err, result) => {
        if (err) {
            console.log(err)
            return res.sendStatus(500);
        }
        res.send(result);
    })
});

app.get("/user/:id/completedAssignments", (req, res) => {
    var query = db.query(`select a.name, a.due_date from users u join assignments a on u.id = a.user_id where a.user_id = ` + req.params.id + " AND a.completed = 1 order by a.due_date LIMIT 8", (err, result) => {
        if (err) {
            console.log(err)
            return res.sendStatus(500);
        }
        res.send(result);
    })
});

app.post("/newTask", (req, res) => {
    if (!req.body.name || !req.body.hours || !req.body.feeling || !req.body.due_date || !req.body.user_id) {
        return res.sendStatus(400);
    }
    let breaks = req.body.breaks
    if (!breaks) {
        breaks = 0;
    }
    var query = db.query(`insert into assignments (name, hours_needed, due_date, feeling, total_breaks, user_id) values 
    (` + "'" + req.body.name + "'" + `, ` + req.body.hours + `, ` + "'" + req.body.due_date + "' , '" + req.body.feeling + "', " + breaks + ", " + req.body.user_id + `)`, (err, result) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);

        }
        console.log("Worked");
        res.sendStatus(201);
    })
});

app.get("/parentInfo/:id", (req, res) => {
    var query = db.query(`select u.name, a.name a.id, a.feeling, a.due_date a.completed from users u join assignments a on u.id = a.user_id where a.user_id = ` + req.params.id + " order by a.due_date LIMIT 10", (err, result) => {
        if (err) {
            console.log(err)
            return res.sendStatus(500);
        }
        res.send(result);
    })
});

app.get("/getName/:id", (req, res) => {
    var query = db.query(`select name from users where id =` + req.params.id, (err, result) => {
        if (err) {
            console.log(err)
            return res.sendStatus(500);
        }
        res.send(result);
    })
});

app.post("/markTaskComplete", (req, res) => {
    console.log('request:', req.body);
    if (!req.body.id) {
        return res.sendStatus(400);
    }
    var query = db.query('UPDATE assignments SET completed = 1 WHERE id = ' + req.body.id, (err, result) => {
        if (err) {
            console.log('Failed query:', err);
            return res.sendStatus(500);
        }
        console.log("Worked");
        res.status(201).json({ message: "Task marked as complete." });
    })
});


app.listen(5555, () => console.log("up and running"));