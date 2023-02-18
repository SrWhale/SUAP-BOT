require('dotenv/config');

const { Client } = require('./src/index.js');

const client = new Client();

client.login().then(() => {

    console.log('BOT LIGADO!');

    client.loadCommands();

    client.loadEvents();

    client.listenEvents();

    client.connectdatabase();

    client.loadModules();
})