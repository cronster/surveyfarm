const email_re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//https://emailregex.com/

export default (emails) => {
	const invalidEmails = emails
		.split(",")
		.map((email) => email.trim())
		.filter((email) => email_re.test(email) === false);

	if (invalidEmails.length) {
		var invalidList = invalidEmails.filter((el) => el != "");

		return `Invalid emails detected: ${invalidList}`;
	}
};
