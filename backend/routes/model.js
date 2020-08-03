const db = require("../data/db-config");

module.exports = {
	getImg,
	saveImg,
};

function getImg(imgId) {
	return db("img").where({ imgId }).first();
}
function saveImg(imgId, changes) {
	return db("img")
		.where({ imgId })
		.update(changes)
		.then((count) => (count > 0 ? getUpdatedImg(imgId) : null));
}
function getUpdatedImg(imgId) {
	return db("img").where({ imgId }).first();
}
