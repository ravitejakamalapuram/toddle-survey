const sqlite3 = require('sqlite3').verbose();
const database = new sqlite3.Database("./toddle.db");

const init_tables = () => {
    const query = `
        CREATE TABLE IF NOT EXISTS users (username text PRIMARY KEY UNIQUE, password text);
        INSERT INTO users VALUES('username1','password1');
        INSERT INTO users VALUES('username2','password2');
        INSERT INTO users VALUES('username3','password3');
        INSERT INTO users VALUES('username4','password4');
        INSERT INTO users VALUES('username5','password5');

        CREATE TABLE IF NOT EXISTS surveys (username text PRIMARY KEY UNIQUE, password text);`;

    return database.run(query);
}
init_tables();

module.exports = {
    sqlite: database
};