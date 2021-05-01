const router = require("express").Router();
const User = require("../users/users");
const bycrypt = require("bcrypt");
const {
	registerValidation,
	loginValidation,
} = require("../validation/validation");

router.post("/register", async (req, res) => {
	const { error } = registerValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

    const salt = await bycrypt.genSalt(10);
    const hashPassword = await bycrypt.hash(req.body.password, salt)
	const user = new User({
		name: req.body.name,
		email: req.body.email,
        password: hashPassword,
        salt: salt,
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
        const validate = await bycrypt.compare(req.body.password, userConfirmation.password)
        if (!validate) return res.status(400).send('Invalid Password')

		res.send( `Welcome ${userConfirmation.name}`);
	} catch (err) {
		res.status(400).send(err);
	}
});

module.exports = router;
