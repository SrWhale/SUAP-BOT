import express from "express";

import cors from "cors";

import routes from "./routes.js";

const app = express();


app.use(express.json());
app.use(cors());
app.use(express.static(`/Users/Paulo/Desktop/site_wpp/src/autenticator`));

app.use(routes);

app.listen(25565, () => {
    console.log('Server started on port 25565');
});

export default app;
