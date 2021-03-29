import {Request, Response} from 'express';
import {User, UserInterface} from '../models/user.model'
import {UpdateOptions, DestroyOptions} from 'sequelize'
import * as bcrypt from 'bcrypt';
import {Op} from "sequelize";

export class UserController {

    public index(req: Request, res: Response) {
        let condition = [];
        const team = req.params.id;
        if (typeof team !== 'undefined') {
            condition.push({user_team: team})
        }
        condition.push({ user_isActive: 0 });

        User.findAll<User>({
            where: {
                [Op.and]: condition,
            }
        })
            .then((users: Array<User>) => res.json({success: true, data: users}))
            .catch((err: Error) => res.status(500).json(err))
    }

    public async create(req: Request, res: Response) {
        const params: UserInterface = req.body
        params.user_password = await bcrypt.hash(params.user_password, 2)
        if (params.user_pin) {
            params.user_pin = await bcrypt.hash(params.user_pin, 2)
        }

        User.create<User>(params)
            .then((user: User) => res.status(201).json(user))
            .catch((err: Error) => res.status(500).json(err))
    }

    public async update(req: Request, res: Response) {
        const userId: number = Number(req.params.id);
        const params: UserInterface = req.body
        if (params.user_password) {
            params.user_password = params.user_password = await bcrypt.hash(params.user_password, 2);
        }
        if (params.user_pin) {
            params.user_pin = params.user_pin = await bcrypt.hash(params.user_pin, 2);
        }
        const options: UpdateOptions = {
            where: {user_id: userId},
            limit: 1
        }

        User.update(params, options)
            .then(() => res.status(202).json({success: true}))
            .catch((err: Error) => res.status(500).json(err))
    }

    public delete(req: Request, res: Response) {
        const userId: number = Number(req.params.id);
        const options: DestroyOptions = {
            where: {user_id: userId},
            limit: 1
        }

        User.destroy(options)
            .then(() => res.status(204).json({success: true}))
            .catch((err: Error) => res.status(500).json(err))
    }

    public async loginWeb(req: Request, res: Response) {
        const {username, password} = req.body;

        if (!username || !password) {
            return res.status(400).send(
                {success: false, message: 'Molimo unesite korisničko ime i lozinku.'}
            );
        }

        User.findOne<User>({
            where: {
                [Op.and]: [{ user_username: username }, { user_isActive: 1 }],
            }
        })
            .then(async (user: User | null) => {
                if (user) {
                    if (await bcrypt.compareSync(password, user.user_password)) {
                        res.json({success: true, data: user})
                    } else {
                        res.status(404).json({success: false, message: "Krivo korisničko ime ili lozinka."})
                    }
                } else {
                    res.status(404).json({success: false, message: "Krivo korisničko ime ili lozinka."})
                }
            })
            .catch((err: Error) => res.status(500).json(err))
    }

    public async loginMobile(req: Request, res: Response) {
        const {pin} = req.body;
        if (!pin) {
            return res.status(400).send(
                {success: false, message: 'Pin nije unešen.'}
            );
        }
        User.findAll<User>({
            where: {
                user_isActive: 1
            }
        })
            .then(async (users: Array<User> | null) => {
                if (users) {
                    for (const user of users) {
                        if (await bcrypt.compareSync(pin, user.user_pin)) {
                            res.json({success: true, data: user})
                        } else {
                            res.status(404).json({success: false, message: "Krivi pin."})
                        }
                    }
                }
            })
            .catch((err: Error) => res.status(500).json(err))
    }

}
