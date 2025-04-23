import { Router, Request, Response } from 'express';
import {addCard, Card, deleteCardByToken, getAllCards, getCardByToken} from '../models/card';
import {random} from "../helpers";
import moment from "moment";

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    const cards: Card[] = await getAllCards();
    res.status(200).json(cards);
})

router.post('/new-card', async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        if(!name) {
            res.status(400).json('Name is required');
        } else {
            const newCard = await addCard({
                name,
                token: random(),
                time: moment().format('YYYY/MM/D HH:mm:ss')
            })

            res.status(200).json(newCard);
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
})

router.get('/:token', async (req: Request, res: Response) => {
    const {token} = req.params;
    const card = await getCardByToken(token);
    if(card) {
        await deleteCardByToken(token);
        res.status(200).send('Card \"' + card.name + '\", played at ' + card.time + ' has been successfully validated!');
    } else {
        res.status(404).send("The card you're looking for has already been validated or doesn't exist!");
    }
})

export default router;