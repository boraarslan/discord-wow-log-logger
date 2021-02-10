const Discord = require("discord.js");
const { timeData, inTime } = require("./dungeonTimes");
const { getCompletionTime, getSpecName, getBackgroundUrl } = require("./logsApi/linkData");

/**
 *
 * @param {Discord.Guild} guild
 * @param {Object} data
 * @param {String} reportCode
 */
module.exports = (guild, data, reportCode) => {
	const relatedFight = data.report.rankings.data[0];
	const rawTeamData = relatedFight.team;
	let teamData = [];
	teamData[0] = rawTeamData.find((element) => element.role == "Tank");
	teamData[1] = rawTeamData.find((element) => element.role == "Healer");
	const dpsTeamData = rawTeamData.filter((element) => element.role == "DPS");
	const chestCount = inTime(relatedFight.encounter.name, relatedFight.duration);
	let nextTime;
	let previousTime;
	if (chestCount < 3)
		nextTime = getCompletionTime(
			relatedFight.duration - timeData[relatedFight.encounter.name][chestCount] * 1000
		);

	if (chestCount > 0)
		previousTime = getCompletionTime(
			(timeData[relatedFight.encounter.name][chestCount - 1] * 1000) - relatedFight.duration
		);

	const embed = new Discord.MessageEmbed();
	embed
		.setColor("#edae1a")
		.setTitle(`${relatedFight.encounter.name} +**${relatedFight.bracketData}**`)
		.setURL("https://www.warcraftlogs.com/reports/" + reportCode + "#fight=last")
		.addField(
			teamData.map(
				(item) =>
					`${getIconEmoji(guild, `${item.class.toLowerCase()}_${item.spec.toLowerCase()}`)}` +
					`**${item.name} (${item.spec} ${item.class})**`
			),
			dpsTeamData.map(
				(item) =>
					`${getIconEmoji(guild, `${item.class.toLowerCase()}_${item.spec.toLowerCase()}`)}` +
					`**${item.name}** **(${item.spec} ${item.class})**`
			),
			true
		)
		.addField(
			`🕒 ${getCompletionTime(relatedFight.duration)}  **+${chestCount}**`,
			    (chestCount < 3 ? `*Missed +${chestCount + 1} by ${nextTime}*` : ``) +
				(chestCount > 0 ? `\n*Over time by ${previousTime}*` : ``) +
				"\n\n" +
				`\:skull: **${relatedFight.deaths}**   *-${getCompletionTime(relatedFight.deaths * 5000)}*`,
			true
		)
		.setImage(getBackgroundUrl(relatedFight.encounter.name))
		.setFooter(new Date(data.report.startTime));

	return embed;
};

/**
 * @type {Discord.Emoji}
 * @param {Discord.Guild} guild
 * @param {String} emojiName
 */
const getIconEmoji = (guild, emojiName) => {
	return guild.emojis.cache.find((emoji) => emoji.name === emojiName);
};
