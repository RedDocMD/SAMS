import express from 'express';
import cors from 'cors';

const app = express();
const port = 8080;

app.use(cors());

interface User {
    id: string,
    username: string,
    password: string,
    type: string,
}

let users: User[] =
    [
        {
            "id": "abc",
            "username": "root",
            "password": "toor",
            "type": "Manager"
        },
        {
            "id": "rev",
            "username": "deep",
            "password": "noneshallpass",
            "type": "Customer"
        },
        {
            "id": "whatever",
            "username": "ramu",
            "password": "paisabazar",
            "type": "Salesperson"
        },
        {
            "id": "hell",
            "username": "borda",
            "password": "cha-kothae",
            "type": "Accountant",
        }
    ];

app.get('/users', (_req, res) => {
    res.send(users);
});

app.get('/users/actions/:id', (req, res) => {
    const id = req.params.id;
    for (const user of users) {
        if (user.id === id) {
            res.send(user);
            return;
        }
    }
    res.send("");
});

app.post('/users', (req, res) => {
    res.send(req.body);
});

app.delete('/users/actions/:id', (req, res) => {
    res.send(req.body);
});

app.patch('/users/actions/:id', (req, res) => {
    res.send(req.body);
});

app.get('/users/login', (req, res) => {
    const username = req.query.username;
    const password = req.query.password;
    console.log(`username = ${username}  password = ${password}`);
    for (const user of users) {
        if (user.username === username && user.password === password) {
            res.json(user);
            return;
        }
    }
    res.send("");
});

app.listen(port, () => {
    console.log(`Mock server listening on port ${port}`);
});