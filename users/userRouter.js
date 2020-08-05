const express = require("express");

const UserDb = require("./UserDb");
const ifExists = require("./if-exists-user");

const router = express.Router();

// URL path is localhost:4000/api/user/
// all of these url paths are coming after user? idk

// this only runs if the url has /api/users in it
router.get("/", (req, res) => {
	// do your magic!
	UserDb.get(req.query)
		.then((users) => {
			res.status(200).json(users);
		})
		.catch((error) => {
			// log error to server
			console.log(error);
			res.status(500).json({
				message: "Error retrieving the users",
			});
		});
}); // WORKING

// /api/users/:id

router.post("/", (req, res) => {
	// do your magic!
	UserDb.insert(req.body)
		.then((user) => {
			res.status(201).json(user);
		})
		.catch((error) => {
			// log error to server
			console.log(error);
			res.status(500).json({
				message: "Error adding the hub",
			});
		});
}); // WORKING

router.post("/:id/posts", (req, res) => {
	// do your magic!
});

router.get("/:id", ifExists, (req, res) => {
	// do your magic!
	UserDb.getById(req.params.id)
		.then((user) => {
			res.status(200).json(user);
		})
		.catch((error) => {
			// log error to server
			console.log(error);
			res.status(500).json({
				message: "Error retrieving the result",
			});
		});
}); // WORKING

router.get("/:id/posts", (req, res) => {
	// do your magic!
});

router.delete("/:id", (req, res) => {
	// do your magic!
});

router.put("/:id", (req, res) => {
	// do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
	// do your magic!
}

function validateUser(req, res, next) {
	// do your magic!
}

function validatePost(req, res, next) {
	// do your magic!
}

module.exports = router;
