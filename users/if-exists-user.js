const UserDb = require("./userDb");

module.exports = (req, res, next) => {
	// check that the hub is in the database
	// if it is, continue,
	// if not respond with 404
	UserDb.getById(req.params.id)
		.then((result) => {
			if (result) {
				next();
			} else {
				res.status(404).json({ message: "mw not found" });
			}
		})
		.catch((error) => {
			res.status(500).json({ error: error.message });
		});
};
