import { Router } from "express";
import { userController } from "../controllers/users.controller.js";
import { authenticate } from "../config/jwt.config.js";
import { paintingController } from "../controllers/paintings.controller.js";

import multer from 'multer'
import { customersController } from "../controllers/customersController.js";


var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, `${process.cwd()}/uploads`);
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
})

const uploads = multer({ storage: storage })

// users router
export const usersRouter = Router()
usersRouter.route('/')
    .get(authenticate, userController.getAll)
    
usersRouter.route('/contacts')
    .get(customersController.get)
    .post(customersController.contact)
    
    usersRouter.route('/:id')    
    .get(authenticate, userController.getOne)
    .put(authenticate, userController.update)    
    .delete(authenticate, userController.delete)
    
// login router
export const loginRouter = Router()
loginRouter.route('/login')
    .post(userController.login)

loginRouter.route('/logout')
    .post(userController.logout)

loginRouter.route('/register')
    .post(userController.register)

// paintings router
export const paintingsRouter = Router()
paintingsRouter.route('/')
    .get(paintingController.get)
    .post(authenticate, paintingController.create)
    .put(authenticate, paintingController.update)
    
paintingsRouter.route('/:id')
    .get(paintingController.get)
    .delete(authenticate, paintingController.delete)

paintingsRouter.route('/upload')
    .post(authenticate, uploads.single('img'), paintingController.upload)

paintingsRouter.route('/images/:image')
    .get(paintingController.getImg)

