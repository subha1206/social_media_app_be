import express from "express"
import { PrismaClient }  from '@prisma/client' 

const prisma = new PrismaClient();

const userRouter = express.Router();

userRouter.get('/', async (req, res) => {
 const users = await prisma.user.findMany();
 res.json(users)
});

module.exports = userRouter;