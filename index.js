const writeFileSync = require('fs').writeFileSync;
const appendFileSync = require('fs').appendFileSync;
const existsSync = require('fs').existsSync;
const mkdirSync = require('fs').mkdirSync;
const https = require('node:https');
// import{ default as path } from 'path'

module.exports = class nowPlayingPlugin {
    constructor(env) {
        // Define plugin enviornment within the class
        this.env = env
    }

    // Called when the backend is ready
    onReady(win) {

    }

    // Called when the renderer is ready (app.init())
    onRendererReady(win) {
        console.log("\n\n\n [nowPlayingInfoPlugin] Ready \n\n\n");
    }
    onPlaybackStateDidChange(attributes) {
        if (!existsSync(`${this.env.dir}/dist`)) {
            mkdirSync(`${this.env.dir}/dist`);
        }
        let artworkURL = attributes.artwork.url.replace('{h}', attributes.artwork.height).replace('{w}', attributes.artwork.width);
        writeFileSync(`${this.env.dir}/dist/title.txt`, attributes.name)
        console.log('The title has been saved!')
        writeFileSync(`${this.env.dir}/dist/artist.txt`, attributes.artistName)
        console.log('The artist has been saved!')
        writeFileSync(`${this.env.dir}/dist/album.txt`, attributes.albumName)
        console.log('The album has been saved!')

        https.get(artworkURL, (res) => {
            writeFileSync(`${this.env.dir}/dist/artwork.jpg`, "")
            console.log('statusCode:', res.statusCode);
            console.log('headers:', res.headers);
            res.on('data', (d) => {
                appendFileSync(`${this.env.dir}/dist/artwork.jpg`, d)
            }).on('error', (e) => {
                console.error(e);
            }).on('end', () => {
                console.log('The artwork has been saved!')
            })
        });
    }
    onNowPlayingItemDidChange(attributes) {
        if (!existsSync(`${this.env.dir}/dist`)) {
            mkdirSync(`${this.env.dir}/dist`);
        }
        let artworkURL = attributes.artwork.url.replace('{h}', attributes.artwork.height).replace('{w}', attributes.artwork.width);
        writeFileSync(`${this.env.dir}/dist/title.txt`, attributes.name)
        console.log('The title has been saved!')
        writeFileSync(`${this.env.dir}/dist/artist.txt`, attributes.artistName)
        console.log('The artist has been saved!')
        writeFileSync(`${this.env.dir}/dist/album.txt`, attributes.albumName)
        console.log('The album has been saved!')

        https.get(artworkURL, (res) => {
            writeFileSync(`${this.env.dir}/dist/artwork.jpg`, "")
            console.log('statusCode:', res.statusCode);
            console.log('headers:', res.headers);
            res.on('data', (d) => {
                appendFileSync(`${this.env.dir}/dist/artwork.jpg`, d)
            }).on('error', (e) => {
                console.error(e);
            }).on('end', () => {
                console.log('The artwork has been saved!')
            })
        });
    }
    onBeforeQuit() {
        writeFileSync(`${this.env.dir}/dist/title.txt`, "")
        writeFileSync(`${this.env.dir}/dist/artist.txt`, "")
        writeFileSync(`${this.env.dir}/dist/album.txt`, "")
        writeFileSync(`${this.env.dir}/dist/artwork.jpg`, "")
    }
}
