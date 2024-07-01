import { Contact } from "../models/customers.model.js";
import nodemailer from 'nodemailer'
import { User } from "../models/user.model.js";
import { userController } from "./users.controller.js";
import { sequelize } from "../config/config.sequelize.js";

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kjzimmer60@gmail.com',
        pass: 'kkky dtrm xhym nnqy'
    }
});

export const customersController = {

    contact: async (req, res) => {
        console.log('message received: ', req.body)

        let user = await User.findOne({ where: { email: req.body.email } })

        if (user === null) {
            console.log('user not exist')
            // user does not exist.  create it
            user = await User.create(req.body)
        }

        console.log(`here's the user: `, user)

        req.body.customerId = user.id

        const { firstName, lastName, email, message, product, productVariation } = req.body

        let subject = ''
        product ? subject = `Gallery Inquiry about ${product}` : subject = 'General Gallery Inquiry'

        var mailOptions = {
            replyTo: email,
            to: 'karl.zimmer@enterpriseedge.com',
            subject: subject,
            text: `Name: ${firstName} ${lastName} \nEmail: ${email}\nMessage:\n${message}`,
            html: `
                <h1>${firstName} ${lastName}</h1>
                <p>${email}</p>
                <p>${message}</p>
            `
        }


        // console.log('message created: ', contact)
        // res.status(200).json(contact)


        // TODO: add customer user creation and joins with users and paintings tables
        // 1-check if customer email exists.  if not create a user.  get the id of the user
        // 2-send the painting id in the req body
        // 3-create a contact record many to many linking painting and user.  contact record contains: date, message, productVariation

        //         userController.getByEmailOrCreate(req.body)
        //         .then(user => {

        //             req.body.customerId = user.id
        // console.log('contace create body: ',req.body)
                    Contact.create(req.body)
                    .then(contact => {
                        // res.status(200).json(contact)
                        transporter.sendMail(mailOptions)
                        .then((success) => res.status(200).json(success))
                        .catch(error => res.status(400). json(error))
                    })
                    .catch(error => {
                        console.log(error)
                        res.status(400).json(error)
                    })
        //         })

        //         .catch(error => console.log('findone error: ', error))

    },

    get2: async (req, res) => {
        Contact.findAll()
            .then(contacts => res.status(200).json(contacts))
            .catch(error => {
                console.log(error)
                res.status(400).json(error)
            })
    },

    get: async (req,res) => {
        sequelize.query(`
            select contacts.id, firstName, lastName, message, title product, contacts.createdAt, productVariation
            from
                users
                inner join contacts on users.id = contacts.customerId
                left join paintings on contacts.paintingId = paintings.id
                `)
                .then(contacts => {
                    console.log('api contacts: ', contacts[0])
                    res.status(200).json(contacts[0])
                })
                .catch(error => {
                    console.log(error)
                    res.status(400).json(error)
        })
    }
}