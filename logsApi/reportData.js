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
			query: `
			query reportData {
				reportData{
					report(
						code: "${code}"
					) {
						graph(dataType:DamageDone, startTime:0 , endTime:999999999)
						rankings(compare:Parses)
						startTime
					}
				}
			}`,
			operationName: "reportData",
		},
	};
	return axios
		.request(options)
		.then(function (response) {
			return response.data.data.reportData;
		})
		.catch(function (error) {
			console.error(error);
			throw error;
		});
};
