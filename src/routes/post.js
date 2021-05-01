const router = require("express").Router();
const verify = require('../validation/tokenVerification')

router.get("/",verify, (req, res) => {
	res.json({
		posts: {
			posts: {
				title: "my first post",
				description: "token working successfully",
			},
		},
	});
});

module.exports = router;
