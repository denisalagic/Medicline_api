import {Request, Response} from 'express';
import {UpdateOptions, DestroyOptions} from 'sequelize'
import {Note, NoteInterface} from '../models/note.model';

export class NoteController {

    public index(req: Request, res: Response) {
        const userId: number = Number(res.locals.jwtPayload.user_id);
        Note.findAll<Note>({
            where: {
                note_user: userId
            }
        })
            .then((note: Array<Note>) => res.json({success: true, data: note}))
            .catch((err: Error) => res.status(500).json(err))
    }

    public async create(req: Request, res: Response) {
        const params: NoteInterface = req.body
        params.note_user = Number(res.locals.jwtPayload.user_id);

        Note.create<Note>(params)
            .then((note: Note) => res.status(201).json(note))
            .catch((err: Error) => res.status(500).json(err))
    }

    public async update(req: Request, res: Response) {
        const noteId: number = Number(req.params.id);
        const params: NoteInterface = req.body

        const options: UpdateOptions = {
            where: {note_id: noteId},
            limit: 1
        }

        Note.update(params, options)
            .then(() => res.status(202).json({success: true}))
            .catch((err: Error) => res.status(500).json(err))
    }

    public delete(req: Request, res: Response) {
        const noteId: number = Number(req.params.id);
        const options: DestroyOptions = {
            where: {note_id: noteId},
            limit: 1
        }

        Note.destroy(options)
            .then(() => res.status(204).json({success: true}))
            .catch((err: Error) => res.status(500).json(err))
    }
}
