const express = require("express");
const bodyParser = require("body-parser");

const api = require("./api");

const app = express();
app.use(api);

app.listen("5000");
