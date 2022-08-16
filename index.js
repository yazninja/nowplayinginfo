import writeFile from 'fs'
const path = require("path")

module.exports = class nowPlayingPlugin {
    constructor(env) {
        // Define plugin enviornment within the class
        this.env = env
    }

    // Called when the backend is ready
    onReady(win) {
        writeFile(`${this.env.dir}/artist.txt`, "READY");
    }

    // Called when the renderer is ready (app.init())
    onRendererReady(win) {
        console.log("\n\n\n [nowPlayingInfoPlugin] Ready \n\n\n");
    }
    onPlaybackStateDidChange(attributes) {

        writeFile(`${this.env.dir}/artist.txt`, attributes.artistName, (err) => {
            if (err) throw err;
            console.log('The artist has been saved!');
        })
        writeFile(`${this.env.dir}/title.txt`, attributes.name, (err) => {
            if (err) throw err;
            console.log('The song has been saved!');
        })
        writeFile(`${this.env.dir}/album.txt`, attributes.albumName, (err) => {
            if (err) throw err;
            console.log('The album has been saved!');
        })

        // console.log("Artist:", attributes.artistName);
        // console.log("Album:", attributes.albumName);
        // console.log("Track:", attributes.name);
        console.log("Album Artwork", attributes.artwork.url.replace('{h}', attributes.artwork.height).replace('{w}', attributes.artwork.width));
    }
}
