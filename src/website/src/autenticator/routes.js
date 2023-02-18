import { Router } from 'express';

import SimplDB from 'simpl.db';

const db = new SimplDB();

const routes = Router();

routes.get('/', (req, res) => {
    console.log(req, res)
})
routes.get('/accounts/login/:number', (req, res) => {
    res.sendFile(`index.html`, { root: `/Users/Paulo/Desktop/site_wpp/src/autenticator` })
});

export default routes;