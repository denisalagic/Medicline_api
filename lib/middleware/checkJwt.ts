import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import {jwtData} from '../config/jwt';


export const checkJwt = (req: Request, res: Response, next: NextFunction) => {

    const token = <string>req.headers["auth"];
    let jwtPayload;

    try {
        jwtPayload = <any>jwt.verify(token, jwtData.jwtSecret);
        console.log(jwtPayload);
        res.locals.jwtPayload = jwtPayload;
    } catch (error) {
        res.status(401).json("Not authorised.");
        return;
    }

    next();
};
