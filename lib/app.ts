import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as morgan from "morgan";
import * as compression from 'compression';
import { Routes } from "./config/routes";

class App {
    public app: express.Application;
    public cors: cors.Application;
    public routePrv: Routes = new Routes();

    constructor() {
        this.app = express();
        this.cors = cors();
        this.config();
        this.routePrv.routes(this.app);
    }

    private config(): void {
        this.app.use(compression());
        this.app.use(this.cors);
        this.app.use(morgan("tiny"));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
}

export default new App().app;
