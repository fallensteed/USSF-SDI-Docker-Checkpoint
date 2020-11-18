const fs = require("fs")
const bodyParser = require("body-parser")

const express = require('express')
const app = express()
const port = 3001

const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'admin',
    host: 'database',
    database: 'emails',
    password: 'admin',
    port: 5432,
})

app.use(bodyParser.json())

// const emails = JSON.parse(fs.readFileSync("emails.JSON"))

app.get('/emails', (req, res) => {
    pool.query('SELECT * FROM emails', (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows)
    })
})


// app.post('/import', (req, res) => {
//     for (let i = 0; i < emails.length; i++) {
//         pool.query('INSERT INTO emails (sender, recipient, subject, message, date) VALUES ($1, $2, $3, $4, $5)', [emails[i].sender, emails[i].recipient, emails[i].subject, emails[i].message, emails[i].date], (error, results) => {
//             if (error) {
//                 throw error;
//             }
//         })
//     }
//     res.status(200).json("finished");
// })


app.get('/emails/:id', (req, res) => {
    pool.query('SELECT * FROM emails WHERE id = $1', [req.params.id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows)
    })
})

app.get('/search', (req, res) => {
    let str = '%' + decodeURIComponent(req.query.query) + '%';
    pool.query("SELECT * FROM emails WHERE lower(subject) LIKE lower($1)", [str], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
});

app.post('/send', function (req, res) {
    let result;
    const emailSender = req.body;
    if (emailSender.sender && emailSender.recipient && emailSender.subject && emailSender.message) {
        pool.query('INSERT INTO emails (sender, recipient, subject, message, date) VALUES ($1, $2, $3, $4, $5)', [emailSender.sender, emailSender.recipient, emailSender.subject, emailSender.message, new Date().toISOString()], (error, results) => {
            if (error) {
                throw error;
            }
        })
        result = {
            "status": "success",
            "message": "The message was successfully sent"
        }
    } else {
        result = {
            "status": "failed",
            "message": "The message was not sent"
        }
        res.status(400);
    }
    res.json(result);
});


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))