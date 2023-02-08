const { decryptMedia } = require('@open-wa/wa-automate');

const mime = require('mime-types');

module.exports = class FigCommand {
    constructor(client) {

        this.name = 'fig';

        this.description = 'Transforma uma imagem em figurinha.'

        this.client = client;
    }

    async run(message) {
        if (message.body === message.text) return this.client.whatsapp.sendText(message.chatId, "Manda uma imagem, poxa. :(");

        const mediaData = await decryptMedia(message);

        const imageBase64 = `data:${message.mimetype};base64,${mediaData.toString(
            'base64'
        )}`;

        this.client.whatsapp.sendImageAsSticker(message.chatId, imageBase64, {
            author: 'Paulin Bacana ',
            pack: 'Aleatórias'
        });
    }
}