const { ClientCredentials } = require("simple-oauth2");
const fs = require("fs");

const config = {
	client: {
		id: "9277ee48-dbeb-4519-adb5-18051f951ad4",
		secret: "7WBGTl5hYmKIKz59unisu9I7XqzemOPkJHvLqlYV",
	},
	auth: {
		tokenHost: "https://www.warcraftlogs.com/oauth/token",
	},
};

module.exports = async function run() {
	const rawStaticTokenData = fs.readFileSync("token.json");
	const staticTokenData = JSON.parse(rawStaticTokenData);

	const staticTokenExpiresAt = Date.parse(staticTokenData.expires_at);
	const timeNow = new Date().getTime();

	if (staticTokenExpiresAt - timeNow <= 86400000) {
		try {
			
			const client = new ClientCredentials(config);
			const accessToken = await client.getToken();
			console.log(accessToken.token);
			fs.writeFileSync(JSON.stringify(accessToken.token, null, 2));

			return accessToken.token.access_token;
		} catch (error) {
			console.log("Access Token error", error.message);
			throw error.message;
		}
	} else {
		return staticTokenData.access_token;
	}
};
