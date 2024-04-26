import express from 'express';
import { routes } from '../controller/user.controller';
import cors from 'cors'
import { rout } from '../../src/controller/consulta';

const app = express();
app.use(cors());

app.use(express.json());
app.use('/rt', rout)

app.use('/', routes)



app.listen(3333, () => {
  console.log('Server running on port 3333')
})