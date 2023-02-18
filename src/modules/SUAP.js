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
    }

    async login(user, password) {
        return new Promise(resolve => {
            const instance = axios.create({
                baseURL: 'https://suap.ifbaiano.edu.br/api/v2',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            instance.post(
                '/autenticacao/token/?format=json',
                {
                    username: user.toLowerCase(),
                    password: password
                }).then(res => {
                    resolve(res.data);
                }, (err) => {
                    resolve(false);
                })
        })
    };

    async refreshToken(refresh) {

        return new Promise(resolve => {
            const instance = axios.create({
                baseURL: 'https://suap.ifbaiano.edu.br/api/v2',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            instance.post(
                '/autenticacao/token/refresh/',
                {
                    refresh
                }).then(res => {
                    console.log(res.data.refresh)
                    resolve(res.data);
                }, (err) => {
                    console.log(err)
                    resolve(false);
                })
        })
    }

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

    async getBoletim(token) {
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

    async minhasTurmas(token) {
        return new Promise(resolve => {
            const instance = axios.create({
                baseURL: 'https://suap.ifbaiano.edu.br/api/v2',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            instance.get("/minhas-informacoes/turmas-virtuais/2022/1/").then(e => {
                resolve(e.data)
            }, (err) => resolve(false))
        })
    }

    async getTurma(token, id) {
        return new Promise(resolve => {
            const instance = axios.create({
                baseURL: 'https://suap.ifbaiano.edu.br/api/v2',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            instance.get(`/minhas-informacoes/turma-virtual/${id}`).then(e => {
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

            await initialPage.waitForSelector("body > div > a.toggleSidebar");

            await initialPage.goto(`https://suap.ifbaiano.edu.br/edu/aluno/${user.toUpperCase()}/?tab=boletim`, { waitUntil: 'networkidle2', timeout: 0 });

            const grafic = await initialPage.$("#graficoBoletim");

            const shot = await grafic.screenshot({ type: 'jpeg', encoding: 'base64', quality: 50 });

            await initialPage.close();

            resolve(shot)
        })
    };
}