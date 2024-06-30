import { DataTypes, Model, NUMBER, STRING } from "sequelize";
import { sequelize } from "../config/config.sequelize.js";

export const Painting = sequelize.define('painting',
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2]
            }
        },
        img: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2]
            }
        },
        description: {
            type: STRING,
            allowNull: false,
            validate: {
                len: [2]
            }
        },
        price: {
            type: NUMBER,
            allowNull: false,
            validate: {
                min: 0
            }
        }
        ,
        dateCompleted: {
            type: Date,
            allowNull: true
        }
    },
)

// the following sync should be removed from production to 
// ensure the database is not accidentally modified by production
// Painting.sync({alter:true})
//     .then(console.log('Painting table created'))
//     .catch(error => console.log('Painting table creation error', error))

