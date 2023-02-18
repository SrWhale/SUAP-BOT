module.exports = class SUAPModule {
    constructor(client) {
        this.name = 'sitesync';

        this.client = client;

        this.controlling = new Map();
    }

    async start() {
        this.client.database.ref(`suap-login`).on('value', async (snapshot) => {

            Object.values(snapshot.val() || {}).filter(s => !this.controlling.has(s.user)).forEach(async s => {

                if (!s.user || s.authorized !== undefined) return;

                this.controlling.set(s.user, true);

                const login = await this.client.modules.suap.login(s.user, s.password);

                if (!login) {
                    this.client.database.ref(`suap-login/${s.user}/authorized`).set(false);
                    this.controlling.delete(s.user)
                } else {
                    this.controlling.delete(s.user)
                    this.client.database.ref(`suap-login/${s.user}/authorized`).set(true);

                    const ref = await this.client.database.ref(`AuthCodes/${s.code.split("/").reverse()[0]}`).once('value').then(res => res.val());

                    this.client.database.ref(`SUAP/${ref.chatId.replace(/[^0-9]/g, '')}`).set({
                        user: s.user,
                        password: s.password,
                        token: login.access,
                        chatId: ref.chatId,
                        refreshToken: login.refresh
                    });

                    const dados = await this.client.modules.suap.meusDados(login.access);

                    const turmas = {
                        'Técnico em Agropecuária': '🐄',
                        'Técnico em Florestas': '🌲',
                        'Técnico em Administração': '🛂'
                    };

                    this.client.database.ref(`AuthCodes/${s.code.split("/").reverse()[0]}`).remove();

                    return this.client.whatsapp.sendText(ref.chatId, `🤪 Login realizado com sucesso! Pode utilizar as outras funções. 🤪

                    📛 *Nome*: ${dados.nome_usual}
                    💡 *Matrícula*: ${dados.matricula}
                    ${turmas[dados.vinculo.curso]} *Curso*: ${dados.vinculo.curso}
                    ⛺ *Campus*: ${dados.vinculo.campus}
                    🪪 *CPF*: ${dados.cpf}`);
                }
            })
        });
    }
}