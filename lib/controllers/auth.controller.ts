import {Request, Response} from 'express';
import {User} from '../models/user.model';
import * as bcrypt from 'bcrypt';
import {Op} from 'sequelize';
import * as jwt from 'jsonwebtoken';
import {jwtData} from '../config/jwt';

export class AuthController {

    public async loginWeb(req: Request, res: Response) {
        const {username, password} = req.body;
        if (!username || !password) {
            return res.status(400).send(
                {success: false, message: 'Molimo unesite korisničko ime i lozinku.'}
            );
        }
        User.findOne<User>({
            where: {
                [Op.and]: [{user_username: username}, {user_isActive: 0}],
            }
        })
            .then(async (user: User | null) => {
                if (user) {
                    if (await bcrypt.compareSync(password, user.user_password)) {
                        const token = jwt.sign(
                            {user_id: user.user_id, user_team: user.user_team, user_teamRole: user.user_teamRole, user_isAdmin: user.user_isAdmin},
                            jwtData.jwtSecret,
                        );
                        res.status(200).json({success: true, token: token});
                    } else {
                        res.status(404).json({success: false, message: 'Krivo korisničko ime ili lozinka.'});
                    }
                } else {
                    res.status(404).json({success: false, message: 'Krivo korisničko ime ili lozinka.'});
                }
            })
            .catch((err: Error) => res.status(500).json(err));
    }

    public async loginMobile(req: Request, res: Response) {
        const userId = res.locals.jwtPayload.user_id;
        const {pin} = req.body;
        if (!userId || !pin) {
            return res.status(400).send(
                {success: false, message: 'Pin nije unešen.'}
            );
        }
        User.findOne<User>({
            where: {
                [Op.and]: [{user_id: userId}, {user_isActive: 0}],
            }
        })
            .then(async (user: User | null) => {
                if (user) {
                    if (await bcrypt.compareSync(pin, user.user_pin)) {
                        res.status(200).json({success: true});
                    } else {
                        res.status(404).json({success: false, message: 'Krivi pin.'});
                    }
                }
            })
            .catch((err: Error) => res.status(500).json(err));
    }
}
