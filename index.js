const getAccesToken = require("./logsApi/accessToken");
const getReportData = require("./logsApi/reportData");
const Discord = require("discord.js");
const {
	getCompletionTime,
	getSpecName,
	getBackgroundUrl,
} = require("./logsApi/linkData");
const client = new Discord.Client();

client.on("ready", () => {
	console.log("online");
});

client.on("message", async (message) => {
	let reportCode;

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
            
		const relatedFight = reportData.report.rankings.data[0];
        const teamData = relatedFight.team;
        
		const beautifiedCombatLog = new Discord.MessageEmbed()
			.setColor("#edae1a")
			.setAuthor(
				relatedFight.encounter.name +
					" +" +
					relatedFight.bracketData +
					" (" +
					getCompletionTime(relatedFight.duration) +
					")",
				null,
				"https://www.warcraftlogs.com/reports/" + reportCode
			)
			.addField(
				"Players:",
				teamData.map(
					(item) => '**' + item.name + '**' + " (" + item.spec + ' ' + item.class + ")"
				),
				false
			)
            .setImage(getBackgroundUrl(relatedFight.encounter.name));
        message.channel.send(beautifiedCombatLog);
	} catch (error) {
		return console.log(error.message);
	}
});

client.login("ODAyMDg2MDMxNzI0OTA0NDg5.YAqG1A.LjMPbE1lbQj98lLTqdIqECMTP2U");