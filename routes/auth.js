const router = require("express").Router();
const db = require("../utils/sqlite").sqlite;
let _auth = require("../middlewares/auth")

router.post("/Authentication", function (req, res) {
    /* placeholders are used in order to avoid SQL injection attcks */
    db.all(`SELECT * FROM users WHERE username = $username AND password = $password`, {
        $username: req.body.username,
        $password: req.body.password
    }, function (err, response) {
        if (err) { return res.status(500).send({ msg: "Erro with Login Api!", err: err }); }

        // check for only one result record for additional security
        if (response && response.length == 1) {
            let token = _auth.getJwtToken({ "username": response.username });
            /* token ios sent over both cokkie and as a response for flexibility */
            res.cookie("token", token, { sameSite: true, overwrite: true }).send({ "token": token });
        } else {
            return res.status(500).send({ msg: "Please check you ID / Password !" });
        }
    });
});

module.exports = router;