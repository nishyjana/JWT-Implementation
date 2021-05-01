const router = require("express").Router();
const User = require("../users/users");
const {
	registerValidation,
	loginValidation,
} = require("../validation/validation");

router.post("/register", async (req, res) => {
	const { error } = registerValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
	});

	try {
        const userConfirmation = await User.findOne({ email: req.body.email });
        
		if (userConfirmation) return res.status(400).send("User already Exist");
        const saveduser = await user.save();
        
        res.send(saveduser);
        
	} catch (err) {
		res.status(400).send(err);
	}
});

router.post("/login", async (req, res) => {
	const { error } = loginValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const user = new User({
		email: req.body.email,
		password: req.body.password,
	});
	try {
		const userConfirmation = await User.findOne({ email: req.body.email });
		if (!userConfirmation) return res.status(400).send("User not Exist");
		res.send("logged in");
	} catch (err) {
		res.status(400).send(err);
	}
});

module.exports = router;
