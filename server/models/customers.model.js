import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/config.sequelize.js";

// need recipes model that imports from users

export const Contact = sequelize.define('contact',
    {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2]
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
            }
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2]
            }
        }
    }
)

// the following sync should be removed from production to 
// ensure the database is not accidentally modified by production
Contact.sync({alter:true})
    .then(console.log('Contact table created'))
    .catch(error => console.log('Contact table creation error'))

