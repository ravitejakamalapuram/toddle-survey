const sqlite3 = require('sqlite3').verbose();
const database = new sqlite3.Database("./my.db");

const init_tables = () => {
    const query = `
        CREATE TABLE IF NOT EXISTS contacts (
        id integer PRIMARY KEY,
        firstName text,
        lastName text,
        email text UNIQUE)`;
    return database.run(query);
}
init_tables();

module.exports = {
    sqlite: database
};