const express = require('express');
const app = express();
const port = 3001;

const users = {
    "1": "Juan Dela Cruz",
    "2": "Pedro Penduko",
    "65536": "Dimas-Alang"
};

app.get('/user/:id?', (req, res) => {
    let userId = req.params.id;
    res.send(users[userId]);
});

app.get('/forgot-password', (req, res) => {
    res.send('You are viewing the "forgot-password" page');
});

app.get('/login', (req, res) => {
    res.send('You are viewing the "login" page')
});

app.get('/logout', (req, res) => {
    res.send('You are viewing the "logout" page');
});

app.listen(port, () => {
     console.log(`Example ExpressJS app listening on port: ${port}`)
});