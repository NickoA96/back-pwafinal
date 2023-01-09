//importo la conexion a la base de datos
import db from '../db/db.js';


//importo sequelize
import {DataTypes} from 'sequelize';

//creo el modelo
const ProductModel = db.define('productos', {
    nombre:{type: DataTypes.STRING},
    img : {type: DataTypes.STRING},
    descripcion : {type: DataTypes.STRING},
    precio : {type: DataTypes.INTEGER},
});



//exporto el modelo
export default ProductModel

