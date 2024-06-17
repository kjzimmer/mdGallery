import { User } from "../models/user.model.js";

export const userController = {
    // create
    create: async (req, res) => {
        try{
            const newItem = await User.create(req.body)
            res.status(200).json(newItem)
        } catch(error){
            console.log(error)
            res.status(400).json(error)
        }
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
