const axios = require("axios").default;

module.exports = async function (token, code) {
	const options = {
		method: "POST",
		url: "https://www.warcraftlogs.com/api/v2/client",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		},
		data: {
			query: `query reportData {\n  reportData{\n    report(\n      code: "${code}"\n    ) {\n      fights {\n        keystoneLevel\n        keystoneAffixes\n        keystoneTime\n        name\n      }\n      masterData {\n        actors(type:"player") {\n          name\n          icon\n          subType\n        }\n      }\n    }\n  }\n}`,
			operationName: "reportData",
		},
	};
	return axios.request(options).then(function (response) {
		return response.data.data;
	}).catch(function (error) {
		console.error(error);
		throw error;
	});
};
