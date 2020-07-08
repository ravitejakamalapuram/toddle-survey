const imageThumbnail = require('image-thumbnail');

process.on("message", async (msg) => {
    if (msg == "kill_self") { process.exit(0); }

    // if the msg is url then do compress and send back thumbnail
    let options = { width: 50, height: 50, responseType: 'base64', jpegOptions: { force: true, quality: 90 } }
    try {
        const thumbnail = await imageThumbnail({ uri: msg }, options);
        process.send({ err: undefined, base64Img: thumbnail });
    } catch (err) {
        console.log(err)
        process.send({ err: err, base64Img: undefined });
    }
});

// worst case to close process in 10 minutes
setTimeout(function () {
    process.exit(0);
}, 600000);