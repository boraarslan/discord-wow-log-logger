let timeData = {
	"De Other Side": [2400, 1920, 1440],
	"Halls of Atonement": [1860, 1488, 1116],
	"Mists of Tirna Scithe": [1800, 1440, 1080],
	"Plaguefall": [2280, 1824, 1358],
	"Sanguine Depths": [2460, 1968, 1476],
	"Spires of Ascension": [2340, 1872, 1404],
	"The Necrotic Wake": [2160, 1728, 1296],
	"Theater of Pain": [2220, 1776, 1332],
};

module.exports = {
	inTime: (dungeonName, time) => {
		if (timeData[dungeonName] == undefined) throw "Dungeon not found.";

		inTime = 0;
		for (i = 0; i < 3; i++)
			if (time < timeData[dungeonName][i] * 1000) inTime++;

		return inTime;
	},
	timeData,
};
