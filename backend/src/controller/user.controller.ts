import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { secretKey } from "../authorization/jwt.auth";
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const prisma = new PrismaClient()

const routes = Router()

routes.post('/signup', async (request, response) => {
  const name = request.body.username;
  const pass = request.body.password;

  if (name && pass) {
      const hashedPassword = await hashPassword(pass);
      const userIsInDatabase = await prisma.user.findUnique({
          where: {
              username: name
          }
      });
      if (!userIsInDatabase) {
          const newUser = await prisma.user.create({
              data: {
                  username: name,
                  password: hashedPassword, 
              }
          });
          response.status(200).json(newUser);
      } else {
          response.status(401).json('Usuário já existe');
      }
  } else {
      response.status(400).json('Nome de usuário e senha são obrigatórios');
  }
});

// Função para codificar a senha usando bcrypt
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
    if (userIsInDatabase) {
      const passwordMatch = await bcrypt.compare(pass, userIsInDatabase?.password);
      if (passwordMatch) {
          const token = jwt.sign(userIsInDatabase, secretKey, {expiresIn: '1h'})
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