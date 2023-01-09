import {Sequelize} from 'sequelize';

const db = new Sequelize('productospwa', 'root', "39437720", {
    host: 'localhost',
    dialect: 'mysql'
    });


export default db;