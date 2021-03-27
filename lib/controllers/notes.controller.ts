import {Request, Response} from 'express';
import {User, UserInterface} from '../models/user.model'
import {UpdateOptions, DestroyOptions} from 'sequelize'
import * as bcrypt from 'bcrypt';
import {Op} from "sequelize";
import {Notes, NotesInterface} from '../models/notes.model';

export class NotesController {

    public index(req: Request, res: Response) {
        const userId: number = Number(req.params.id);
        Notes.findAll<Notes>({
            where: {
                note_user: userId
            }
        })
            .then((notes: Array<Notes>) => res.json({success: true, data: notes}))
            .catch((err: Error) => res.status(500).json(err))
    }

    public async create(req: Request, res: Response) {
        const params: NotesInterface = req.body

        Notes.create<Notes>(params)
            .then((notes: Notes) => res.status(201).json(notes))
            .catch((err: Error) => res.status(500).json(err))
    }

    public async update(req: Request, res: Response) {
        const noteId: number = Number(req.params.id);
        const params: NotesInterface = req.body

        const options: UpdateOptions = {
            where: {note_id: noteId},
            limit: 1
        }

        Notes.update(params, options)
            .then(() => res.status(202).json({success: true}))
            .catch((err: Error) => res.status(500).json(err))
    }

    public delete(req: Request, res: Response) {
        const noteId: number = Number(req.params.id);
        const options: DestroyOptions = {
            where: {note_id: noteId},
            limit: 1
        }

        Notes.destroy(options)
            .then(() => res.status(204).json({success: true}))
            .catch((err: Error) => res.status(500).json(err))
    }
}
