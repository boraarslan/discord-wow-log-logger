const getAccesToken = require('./accessToken');
const getReportData = require('./reportData');

const main = async () => {
    try {
        const botToken = await getAccesToken();
        const reportData = await getReportData(botToken, "tjyFqnz46mNgpQDX");
    } catch (error) {
        return console.log(error.message);
    }
}

main();