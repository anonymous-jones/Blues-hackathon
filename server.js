const hbs = require('hbs');
const express = require('express');
var bodyParser = require('body-parser')
const fs = require('fs');
const path = require('path');
const app = express();    
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const port = 3000;

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/', urlencodedParser, (req, res) => {
    res.render('index');
});
app.post('/game', urlencodedParser, (req, res) => {
    fs.readFile("./server/users.json", "utf8", (err, users) => {
        if (err) {
          console.log("File read failed:", err);
          res.redirect('/');
          return;
        }
        users = JSON.parse(users);
        if (users.users[req.body.user] == req.body.pass) {
            res.render('game', req.body);
            return;
        }
        res.redirect('/signUp');
    });
});
app.post('/save', urlencodedParser, (req, res) => {
    fs.readFile("./server/users.json", "utf8", (err, saves) => {
        if (err) {
            console.log("File read failed:", err);
            res.redirect('/');
            return;
        }
        saves = JSON.parse(saves);
        saves.saves[req.body.user] = req.body.save;
        fs.writeFile("./server/users.json", JSON.stringify(saves), (err) => {
            if (err) {
                console.log("File write failed:", err);
                res.redirect('/');
                return;
            }
            res.redirect('/');
        });
    });
});
app.post('/signUp', urlencodedParser, (req, res) => {
    fs.readFile("./server/users.json", "utf8", (err, saves) => {
        if (err) {
            console.log("File read failed:", err);
            res.redirect('/');
            return;
        }
        saves = JSON.parse(saves);
        saves.users[req.body.user] = req.body.pass;
        fs.writeFile("./server/users.json", JSON.stringify(saves), (err) => {
            if (err) {
                console.log("File write failed:", err);
                res.redirect('/');
                return;
            }
            res.redirect('/');
        });
    });
});
app.get('/error/:err/:file', (req, res) => {
    res.render(req.params.file, {"error":req.params.err.replaceAll("_", " ")});
});
app.get('/signUp', (req, res) => {
    res.render('signUp');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
