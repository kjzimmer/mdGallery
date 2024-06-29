import { Contact } from "../models/customers.model.js";


export const customersController = {

    contact: async(req, res) => {
        Contact.create(req.body)
        .then(contact => {
            console.log('message created: ', contact)
            res.status(200).json(contact)
        })
        .catch(error => {
            console.log(error)
            res.status(400).json(error)
        })
    },

    get: async(req, res) => {
        Contact.findAll()
        .then(contacts => res.status(200).json(contacts))
        .catch(error => {
            console.log(error)
            res.status(400).json(error)
        })
    }
}