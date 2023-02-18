const { Collection } = require("@open-wa/wa-automate/dist/structures/Collector");

module.exports = class suapNotification {
    constructor(client) {
        this.client = client;
    }

    async start() {
        this.turmas();

        this.boletim();
    };

    async turmas() {
        const turmasCache = new Collection();

        const func = async () => {
            const users = await this.client.database.ref('SUAP').once('value').then(res => res.val() || {});

            for (const user of Object.values(users)) {
                await new Promise(async resolve => {
                    let turmas = await this.client.modules['suap'].minhasTurmas(user.token);

                    if (!turmas) {
                        const login = await this.client.modules['suap'].login(user.user, user.password);

                        if (!login) {
                            this.client.whatsapp.sendText(user.chatId, "Não foi possível obter suas turmas. Logue-se novamente com o comando *!suap login*.");

                            this.client.database.ref(`SUAP/${user.chatId.replace(/[^0-9]/g, '')}`).remove();

                            return resolve(false)
                        };

                        user.token = login.access;

                        this.client.database.ref(`SUAP/${user.chatId.replace(/[^0-9]/g, '')}`).update({
                            token: login.access
                        });

                        turmas = await this.client.modules['suap'].minhasTurmas(login.access);

                        if (!turmas) {
                            this.client.whatsapp.sendText(user.chatId, "Não foi possível obter suas turmas. Logue-se novamente com o comando *!suap login*.");

                            this.client.database.ref(`SUAP/${user.chatId.replace(/[^0-9]/g, '')}`).remove();

                            return resolve(false);
                        };
                    };
                    turmas.forEach(t => {
                        if (!turmasCache.get(t.id)) turmasCache.set(t.id, { ...t, usersIn: [user] })
                        else if (!turmasCache.get(t.id).usersIn.find(u => u.user === user.user)) turmasCache.get(t.id).usersIn.push(user);
                    });

                    resolve(true)
                });
            };

            for (const tu of turmasCache.map(t => t)) {

                await new Promise(async resolve => {
                    const turma = await this.client.modules['suap'].getTurma(tu.usersIn[0].token, tu.id);

                    if (!tu.materiais_de_aula?.length) {
                        tu.materiais_de_aula = turma.materiais_de_aula
                    }

                    const findMaterial = turma.materiais_de_aula.filter(material => !tu.materiais_de_aula.find(m => m.url === material.url));

                    findMaterial.forEach(material => {
                        tu.usersIn.forEach(u => {
                            this.client.whatsapp.sendFileFromUrl(u.chatId, `https://suap.ifbaiano.edu.br${material.url}`, material.url.slice(-15), `⚠️ ALERTA DE MATERIAIS ⚠️\n\nFoi postado um novo material na disciplina *${turma.componente_curricular.trim()}*`)
                        })
                    });

                    turmasCache.set(tu.id, { ...turma, usersIn: tu.usersIn });

                    resolve(true)
                })
            }
        }

        func();

        setInterval(() => {
            func();
        }, 30000);
    }

    async boletim() {

        const notasCache = new Map();

        const func = async () => {
            const users = await this.client.database.ref('SUAP').once('value').then(res => res.val() || {});

            for (const user of Object.values(users)) {

                await new Promise(async resolve => {
                    let notas = await this.client.modules['suap'].getBoletim(user.token);

                    if (!notas) {
                        const login = await this.client.modules['suap'].login(user.user, user.password);

                        if (!login) {
                            this.client.whatsapp.sendText(user.chatId, "Não foi possível obter suas notas. Logue-se novamente com o comando *!suap login*.");

                            this.client.database.ref(`SUAP/${user.chatId.replace(/[^0-9]/g, '')}`).remove();

                            return resolve(false)
                        };

                        user.token = login.access;

                        this.client.database.ref(`SUAP/${user.chatId.replace(/[^0-9]/g, '')}`).update({
                            token: login.access
                        });

                        notas = await this.client.modules['suap'].getBoletim(login.access);

                        if (!notas) {
                            this.client.whatsapp.sendText(user.chatId, "Não foi possível obter suas notas. Logue-se novamente com o comando *!suap login*.");

                            this.client.database.ref(`SUAP/${user.chatId.replace(/[^0-9]/g, '')}`).remove();

                            return resolve(false);
                        }
                    };

                    const last = notasCache.get(user.chatId);

                    if (last) {
                        last.forEach(nota => {

                            if (nota.nota_etapa_1.nota != notas.find(n => n.disciplina == nota.disciplina).nota_etapa_1.nota)
                                this.client.whatsapp.sendText(user.chatId, `⚠️ ALERTA DE BOLETIM ⚠️\n\nA nota da disciplina *${nota.disciplina}* foi alterada de *${nota.nota_etapa_1.nota || 0}* para *${notas.find(n => n.disciplina == nota.disciplina).nota_etapa_1.nota || 0}*.`);

                            if (nota.numero_faltas < notas.find(n => n.disciplina == nota.disciplina).numero_faltas) {
                                this.client.whatsapp.sendText(user.chatId, `⚠️ ALERTA DE FALTAS ⚠️\n\nForam adicionadas *${notas.numero_faltas - nota.numero_faltas}* faltas na disciplina *${nota.disciplina}*.`);
                            }
                        });

                        notasCache.set(user.chatId, notas);

                    } else notasCache.set(user.chatId, notas);

                    resolve(true);
                })
            }
        };

        func();

        setInterval(() => {
            func();
        }, 60000);
    }
}