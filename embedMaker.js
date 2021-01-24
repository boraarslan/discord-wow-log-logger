const Discord = require("discord.js")
const {timeData, inTime} = require("./dungeonTimes")
const {
	getCompletionTime,
	getSpecName,
	getBackgroundUrl,
} = require("./logsApi/linkData");

/**
 * 
 * @param {Discord.Guild} guild 
 * @param {Object} data 
 * @param {String} reportCode 
 */
module.exports = (guild, data, reportCode) => {

    const relatedFight = data.report.rankings.data[0];
    const teamData = relatedFight.team;
    const timed = inTime(relatedFight.encounter.name, relatedFight.duration);
    const missedTime = getCompletionTime(timed < 3 ?
        //Next completion time
        relatedFight.duration - timeData[relatedFight.encounter.name][timed] * 1000 :
        //Previous completion time
        relatedFight.duration - timeData[relatedFight.encounter.name][timed - 1] * 1000)

    const embed = new Discord.MessageEmbed()
	embed.setColor("#edae1a")
		.setTitle(`${relatedFight.encounter.name} +**${relatedFight.bracketData}**`)
        .setURL("https://www.warcraftlogs.com/reports/" + reportCode + "#fight=last")
        .addField(
            teamData.map( item =>
                `${getIconEmoji(guild, `${item.class.toLowerCase()}_${item.spec.toLowerCase()}`)} **${item.name}**`
            ),
            '\u200B',
            true
        )
        .addField(
            `🕒 ${getCompletionTime(relatedFight.duration)}  **+${timed}**`,
            (timed < 3 ? `*Missed +${timed + 1} by ${missedTime}*` : `*Over time of ${missedTime}*`) + '\n\n'
            + `\:skull: **${relatedFight.deaths}**   *-${getCompletionTime(relatedFight.deaths * 5000)}*`,
            true
        )
        .setImage(getBackgroundUrl(relatedFight.encounter.name));
        
    return embed;

}

/**
 * @type {Discord.Emoji}
 * @param {Discord.Guild} guild 
 * @param {String} emojiName 
 */
const getIconEmoji = (guild, emojiName) => {

    return guild.emojis.cache.find(emoji => emoji.name === emojiName)

}