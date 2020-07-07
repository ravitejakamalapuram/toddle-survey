const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('toddle.db');

const init_tables = () => {
    db.serialize(function () {
        // surveys db
        db.run("CREATE TABLE IF NOT EXISTS survey (username text PRIMARY KEY UNIQUE, password text)");

        // users db
        db.run("CREATE TABLE IF NOT EXISTS users (username text PRIMARY KEY UNIQUE, password text)");
        for (let i = 1; i <= 10; i++) {
            db.run(`INSERT INTO users VALUES('username${i}','password${i}');`, function (err, res) { });
        }
    });
}

init_tables();

// db.all("SELECT * FROM users", function(err, res){
//     console.log(arguments)
// });

module.exports = {
    sqlite: db
};