import ProductModel from "../models/productsModel.js";

import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



//** configuracion de multer **//

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/uploads'),
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({storage: storage})

export const uploadFile = upload.single('img');




//** metodos para el crud **//

//mostrar todos los productos
export const getProducts = async (req, res) => {
    try {
        const products = await ProductModel.findAll();
        res.json(products);
    } catch (error) {
        console.log(error);
    }
}
//mostrar un producto por id

export const getProductById = async (req, res) => {

    try {
        if (!req.params.id || req.params.id === 'undefined') {
            res.json({"message": 'No se ha encontrado el producto'});
            
        } else {
        const {id} = req.params;
        const product = await ProductModel.findOne({
            where: {id}
        });
        res.json(product);
        }
    } catch (error) {
        console.log(error);
    }
}
//crear un producto


export const createProduct = async (req, res) => {
    //subir la imagen a la carpeta public y guardar la ruta en la base de datos
    uploadFile(req, res, async (error) => {
        if (error) {
            res.json(error);
        } else {
            try {
                const {nombre, descripcion, precio} = req.body;
                const img = req.file.filename;
                await ProductModel.create({
                    nombre,
                    img,
                    descripcion,
                    precio
                });
                res.json({"message": 'Producto creado'});
            } catch (error) {
                res.json(error);
            }
        }
    })
}






//actualizar un producto

export const updateProduct = async (req, res) => {
    try {
        const {id} = req.params;
        await ProductModel.update(req.body, {
            where: {id}
        });
        res.json({"message": 'Producto actualizado'});
    } catch (error) {
        res.json(error);
    }
}

//borrar un producto

export const deleteProduct = async (req, res) => {
    try {
        const {id} = req.params;
        await ProductModel.destroy({
            where: {id}
        });
        res.json({"message": 'Producto eliminado'});
    } catch (error) {
        res.json(error);
    }
}



