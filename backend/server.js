const express = require("express");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 8080;

//Endpoint to check if connection has established

app.get("/ping", (req, res) => res.send("pong"));

app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
