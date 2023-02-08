const axios = require('axios');

const puppeteer = require('puppeteer');

module.exports = class SUAPModule {
    constructor(client) {
        this.name = 'suap';

        this.client = client;

        this.defaultURL = 'https://suap.ifbaiano.edu.br/api/v2';
    }

    async start() {
        this.launch = await puppeteer.launch({
            executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
        });

        this.startChecker();
    }

    async login(user, password) {
        return new Promise(resolve => {
            const instance = axios.create({
                baseURL: 'https://suap.ifbaiano.edu.br/api/v2',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            instance.post('/autenticacao/token/?format=json', {
                username: user,
                password: password
            }).then(res => {
                resolve(res.data);
            }, (err) => {
                resolve(false);
            })
        })
    };

    async meusDados(token) {
        return new Promise(resolve => {
            const instance = axios.create({
                baseURL: 'https://suap.ifbaiano.edu.br/api/v2',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            instance.get("/minhas-informacoes/meus-dados/").then(e => {
                resolve(e.data)
            }, (err) => resolve(false))
        })
    }

    async minhasNotas(token) {
        return new Promise(resolve => {
            const instance = axios.create({
                baseURL: 'https://suap.ifbaiano.edu.br/api/v2',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            instance.get("/minhas-informacoes/boletim/2022/1/").then(e => {
                resolve(e.data)
            }, (err) => resolve(false))
        })
    }

    async notasGrafico(user, password) {
        return new Promise(async resolve => {
            const initialPage = await this.launch.newPage();

            await initialPage.goto('https://suap.ifbaiano.edu.br/accounts/login/');

            await initialPage.waitForSelector('#id_username');

            await initialPage.type('#id_username', user);

            await initialPage.type(".password-input", password)

            await initialPage.click("#login > form > div.submit-row > input");

            setTimeout(async () => {
                await initialPage.goto(`https://suap.ifbaiano.edu.br/edu/aluno/${user}/?tab=boletim`, { waitUntil: 'networkidle2', timeout: 0 });

                const grafic = await initialPage.$("#graficoBoletim");

                const shot = await grafic.screenshot({ type: 'jpeg' });

                initialPage.close();

                resolve(shot)
            }, 1000)
        })
    };

    async startChecker() {

        const notasCache = new Map();

        const func = async () => {
            const users = await this.client.database.ref('SUAP').once('value').then(res => res.val() || {});

            for (const user of Object.values(users)) {

                console.log(`Checkando notas de ${user.chatId}`);

                let notas = await this.minhasNotas(user.token);

                if (!notas) {
                    const login = await this.login(user.user, user.password);

                    if (!login) {
                        this.client.whatsapp.sendText(user.chatId, "Não foi possível obter suas notas. Logue-se novamente com o comando *!suap login*.");

                        this.client.database.ref(`SUAP/${user.chatId.replace(/[^0-9]/g, '')}`).remove();

                        continue;
                    };

                    user.token = login.access;

                    this.client.database.ref(`SUAP/${user.chatId.replace(/[^0-9]/g, '')}`).update({
                        token: login.access
                    });

                    notas = await this.minhasNotas(login.access);

                    if (!notas) {
                        this.client.whatsapp.sendText(user.chatId, "Não foi possível obter suas notas. Logue-se novamente com o comando *!suap login*.");

                        this.client.database.ref(`SUAP/${user.chatId.replace(/[^0-9]/g, '')}`).remove();

                        continue;
                    }
                };

                const last = notasCache.get(user.chatId);

                if (last) {
                    last.forEach(nota => {

                        if (nota.nota_etapa_1.nota != notas.find(n => n.disciplina == nota.disciplina).nota_etapa_1.nota)
                            this.client.whatsapp.sendText(user.chatId, `⚠️ ALERTA DE BOLETIM ⚠️\n\nA nota da disciplina *${nota.disciplina}* foi alterada de *${nota.nota_etapa_1.nota || 0}* para *${notas.find(n => n.disciplina == nota.disciplina).nota_etapa_1.nota || 0}*.`)
                    });
                } else notasCache.set(user.chatId, notas)
            }
        };

        func();

        setInterval(() => {
            func();
        }, 60000);
    }
}