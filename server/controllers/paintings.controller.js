import { Painting } from "../models/painting.model.js";
import fs from 'fs'

export const paintingController = {
    // upload photo
    upload: async (req, res) => {
        console.log('in api: ', req.body)
        console.log('file: ', req.img)
        res.json({ status: 'files received' })
    },

    // create
    create: async (req, res) => {
        // register and log in user
        Painting.create(req.body)
        .then(painting => res.status(200).json(painting))
        .catch(error => {
            console.log(error)
            res.status(400).json(error)
        })
    },
    
    // read
    get: async (req, res) => {
        const { id } = req.params
        // req.body can be used to send parameters as well
        // when we don't want to put params in the url address, use the req body
        // this if checks if there is an id specified in the request body
        // if there is, get that uer id.
        // if not, get all users
        if(id){
            console.log('finding 1')
            Painting.findByPk(id)
            .then(user => res.status(200).json(user))
            .catch(error => {
                console.log(error)
                res.status(400).json(error)
            })
        }else{
            console.log('finding all')
            Painting.findAll()
            .then(item => {
                // console.log('item: ', json(item))
                res.status(200).json(item)

            })
            .catch(error => {
                console.log(error)
                res.status(400).json(error)
            })
        }
    },

    // update
    update: async (req, res) => {
        const { id } = req.body
        try {
            const item = await Painting.update(req.body, {where:{id:id}})
            res.status(200).json(item)
        } catch (error) {
            console.log(error)
            res.status(400).json(error)
        }
    },
    // delete
    delete: async (req, res) => {
        const { id } = req.body
        try {
            const item = await Painting.destroy({where:{id:id}})
            res.status(200).json(item)
        } catch (error) {
            console.log(error)
            res.status(400).json(error)
        }
    },
    // read
    getImg: async (req, res) => {
        const { image } = req.params

        try {
            const file = `${process.cwd()}/uploads/${image}`;
            console.log('file: ', file)
            res.download(file); // Set disposition and send it.
        }catch (error) {
            console.log(error)
            res.status(400).json(error)
        }
    }
}
