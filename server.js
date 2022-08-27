const { STRING, BOOLEAN } = require('sequelize')
const Sequelize = require('sequelize')
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_party_planner_db')


const Item = conn.define('item', {
    name: {
        type: STRING, 
        allowNull: false, 
        validate: {
            notEmpty: true
        },
        purchased: {
            type: BOOLEAN,
            defaultValue: false, 
            allowNull: false
        }
    }
})

const setup =async() => {
    try {
        console.log('starting')
        await conn.sync({force: true})
        await Promise.all([
            Item.create({ name: 'cake'}),
            Item.create({ name: 'pin the tail on the donkey', purchased:true}),
            Item.create({ name: 'disco ball', purchased: true}),
        ])
        
    } catch (ex) {
        console.log(ex)
    }
}