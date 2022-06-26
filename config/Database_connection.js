const knex = require("knex")({
    client: "mysql",
    connection: {
        host: "localhost",
        user: "root",
        password: "Praveen@123",
        database: "aadarsh"
    }
})

knex.schema.createTable("Testing", table => {
    table.increments("id").primary();
    table.string("name")
    table.string("email")
    table.string("password")
}).then((result) => {
    console.log("create_table");
}).catch((err) => {
    // console.log(err);
});

knex.schema.createTable("image_portel", table => {
    table.increments("id").primary()
    table.integer("testingId").unsigned().nullable()
    table.string("avatar")
    table.string("cloudinary_id")
    table.foreign("testingId").references("Testing.id")

}).then((result) => {
    console.log("create_table1");
}).catch((err) => {
    // console.log(err.message);
});

module.exports = knex