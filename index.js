const port = 3000;
const express = require('express');
const index = express();
const routes = require('./src/routes/index');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');



index.use(bodyParser.json());
index.use(bodyParser.urlencoded({ extended: true }));
index.use(express.static(path.join(__dirname, "/public")));
index.use(express.json());
index.use(cors({"origin": "*"}));
index.use(routes);


index.listen(port, ()=>{console.log("Rodando na porta ", port)});

module.exports = { app: index };
