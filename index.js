const getAccesToken = require("./logsApi/accessToken");
const getReportData = require("./logsApi/reportData");
const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const embedMaker = require("./embedMaker");
const files = fs.readdirSync(__dirname);

client.on("ready", () => {
	console.log("online");
});

client.on("message", async (message) => {
	let reportCode;

	if (message.content == "pleasemakeemojis") {
		const emojiList = message.guild.emojis.cache;
		for (const file of files) {
			const emojiname = file.slice(0, -4);
			if (file == "index.js") continue;
			if (emojiList.find((element) => element.name == emojiname) != undefined) {
				console.log(`Already have ${emojiname}`);
				continue;
			}
			await message.guild.emojis
				.create(file, file.slice(0, -4))
				.then((emoji) =>
					console.log(`Created new emoji with name ${emoji.name}!`)
				)
				.catch(console.error);
		}
	}

	if (message.content.startsWith("https://www.warcraftlogs.com/reports/")) {
		reportCode = message.content.slice(37);
		if (reportCode.length >= 16) reportCode = reportCode.slice(0, 16);
		if (reportCode.length != 16) return;
	} else return;

	try {
		const botToken = await getAccesToken();
		const reportData = await getReportData(botToken, reportCode);

		if (reportData.report.rankings.data.length > 1)
			return message.reply(
				"Make sure your report contains only one dungeon report."
			);

		const embed = embedMaker(message.guild, reportData, reportCode)
		message.channel.send(embed);
		message.delete();
	} catch (error) {
		message.channel.send(error)
		return console.log(error)
	}
});

client.login("ODAyNDYwNjU1NTgzMTAwOTQ5.YAvjuQ.2-yg-TAl9h_JH14vKy-1KGxcR8Y");
//ODAyMDg2MDMxNzI0OTA0NDg5.YAqG1A.LjMPbE1lbQj98lLTqdIqECMTP2U