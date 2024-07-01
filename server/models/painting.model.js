import { DECIMAL, DataTypes, Model, NUMBER, STRING } from "sequelize";
import { sequelize } from "../config/config.sequelize.js";

export const Painting = sequelize.define('painting',
    {
        title: {
            type: STRING,
            allowNull: false,
            validate: {
                len: [2]
            }
        },
        img: {
            type: STRING,
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
            type: DECIMAL(19,4),
            allowNull: false,
            validate: {
                min: 0
            }
        }
        ,
        dateCompleted: {
            type: DataTypes.DATE,
            allowNull: true
        }
    },
)

// the following sync should be removed from production to 
// ensure the database is not accidentally modified by production
Painting.sync({alter:true})
    .then(console.log('Painting table modified'))
    .catch(error => console.log('Painting table creation error', error))
