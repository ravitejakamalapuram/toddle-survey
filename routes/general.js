const router = require("express").Router();
const { fork } = require("child_process");
const path = require("path");

// asynchronus imgage thumbnail generator
router.get("/Thumbnail", async function (req, res) {
    const forked = fork(path.join(__dirname, "../utils/image-compress.js"));
    forked.send(req.query.url);

    // on message received form forked child kill cild and send thumbnail
    forked.on("message", (message) => {
        forked.send("kill_self");

        if (message.err) {
            return res.status(500).send({ msg: "Erro with Thumbnail Api!", err: message.err })
        }

        // if image data send image data
        var img = Buffer.from(message.base64Img, 'base64');
        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': img.length
        });
        res.end(img);
    });
});

module.exports = router;