import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import router from "./routes/cards";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/cards', router);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello! This is the API for the Hide and Seek app!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

const MONGO_URL = '[YOUR MONGODB URL]';

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));