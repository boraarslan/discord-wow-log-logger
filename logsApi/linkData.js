const keyaffix = require('../configs/affixes.json');
const backgroundBaseUrl = 'https://cdnassets.raider.io/images/dungeons/expansion8/base/';
const staticAffixes = keyaffix.affixes;

const getBackgroundUrl = (mapName) => {
    return backgroundBaseUrl + mapName.toLowerCase().replace(/ /g,'-') + '.jpg';
}

const getClassImagePath = (className) => {
    return './classicons/' + className.toLowerCase() + '.jpg';
}

const getSpecName = (className) => {
    return className.slice(className.indexOf('-') + 1);
}

const getAffixData = (affixes) => {
    return affixes.map((element) => staticAffixes.find(item => item.id == element));
}

const getCompletionTime = (time) => {
    function msToTime(duration) {
        let milliseconds = parseInt((duration % 1000) / 100),
            seconds = Math.floor((duration / 1000) % 60),
            minutes = Math.floor((duration / (1000 * 60)) % 60),
            hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
      
        return (!hours) ? (minutes + ":" + seconds) : (hours + ":" + minutes + ":" + seconds);
    }
    return msToTime(time);
}

exports.getBackgroundUrl = getBackgroundUrl;
exports.getClassImagePath = getClassImagePath;
exports.getSpecName = getSpecName;
exports.getAffixData = getAffixData;
exports.getCompletionTime = getCompletionTime;