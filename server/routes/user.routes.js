import { Router } from "express";
import { userController } from "../controllers/users.controller.js";

export const usersRouter = Router()

usersRouter.route('/')
    .get(userController.getAll)
    .post(userController.create)
    
usersRouter.route('/:id')
    .get(userController.getOne)
    .delete(userController.delete)
    .put(userController.update)    

