const { create, SimpleListener } = require('@open-wa/wa-automate');

SimpleListener.Message = 'onAnyMessage';

const { readdirSync } = require('fs');

module.exports = class Client {

    constructor() {
        this.eventsToListen = ['onAnyMessage'];

        this.commands = new Map();

        this.events = new Map();

        this.messageCollectors = new Map();

        this.modules = {};
    }

    async log(args) {
        console.log(args)
    };
    
    async login() {

        const client = await create({
            executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
            sessionId: "BOT",
            multiDevice: true,
            authTimeout: 60,
            blockCrashLogs: true,
            disableSpins: true,
            headless: true,
            hostNotificationLang: 'PT_BR',
            logConsole: false,
            popup: true,
            qrTimeout: 0,
        });

        this.whatsapp = client;

        return this;
    };

    async listenEvents() {
        this.eventsToListen.map(event => this.whatsapp[event](args => {

            const eventClass = require(`../events/${event}.js`);

            new eventClass(this).run(args);
        }))
    }

    loadCommands() {
        const commands = readdirSync('src/commands');

        commands.map(Command => {

            const command = new (require(`../commands/${Command}`))(this)

            this.commands.set(command.name, command);

            console.log(`Comando ${command.name} carregado.`)
        });
    }

    loadEvents() {
        const events = readdirSync('src/events');

        events.map(Event => {

            const event = new (require(`../events/${Event}`))(this)

            this.events.set(event.name, event);

            console.log(`Evento ${event.name} carregado.`)
        });
    }

    async loadModules() {
        const modules = readdirSync('src/modules/');

        modules.forEach(file => {
            const module = require(`../modules/${file}`);

            this.log(`[MODULES] - Módulo ${file} carregado`, { color: 'yellow' });

            const m = new module(this);

            m.start();

            this.modules[m.name] = m;
        })
    }

    async connectdatabase() {
        const firebase = require('firebase');

        firebase.initializeApp({
            apiKey: process.env.FIREBASE_API,
            authDomain: process.env.FIREBASE_DOMAIN,
            databaseURL: process.env.FIREBASE_URL,
            projectId: process.env.FIREBASE_PROJECTID,
            storageBucket: process.env.FIREBASE_STORAGE,
            messagingSenderId: process.env.FIREBASE_SENDER,
            appId: process.env.FIREBASE_APPID,
            measurementId: process.env.FIREBASE_MEASURE
        });

        this.database = firebase.database();
        return this.log(`[FIREBASE] - Firebase conectado com sucesso.`, { tags: ['Banco de dados'], color: 'green' })
    }
}