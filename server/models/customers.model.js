import { DataTypes, Model, NUMBER, STRING } from "sequelize";
import { sequelize } from "../config/config.sequelize.js";
import { User } from "./user.model.js";
import { Painting } from "./painting.model.js";

// need recipes model that imports from users

export const Contact = sequelize.define('contact',
    {
        message: {
            type: STRING,
            allowNull: false,
            validate: {
                len: [2]
            }
        },
        productVariation: {
            type: STRING,
            allowNull: true
        }
        // ,
        // paintingId:{
        //     type: NUMBER,
        //     allowNull: true
        // },
        // customerId:{
        //     type: NUMBER,
        //     allowNull: true
        // },
    }
)

Contact.belongsTo(User, {
    foreignKey: 'customerId'
})
// User.hasMany(Contact)

User.hasMany(Contact, {
    foreignKey: 'customerId'
})

Contact.belongsTo(Painting)
Painting.hasMany(Contact)


// the following sync should be removed from production to 
// ensure the database is not accidentally modified by production
Contact.sync({alter:true})
    .then(res => console.log('Contact table Modified'))
    .catch(error => console.log('Contact table creation error'))

