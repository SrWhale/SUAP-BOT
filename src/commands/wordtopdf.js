const { decryptMedia } = require('@open-wa/wa-automate');

const mime = require('mime-types');

const { readSync, writeFileSync, unlinkSync } = require('fs');

const convertapi = require('convertapi')('HPGcHmRGteBRm1Rh');

module.exports = class WordToPdf {
    constructor(client) {

        this.name = 'wordtopdf';

        this.description = 'Converte um arquivo word para PDF.'

        this.client = client;
    }

    async run(message, args) {
        console.log('runned')
        await this.client.whatsapp.sendText(message.chat, 'Por favor, envie abaixo o arquivo que irei converter para PDF.');

        const collector = this.client.whatsapp.createMessageCollector(message, (m) => m.sender.id === message.sender.id, {
            max: 1,
            time: 30000,
            errors: ['time']
        });

        collector.on('collect', async msg => {

            const filename = msg.filename;

            //if (!['doc', 'word', 'docs', 'docx'].includes(mime.extension(msg.mimetype))) return this.client.whatsapp.sendText(message.chatId, 'Suporto apenas arquios word!');

            const mediaData = await decryptMedia(msg);

            writeFileSync(filename, mediaData);

            convertapi.convert('pdf', {
                File: filename
            }).then((res) => {

                unlinkSync(filename);

                this.client.whatsapp.sendFileFromUrl(message.chatId, res.file.url, res.file.fileName, false, msg.id);
            });
        })
    }
}