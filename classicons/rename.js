const fs = require("fs");
const files = fs.readdirSync(__dirname);

for (const file of files) {
	fs.rename(
		__dirname + "/" + file,
		__dirname + "/" + file.toLowerCase(),
		(err) => {
			if (err) console.log(err);
		}
	);
}
