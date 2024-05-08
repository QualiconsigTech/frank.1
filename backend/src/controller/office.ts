import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const officeRoute = Router()
const prisma = new PrismaClient()
officeRoute.get('/credits/:officeurl', async (req, res) => {
  const officeUrl = req.params.officeurl
  if(officeUrl) {
    const credits = await  prisma.office.findUnique({
      where: {
        officeId: officeUrl
      }
    })
    if(credits) {
      res.json(credits?.credits)
    }
  }
})

export default officeRoute;