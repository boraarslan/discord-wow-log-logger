const { ClientCredentials } = require("simple-oauth2");
const fs = require("fs");
const dotenv = require("dotenv").config();

const config = {
	client: {
		id: process.env.WL_CLIENT_SECRET,
		secret: process.env.WL_CLIENT_ID,
	},
	auth: {
		tokenHost: "https://www.warcraftlogs.com/oauth/token",
	},
};

//This code should be rewritten to get just the access token and not
//requesting token. this is just lazy and might cause tons of errors
//later in the future

module.exports = async () => {
	const rawStaticTokenData = fs.readFileSync("token.json");
	const staticTokenData = JSON.parse(rawStaticTokenData);

	const staticTokenExpiresAt = Date.parse(staticTokenData.expires_at);
	const timeNow = new Date().getTime();

	if (staticTokenExpiresAt - timeNow <= 86400000) {
		try {
			
			const client = new ClientCredentials(config);
			const accessToken = await client.getToken();
			console.log(accessToken.token);
			fs.writeFileSync("../token.json", JSON.stringify(accessToken.token, null, 2));

			return accessToken.token.access_token;
		} catch (error) {
			console.log("Access Token error", error.message);
			throw error.message;
		}
	} else {
		return staticTokenData.access_token;
	}
};
