const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripSecretKey);
const requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
	app.post("/api/stripe", requireLogin, async (req, res) => {
		// For indian customers this needs to be done. More info here: https://stripe.com/docs/india-exports
		const customer = await stripe.customers.create({
			name: "JohnDoe",
			address: {
				line1: "510 Townsend St",
				postal_code: "98140",
				city: "San Francisco",
				state: "CA",
				country: "US"
			},
			source: req.body.id
		});

		const charge = await stripe.charges.create({
			amount: 500,
			currency: "usd",
			description: "credits charged.",
			customer: customer.id
		});

		req.user.credits += 5;
		const user = await req.user.save();
		res.send(user);
	});
};
