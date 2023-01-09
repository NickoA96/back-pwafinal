import dbClientes from "../db/dbClientes.js";

import {DataTypes} from 'sequelize';


const ClientesModel = dbClientes.define('clientes', {
    nombre:{type: DataTypes.STRING},
    email : {type: DataTypes.STRING},
    password : {type: DataTypes.STRING},
});

export default ClientesModel;
