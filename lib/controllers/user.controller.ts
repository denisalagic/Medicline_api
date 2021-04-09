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
}
