import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import random from 'random';

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json())

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
    console.dir(req.body);
    res.send(req.body);
});

app.delete('/users/actions/:id', (req, res) => {
    console.dir(req.body);
    res.send(req.body);
});

app.patch('/users/actions/:id', (req, res) => {
    console.dir(req.body);
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

interface Show {
    id: string,
    date: string,
    time: string,
    balconyTicketCount: number,
    balconyTicketPrice: number,
    regularTicketCount: number,
    regularTicketPrice: number,
}

const makeShows = (count: number) => {
    let shows: Show[] = [];
    for (let i = 0; i < count; ++i) {
        let id = uuidv4();
        let day = random.int(1, 27);
        let month = random.int(1, 12);
        let date = `2021-${month}-${day}`;
        let hour = random.int(1, 20);
        let minute = random.int(1, 59);
        let time = `${hour}:${minute}:00`;
        let balconyTicketCount = 100;
        let balconyTicketPrice = 500;
        let regularTicketCount = 500;
        let regularTicketPrice = 350;
        let show: Show = {
            id: id,
            date: date,
            time: time,
            balconyTicketCount: balconyTicketCount,
            balconyTicketPrice: balconyTicketPrice,
            regularTicketCount: regularTicketCount,
            regularTicketPrice: regularTicketPrice
        }
        shows.push(show);
    }
    return shows;
}

const shows = makeShows(10);

app.get("/shows", (_req, res) => {
    res.send(shows);
})

app.get("/shows/:id", (req, res) => {
    const id = req.params.id;
    for (const show of shows) {
        if (show.id === id) {
            res.send(show);
            return;
        }
    }
    res.send();
})

app.post("/shows", (req, res) => {
    console.dir(req.body);
    res.send(req.body);
})

app.listen(port, () => {
    console.log(`Mock server listening on port ${port}`);
});