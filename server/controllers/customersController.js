import { Contact } from "../models/contacts.model.js";


export const customersController = {

    contact: async(form) => {
        const user = await Contact.create(form)
        .then(res => {
            console.log('message created: ', res)
        })
    }
}
