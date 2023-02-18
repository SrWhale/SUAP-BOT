module.exports = class HelpCommand {
    constructor(client) {

        this.name = 'help';

        this.description = 'Veja a lista de comandos.'

        this.client = client;
    }

    async run(message) {
        const cmds = [...this.client.commands.values()];

        const help = cmds.map(cmd => {
            return `*!${cmd.name}*: ${cmd.description}`
        }).join("\n");

        this.client.whatsapp.sendText(message.chatId, `Lista de comandos:\n\n${help}`);
    }
}