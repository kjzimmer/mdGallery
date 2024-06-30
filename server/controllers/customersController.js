import { Contact } from "../models/customers.model.js";
import nodemailer from 'nodemailer'

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'kjzimmer60@gmail.com',
      pass: 'kkky dtrm xhym nnqy'
    }
  });
  
export const customersController = {

    contact: async(req, res) => {
        console.log('message received: ', req.body)

        const {firstName, lastName, email, message, product, productVariation } = req.body

        let subject = ''
        product ? subject = `Gallery Inquiry about ${product}` : subject = 'General Gallery Inquiry'

        var mailOptions = {
            replyTo: email,
            to: 'karl.zimmer@enterpriseedge.com',
            subject: subject,
            text: `Name: ${firstName} ${lastName} \nEmail: ${email}\nMessage:\n${message}`,
            html:`
                <h1>${firstName} ${lastName}</h1>
                <p>${email}</p>
                <p>${message}</p>
            `
        }


        Contact.create(req.body)
        .then(contact => {
            transporter.sendMail(mailOptions)
            .then((success) => res.status(200).json(success))
            .catch(error => res.status(400). json(error))
    
            // console.log('message created: ', contact)
            // res.status(200).json(contact)
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