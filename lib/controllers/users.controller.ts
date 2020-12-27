import {Request, Response} from 'express';
import {User, UserInterface} from '../models/user.model'
import {UpdateOptions, DestroyOptions} from 'sequelize'

export class UsersController {

    public index(req: Request, res: Response) {
        User.findAll<User>({
            where: {
                user_enabled: 1
            }
        })
            .then((users: Array<User>) => res.json({success: true, data: users}))
            .catch((err: Error) => res.status(500).json(err))
    }

    public create(req: Request, res: Response) {
        const params: UserInterface = req.body
        console.log(req.body);

        User.create<User>(params)
            .then((user: User) => res.status(201).json(user))
            .catch((err: Error) => res.status(500).json(err))
    }

    public show(req: Request, res: Response) {
        const nodeId: number = Number(req.params.id);

        User.findByPk<User>(nodeId)
            .then((user: User | null) => {
                if (user) {
                    res.json(user)
                } else {
                    res.status(404).json({success: false, message: "Korisnik nije ponađen."})
                }
            })
            .catch((err: Error) => res.status(500).json(err))
    }

    public update(req: Request, res: Response) {
        const userId: number = Number(req.params.id);
        const params: UserInterface = req.body

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
