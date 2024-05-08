import express from 'express';
import { routes } from '../controller/user.controller';
import cors from 'cors'
import { rout } from '../../src/controller/consulta';
import officeRoute from '../controller/office';

const app = express();
app.use(cors());

app.use(express.json());
app.use('/rt', rout)
app.use('/office', officeRoute)
app.use('/', routes)


const IP = '0.0.0.0'
app.listen(3333, IP, () => {
  console.log(`Servidor rodando em http://${IP}`)
})