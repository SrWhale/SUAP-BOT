const randomstring = require("randomstring");

module.exports = class FigCommand {
    constructor(client) {

        this.name = 'suap';

        this.description = 'Comandos relacionados ao SUAP.'

        this.client = client;

        this.defaultURL = 'http://191.241.144.59:25565/accounts/login/';
    }

    async run(message, args) {
        if (!args[0]) return this.client.whatsapp.sendText(message.chatId, "Comando inválido. Utilize: !suap [login | minhasnotas | graficonotas]");

        if (args[0] === 'login') {

            const refString = await this.client.database.ref(`AuthCodes`).once('value').then(res => res.val() || {});

            const find = Object.values(refString).find(a => a.chatId === message.sender.id);

            if (find) return this.client.whatsapp.sendText(message.chatId, `Você já possui um link de autenticação. Acesse: ${this.defaultURL + find.code} `);

            const code = randomstring.generate(10);

            this.client.database.ref(`AuthCodes/${code}`).set({
                chatId: message.sender.id,
                code
            });
            return this.client.whatsapp.sendText(message.chatId, this.defaultURL + code);
        };

        const userDB = await this.client.database.ref(`SUAP/${message.sender.id.replace(/[^0-9]/g, '')}`).once('value').then((snapshot) => snapshot.val());

        if (!userDB) return this.client.whatsapp.sendText(message.chatId, "Você não está logado. Utilize o comando *!suap login* para logar-se.");

        if (args[0] === 'minhasnotas') {
            let notas = await this.client.modules.suap.minhasNotas(userDB.token);

            if (!notas) {
                const login = await this.client.modules.suap.login(userDB.user, userDB.password);

                if (!login) return this.client.whatsapp.sendText(message.chatId, "Não foi possível obter suas notas. Logue-se novamente com o comando *!suap login*.");

                userDB.token = login.access;

                await this.client.modules.suap.refreshToken(login.refreshToken);

                this.client.database.ref(`SUAP/${message.sender.id.replace(/[^0-9]/g, '')}`).update({
                    token: login.access,
                    refreshToken: login.refresh
                })

                notas = await this.client.modules.suap.minhasNotas(login.access);

                if (!notas) return this.client.whatsapp.sendText(message.chatId, "Não foi possível obter suas notas. Logue-se novamente com o comando *!suap login*.");
            }

            await this.client.modules.suap.refreshToken(userDB.refreshToken);

            return this.client.whatsapp.sendText(message.chatId, `${notas.map(nota => `*${nota.disciplina}*: ${nota.nota_etapa_1.nota || 0}`).join("\n")}`);
        };

        if (args[0] === 'graficonotas') {
            if (!userDB.user || !userDB.password) return this.client.whatsapp.sendText(message.chatId, "Você não está logado. Utilize o comando *!suap login* para logar-se.");

            const login = await this.client.modules.suap.login(userDB.user, userDB.password);

            if (!login) return this.client.whatsapp.sendText(message.chatId, "Ocorreu um erro com suas credenciais. Logue-se novamente com o comando *!suap login*.");

            this.client.whatsapp.sendText(message.chatId, "Aguarde, estou gerando o gráfico...");

            const grafico = await this.client.modules.suap.notasGrafico(userDB.user, userDB.password);

            return this.client.whatsapp.sendImage(message.chatId, `data:image/jpeg;base64,${grafico}`, 'grafico.jpeg', 'Gráfico de notas');
        }
    }
}