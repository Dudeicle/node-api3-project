const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");

const apiRouter = require("./api/router");

const server = express();

//Global Middleware
server.use(express.json());
// server.use(morgan("dev"));
server.use(helmet());

server.use(logger);

server.use("/api", apiRouter);

// checkPass("mellon")

server.get("/", (req, res) => {
	res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware
function logger(req, res, next) {
	req.name = req.headers.name;

	console.log(`${req.name} made a ${req.method} request to ${req.url}`);

	next();
}

function checkPass(password) {
	return function (req, res, next) {
		// check the password
		if (req.headers.authorization === password) {
			next();
		} else {
			res.status(401).json({ you: "cannot pass" });
		}
	};
}

module.exports = server;
