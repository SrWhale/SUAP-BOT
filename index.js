require('dotenv/config');

// (async () => {
//     const browser = await puppeteer.launch({
//         executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
//     });

//     const page = await browser.newPage();

//     await page.goto('https://developer.chrome.com/', { waitUntil: 'networkidle2', timeout: 0 });

//     await page.setViewport({ width: 1920, height: 1080 });

//     await page.waitForSelector("#main-content > div > div.align-center.direction-column.display-flex.gap-top-500.grid-gap-500.masonry\:align-start.masonry\:direction-row > div:nth-child(1) > div:nth-child(2) > div.featured-card__thumbnail.gap-top-300 > a")

//     const grafic = await page.$("#main-content > div > div.align-center.direction-column.display-flex.gap-top-500.grid-gap-500.masonry\:align-start.masonry\:direction-row > div:nth-child(1) > div:nth-child(2) > div.featured-card__thumbnail.gap-top-300 > a");

//     const screenshot = await page.screenshot({ type: 'jpeg' });

//     console.log('finished!')

//     require('fs').writeFileSync('image.jpeg', screenshot)
// })()

const { Client } = require('./src/index.js');

const client = new Client();

client.login().then(() => {

    console.log('BOT LIGADO!');

    client.loadCommands();

    client.loadEvents();

    client.listenEvents();

    client.connectdatabase();

    client.loadModules()
})