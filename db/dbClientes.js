import {Sequelize} from 'sequelize';

const dbClientes = new Sequelize('clientespwa', 'root', "39437720", {
    host: 'localhost',
    dialect: 'mysql'
    });


export default dbClientes;