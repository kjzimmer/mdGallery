import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
const SECRET_KEY = process.env.SECRET_KEY

export const authenticate = (req, res, next) => {
    console.log('checking authentication')

    jwt.verify(req.cookies.userToken, SECRET_KEY, (err, payload) => {
        if (err) {
            res.status(401).json({ verified: false });
        } else {
            // TODO: add code to check if the uid is valid
            // QUESTION: is this a good way to pass uid to the controller?
            req.userId = payload.id
            next();
        }
    });
}

