import { User } from "../models/user.model.js";
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { Contact } from "../models/customers.model.js";


dotenv.config()

const SECRET_KEY = process.env.SECRET_KEY

export const userController = {
    // login
    login: async(req, res) => {
        console.log('in login controller', req.body.email)
        const user = await User.findOne({ 
            raw: true,
            where:{
                email: req.body.email
            }
        });

        if(user === null) {
            // email not found in users collection
            return res.status(400).json({message:'invalid credentials'});
        }
     
        // if we made it this far, we found a user with this email address
        // let's compare the supplied password to the hashed password in the database
        const correctPassword = await bcrypt.compare(req.body.password, user.password);
     
        if(!correctPassword) {
            // password wasn't a match!
            return res.status(400).json({message:'invalid credentials'});
        }
     
        // if we made it this far, the password was correct
        const payload = {
            id: user.id
        }
        const options = {
            // expiresIn: '1d'
        }
        const userToken = jwt.sign(payload, SECRET_KEY, options)
        console.log('token:',userToken)
        // note that the response object allows chained calls to cookie and json
        res
            // .cookie("userToken", userToken, SECRET_KEY, {
            //     httpOnly: true
            // })
            .status(200).json({ msg:'success', token: userToken });
    },

    // logout
    logout: (req, res) => {
        console.log('clear cookie')
        res.clearCookie('usertoken');
        res.sendStatus(200);
    },

    // create
    register: async (req, res) => {
        // register and log in user
        User.create(req.body)
        .then(user => {
            const userToken = jwt.sign({
                id:user.id
            }, SECRET_KEY)

            res
            // .cookie('userToken', userToken, SECRET_KEY, {
            //     httpOnly: true
            // }).status(200).json(user)
            .status(200).json({ msg:'success', token: userToken });

        })
        .catch(error => {
            console.log(error)
            res.status(400).json(error)
        })
    },
    // read
    getAll: async (req, res) => {
        // refactored this using Promise, .then and .catch instead of try catch
        // just to experiment

        const { id } = req.body
        // req.body can be used to send parameters as well
        // when we don't want to put params in the url address, use the req body
        // this if checks if there is an id specified in the request body
        // if there is, get that uer id.
        // if not, get all users
        if(id){
            User.findByPk(id)
            .then(user => res.status(200).json(user))
            .catch(error => {
                console.log(error)
                res.status(400).json(error)
            })
        }else{
            User.findAll()
            .then(users => res.status(200).json(users))
            .catch(error => {
                console.log(error)
                res.status(400).json(error)
            })
        }
    },

    // getByEmailOrCreate: async (userData) => {
    //     console.log('in getByEmailOrCreate: ', userData)
    //     User.findOne({where:{email:userData.email}})
    //     .then(user => {
    //         if(user != null){
    //             return user
    //         }else{
    //             console.log('user not exist')
    //             // user does not exist.  create it
    //             User.create(userData)
    //             .then(user => console.log('heres the user:',user))
    //             .catch(error => error)
    //         }
    //     })
    //     .catch(error => error
    //     )
    // },

    getOne: async (req, res) => {
        const { id } = req.body
        console.log('get one req body', id)
        // const {id} = req.params
        try {
            const item = await User. findByPk(id)
            res.status(200).json(item)
        } catch (error) {
            console.log(error)
            res.status(400).json(error)
        }
    },
    // update
    update: async (req, res) => {
        // include the id in the req body then it's not needed in the address url
        const {id} = req.params
        try {
            const item = await User.update(req.body, {where:{id:id}})
            res.status(200).json(item)
        } catch (error) {
            console.log(error)
            res.status(400).json(error)
        }
    },
    // delete
    delete: async (req, res) => {
        const {id} = req.params
        try {
            const item = await User.destroy({where:{id:id}})
            res.status(200).json(item)
        } catch (error) {
            console.log(error)
            res.status(400).json(error)
        }
    }
}
