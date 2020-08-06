const express = require("express");

const UserDb = require("./UserDb");
const PostDb = require("../posts/postDb");

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

router.get("/:id", validateUserId, (req, res) => {
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

router.get("/:id/posts", validateUserId, (req, res) => {
	// do your magic!
	UserDb.getUserPosts(req.params.id)
		.then((posts) => {
			res.status(200).json(posts);
		})
		.catch((error) => {
			// log error to server
			console.log(error);
			res.status(500).json({
				message: "Error getting the messages for the hub",
			});
		});
}); // WORKING

router.post("/", validateUser, (req, res) => {
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

router.post("/:id/posts", validatePost, (req, res) => {
	// do your magic!
	req.body.user_id = req.params.id;

	PostDb.insert(req.body)
		.then((result) => {
			res.status(210).send(result).end();
		})
		.catch((error) => {
			// log error to server
			console.log(error);
			res.status(500).json({
				message: "Error getting the messages for the post",
			});
		});
}); // WORKING

router.delete("/:id", validateUserId, (req, res) => {
	// do your magic!
	UserDb.remove(req.params.id)
		.then((count) => {
			res.status(200).json({ message: "The hub has been nuked" });
		})
		.catch((error) => {
			// log error to server
			console.log(error);
			res.status(500).json({
				message: "Error removing the hub",
			});
		});
}); // WORKING

router.put("/:id", (req, res) => {
	// do your magic!
	UserDb.update(req.params.id, req.body)
		.then((result) => {
			if (result) {
				res.status(200).json(result);
			} else {
				res.status(404).json({ message: "The user could not be found" });
			}
		})
		.catch((error) => {
			// log error to server
			console.log(error);
			res.status(500).json({
				message: "Error updating the user",
			});
		});
}); // WORKING

//custom middleware

function validateUserId(req, res, next) {
	// do your magic!
	UserDb.getById(req.params.id)
		.then((result) => {
			if (!result) {
				res.state(404).json({ error: "user ID validation error" });
			} else {
				next();
			}
		})
		.catch((err) => {
			res.status(500).json({ error: "ID validation getById error" });
		});
}

function validateUser(req, res, next) {
	// do your magic!
	if (!req.body.name) {
		res.status(404).json({ error: "create user validation error" });
	} else {
		next();
	}
}

function validatePost(req, res, next) {
	// do your magic!
	let post = req.body;
	if (!post.text) {
		res.status(500).json({ message: "post validation error" });
	} else {
		next();
	}
}

module.exports = router;
