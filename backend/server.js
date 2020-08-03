const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const port = process.env.PORT || 4000;

const img = require("./routes/img");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/img", img);

server.get("/", (req, res) => res.send("index route"));

server.listen(port, () => console.log(`\n*** Listening on port ${port}***\n`));
