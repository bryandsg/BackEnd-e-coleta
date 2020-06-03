import express from 'express';
import router from './routes'
import path from 'path';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(router)

app.use('/uploads', express.static(path.resolve(__dirname,'..','uploads') ) );

app.listen(3333);
//