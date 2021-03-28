import {Request, Response} from 'express';
import {Op, UpdateOptions} from 'sequelize';
import {Task, TaskInterface} from '../models/task.model';

export class TaskController {

    public index(req: Request, res: Response) {
        const userId: number = Number(req.params.id);
        Task.findAll<Task>({
            where: {
                [Op.or]: {task_createdBy: userId, task_assignedTo: userId}
            }
        })
            .then((tasks: Array<Task>) => res.json({success: true, data: tasks}))
            .catch((err: Error) => res.status(500).json(err))
    }

    public async create(req: Request, res: Response) {
        const params: TaskInterface = req.body

        Task.create<Task>(params)
            .then((task: Task) => res.status(201).json(task))
            .catch((err: Error) => res.status(500).json(err))
    }

    public async update(req: Request, res: Response) {
        const taskId: number = Number(req.params.id);
        const params: TaskInterface = req.body

        const options: UpdateOptions = {
            where: {task_id: taskId},
            limit: 1
        }

        Task.update(params, options)
            .then(() => res.status(202).json({success: true}))
            .catch((err: Error) => res.status(500).json(err))
    }

}
