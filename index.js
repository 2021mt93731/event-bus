const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const events = [];


app.post('/events', (req, res) => {
    const event = req.body;

    events.push(event);

    // Kubernetes cluster

    axios.post('http://posts-srv:4000/events', event).catch((err) => {
        console.log(err.message);
    });
    axios.post('http://comments-srv:4001/events', event).catch((err) => {
        console.log(err.message);
    });
    axios.post('http://query-srv:4002/events', event).catch((err) => {
        console.log(err.message);
    });
    axios.post('http://moderation-srv:4003/events', event).catch((err) => {
        console.log(err.message);
    });

    // Local host 

    // axios.post('http://localhost:4000/events', event).catch((err) => {
    //     console.log(err.message);
    // });
    // axios.post('http://localhost:4001/events', event).catch((err) => {
    //     console.log(err.message);
    // });
    // axios.post('http://localhost:4002/events', event).catch((err) => {
    //     console.log(err.message);
    // });
    // axios.post('http://localhost:4003/events', event).catch((err) => {
    //     console.log(err.message);
    // });

    res.send({ status: 'OK' });
});

app.get('/events', (req, res)=>{
    res.send(events);

});

app.listen(4005, () => {
    console.log('v5');
    console.log("Listending on 4005");

});
