exports.up = function (knex) {
	return knex.schema.createTable("img", (tbl) => {
		tbl.increments("imgId").primary();
		tbl.string("originalname", 255).defaultTo("unknowman.png");
		tbl.string("filename", 255).defaultTo("unknowman.png");
		tbl.string("mimetype", 255).defaultTo("image/png");
		tbl.string("path", 255).defaultTo("public\\unknowman.png");
		tbl.integer("size", 255).defaultTo(2325);
	});
};

exports.down = function (knex) {
	return knex.schema.dropTableIfExists("userImage");
};
