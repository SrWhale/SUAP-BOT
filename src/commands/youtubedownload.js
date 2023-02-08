const ytdl = require('ytdl-core');

const fs = require('fs');

const ffmpeg = require('ffmpeg-static');

const cp = require('child_process');

module.exports = class youtubeDownloadCommand {
    constructor(client) {

        this.name = 'youtubedownload';

        this.description = 'Baixa um vídeo do youtube.'

        this.client = client;
    }

    async run(message, args) {

        if (fs.existsSync(`output-${message.sender.id}.mp4`)) return this.client.whatsapp.reply(message.chatId, 'Você já está baixando um vídeo!', message.id);

        if (!message.text) return this.client.whatsapp.reply(message.chatId, 'Você precisa inserir o link do vídeo!', message.id);

        const url = args[0];

        const check = ytdl.validateURL(url);

        if (!check) return this.client.whatsapp.reply(message.chatId, 'Link inválido!', message.id);

        await this.client.whatsapp.reply(message.chatId, 'Baixando vídeo...', message.id);

        const info = await ytdl.getBasicInfo(url);

        const video = ytdl(url, { quality: '136' });

        const audio = ytdl(url, { quality: 'highestaudio' });

        const ffmpegProcess = cp.spawn(ffmpeg, [
            '-loglevel', '8', '-hide_banner',
            '-progress', 'pipe:3',
            '-i', 'pipe:4',
            '-i', 'pipe:5',
            '-map', '0:a',
            '-map', '1:v',
            '-c:v', 'copy',
            `output-${message.sender.id}.mp4`,
        ], {
            windowsHide: true,
            stdio: [
                'inherit', 'inherit', 'inherit',
                'pipe', 'pipe', 'pipe',
            ],
        });
        ffmpegProcess.on('close', () => {

            const file = fs.readFileSync(`output-${message.sender.id}.mp4`);

            const data = `data:application/mp4;base64,${file.toString(
                'base64'
            )}`;

            this.client.whatsapp.sendImage(message.chatId, data, info.videoDetails.title + '.mp4');

            fs.unlinkSync(`output-${message.sender.id}.mp4`);
        });

        audio.pipe(ffmpegProcess.stdio[4]);
        video.pipe(ffmpegProcess.stdio[5]);
    }
}