exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex("img")
		.del()
		.then(function () {
			// Inserts seed entries
			return knex("img").insert([
				{
					imgId: 1,
					originalname: "unknowman.png",
					filename: "unknowman.png",
					mimetype: "image/png",
					path: "public\\unknowman.png",
					size: 2325,
				},
			]);
		});
};
