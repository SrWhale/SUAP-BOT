module.exports = class onMessage {
    constructor(client) {
        this.name = 'onAnyMessage';

        this.client = client;
    }

    async run(message) {

        if (!message.text.startsWith('!')) return;

        const args = message.text.split(" ").slice(1);

        const cmd = this.client.commands.get(message.text.split(" ")[0].replace("!", ''));

        if (cmd) cmd.run(message, args)
    }
}