import mongoose from 'mongoose';

export interface Card {
    name: string;
    token: string;
    time: string;
}

const CardSchema = new mongoose.Schema({
    name: { type: String, required: true },
    token: { type: String, required: true },
    time: { type: String, required: true }
});

export const CardModel = mongoose.model('Card', CardSchema);

export const addCard = (values: Record<string, any>) => new CardModel(values)
    .save().then((card) => card.toObject());
export const getCardByToken = (token: string) => CardModel.findOne({ token });
export const getAllCards = () => CardModel.find();
export const deleteCardByToken = (token: string) => CardModel.deleteOne({ token });