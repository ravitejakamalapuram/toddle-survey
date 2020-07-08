const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('toddle.db');

const init_tables = () => {
    db.serialize(function () {
        // surveys db
        db.run("CREATE TABLE IF NOT EXISTS surveys (survey_id text NOT NULL, q_id integer NOT NULL, question text, true integer DEFAULT 0, false integer DEFAULT 0)");

        // users db
        db.run("CREATE TABLE IF NOT EXISTS users (username text PRIMARY KEY UNIQUE, password text)");
        for (let i = 1; i <= 100; i++) {
            db.run(`INSERT INTO users VALUES('username${i}','password${i}');`, function (err, res) { });
            db.run(`INSERT INTO surveys VALUES('s_id_${Math.floor(i/10)}','q_id_${i}', 'question_${i}', 0, 0);`, function (err, res) {  });
        }
    });
}

init_tables();

// db.all("SELECT * FROM surveys", function(err, res){
//     console.log(arguments)
// });

module.exports = {
    sqlite: db
};