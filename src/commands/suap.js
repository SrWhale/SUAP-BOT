module.exports = class FigCommand {
    constructor(client) {

        this.name = 'suap';

        this.description = 'Comandos relacionados ao SUAP.'

        this.client = client;
    }

    async run(message, args) {
        if (!args[0]) return this.client.whatsapp.sendText(message.chatId, "Comando inválido. Utilize: !suap [login | minhasnotas]");

        if (args[0] === 'login') {
            const [user, password] = args.slice(1)

            if (!user || !password) return this.client.whatsapp.sendText(message.chatId, "Informe um usuário e senha válidos.");

            const login = await this.client.modules.suap.login(user, password);

            if (!login) return this.client.whatsapp.sendText(message.chatId, "Usuário ou senha inválidos.");

            const dados = await this.client.modules.suap.meusDados(login.access);

            this.client.database.ref(`SUAP/${message.sender.id.replace(/[^0-9]/g, '')}`).set({
                user,
                password,
                token: login.access,
                chatId: message.sender.id
            });

            const turmas = {
                'Técnico em Agropecuária': '🐄',
                'Técnico em Florestas': '🌲',
                'Técnico em Administração': '🛂'
            };

            return this.client.whatsapp.sendText(message.chatId, `🤪 Login realizado com sucesso! Pode utilizar as outras funções. 🤪
            
            📛 *Nome*: ${dados.nome_usual}
            💡 *Matrícula*: ${dados.matricula}
            ${turmas[dados.vinculo.curso]} *Curso*: ${dados.vinculo.curso}
            ⛺ *Campus*: ${dados.vinculo.campus}
            🪪 *CPF*: ${dados.cpf}`);
        };

        const userDB = await this.client.database.ref(`SUAP/${message.sender.id.replace(/[^0-9]/g, '')}`).once('value').then((snapshot) => snapshot.val() || {});

        if (args[0] === 'minhasnotas') {
            let notas = await this.client.modules.suap.minhasNotas(userDB.token);

            if (!notas) {
                const login = await this.client.modules.suap.login(userDB.user, userDB.password);

                if (!login) return this.client.whatsapp.sendText(message.chatId, "Não foi possível obter suas notas. Logue-se novamente com o comando *!suap login*.");

                userDB.token = login.access;

                this.client.database.ref(`SUAP/${message.sender.id.replace(/[^0-9]/g, '')}`).update({
                    token: login.access
                })

                notas = await this.client.modules.suap.minhasNotas(login.access);

                if (!notas) return this.client.whatsapp.sendText(message.chatId, "Não foi possível obter suas notas. Logue-se novamente com o comando *!suap login*.");
            }

            return this.client.whatsapp.sendText(message.chatId, `${notas.map(nota => `*${nota.disciplina}*: ${nota.nota_etapa_1.nota || 0}`).join("\n")}`);
        };

        if (args[0] === 'graficonotas') {
            if (!userDB.user || !userDB.password) return this.client.whatsapp.sendText(message.chatId, "Você não está logado. Utilize o comando *!suap login* para logar-se.");

            const login = await this.client.modules.suap.login(userDB.user, userDB.password);

            if (!login) return this.client.whatsapp.sendText(message.chatId, "Ocorreu um erro com suas credenciais. Logue-se novamente com o comando *!suap login*.");

            this.client.whatsapp.sendText(message.chatId, "Aguarde, estou gerando o gráfico...");

            const grafico = await this.client.modules.suap.notasGrafico(userDB.user, userDB.password);

            return this.client.whatsapp.sendImage(message.chatId, `data:image;base64,${Buffer.from(grafico).toString(
                'base64'
            )}`, 'grafico.jpeg', 'Gráfico de notas');
        }
    }
}