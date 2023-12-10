const express = require('express');
const app =express();
const {expressMiddleware} = require('@apollo/server/express4');
const bodyParser = require('body-parser');
const cors = require('cors');
const server = require('./graphql');

app.use(bodyParser.json());
app.use(cors());


app.listen(7000,async()=>{
    await server.start();
    app.use('/graphql',expressMiddleware(server));
    console.log(`server started at 7000`)
})