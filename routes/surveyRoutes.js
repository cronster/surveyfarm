const _ = require("lodash");
const Path = require("path-parser");
const { URL } = require("url");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");
const Survey = mongoose.model("surveys");

module.exports = (app) => {
	app.get("/api/surveys", requireLogin, async (req, res) => {
		const surveys = await Survey.find({ _user: req.user.id }).select({
			recipients: false,
		});
		res.send(surveys);
	});

	app.get("/api/surveys/:surveyId/:choice", (req, res) => {
		res.send(
			"Thank you for your feedback! Your response has been recorded."
		);
	});
	app.post("/api/surveys/webhooks", (req, res) => {
		/*
		const event = _.map(req.body, (event) => {
			const pathname = new URL(event.url).pathname;
			const p = new Path("/api/surveys/:surveyId/:choice");
			const match = p.test(pathname);
			if (match) {
				return {
					email: event.email,
					surveyId: match.surveyID,
					choice: match.choice,
				};
			}
		});

		const compactEvents = _.compact(event); //Removes undefined elements
		const uniqueEvents = _.uniqBy(compactEvents, "email", "surveyId");
		*/

		// Refactored using lodash chaining
		const p = new Path("/api/surveys/:surveyId/:choice");

		_.chain(req.body)
			.map(({ email, url }) => {
				console.log(url);
				const match = p.test(new URL(url).pathname);
				if (match) {
					return {
						email,
						surveyId: match.surveyId,
						choice: match.choice,
					};
				}
			})

			.compact() //Removes undefined elements
			.uniqBy("email", "surveyId")
			//DB update
			.each(({ surveyId, email, choice }) => {
				Survey.updateOne(
					{
						_id: surveyId,
						recipients: {
							$elemMatch: {
								email: email,
								responded: false,
							},
						},
					},
					{
						$inc: { [choice]: 1 },
						$set: { "recipients.$.responded": true },
						lastResponded: new Date(),
					}
				).exec();
			})
			.value();

		res.send({});
	});
	app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
		const { title, subject, body, recipients } = req.body;
		const survey = new Survey({
			title, // title:title
			subject,
			body,
			recipients: recipients.split(",").map((email) => {
				return { email: email.trim(), responded: false };
			}),
			_user: req.user.id,
			dateSent: Date.now(),
		});

		//Send email
		const mailer = new Mailer(survey, surveyTemplate(survey));
		try {
			await mailer.send();
			await survey.save();
			req.user.credits -= 1;
			const user = await req.user.save();
			res.send(user);
		} catch (err) {
			res.status(422).send(err);
		}
	});
};