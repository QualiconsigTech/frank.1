import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { secretKey } from "../authorization/jwt.auth";
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const prisma = new PrismaClient()

const routes = Router()

routes.post('/signup', async (request, response) => {
  const { username, password, officeId } = request.body;
  const offId = officeId.toString()
  if (username && password && officeId) {
      const hashedPassword = await hashPassword(password);
      const userIsInDatabase = await prisma.user.findUnique({
          where: {
              username: username
          }
      });
      
      if (!userIsInDatabase) {
          try {
              const newUser = await prisma.user.create({
                  data: {
                      username: username,
                      password: hashedPassword,
                      officeId: offId 
                  }
              });
              response.status(200).json(newUser);
          } catch (error) {
              console.error('Erro ao criar novo usuário:', error);
              response.status(500).json('Ocorreu um erro ao criar um novo usuário');
          }
      } else {
          response.status(401).json('Usuário já existe');
      }
  } else {
      response.status(400).json('Nome de usuário, senha e ID do escritório são obrigatórios');
  }
});

async function hashPassword(password:string) {
  try {
      const saltRounds = 10; 
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
      return hashedPassword;
  } catch (error) {
      throw new Error('Erro ao codificar a senha');
  }
}

routes.post('/signin', async (request:Request, response:Response) => {
  const name = request.body.username
  const pass = request.body.password

  if(name && pass) {
    const userIsInDatabase = await prisma.user.findUnique({
      where: {
        username: name,
      }
    })
    
    const office = await prisma.office.findUnique({
      where: {
        officeId: userIsInDatabase!.officeId
      }
    })
    if (userIsInDatabase) {
      const passwordMatch = await bcrypt.compare(pass, userIsInDatabase?.password );
      if (passwordMatch) {
          const token = jwt.sign({userIsInDatabase, office}, secretKey, {expiresIn: '1h'})
          response.status(200).json(token);
      } else {
          response.status(401).json('Usuário ou senha inválidos');
      }
  } else {
    response.status(200).json("Usuario não encontrado")
  }
  } else {
    response.status(200).json("Obritagorio enviar usuario e senha!")
  }
})

routes.patch('/patch', async (request:Request, response:Response) => {
  const name = request.body.username
  const pass = request.body.password
  const newPass = request.body.newPass
  const hashedPassword = await hashPassword(newPass);
  if(name) {
    const userIsInDatabase = await prisma.user.findUnique({
      where: {
        username: name,
      }
    })
    if (userIsInDatabase) {
      const passwordMatch = await bcrypt.compare(pass, userIsInDatabase?.password);
      if (passwordMatch) {
          const modificated = await prisma.user.update({
            where: {
              username: name
            },
            data: {
              password: hashedPassword
            }
          })
          response.status(200).json(modificated)
      } else {
          response.status(401).json('Usuário ou senha inválidos');
      }
  }
  }
})

export {routes}