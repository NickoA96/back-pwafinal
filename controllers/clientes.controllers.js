import ClientesModel from "../models/clientesModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {promisify} from "util";
dotenv.config();



//** metodos para el login **//



// export const Login = async (req, res) => {
    
//     const {email, password} = req.body;
//     console.log(email, password);


//     const cliente = await ClientesModel.findOne({where: {email}});
//     if (!cliente) {
//         return res.send ({"message": 'El usuario no existe'});
//     }
//     const validacion =  bcrypt.compareSync(password, cliente.password);
//     console.log(validacion);
//     if (!validacion) {
//         return res.send ({"message": 'Contraseña incorrecta'});
//     }

//     res.send ("login correcto");
// }



export const loginJWT = async (req, res) => {
    const {email, password} = req.body;
    console.log(email
        , password
    );
    const cliente = await ClientesModel.findOne({where: {email}});
    if (!cliente) {
        return res.send ({"message": 'El usuario no existe'});
    }
    const validacion =  bcrypt.compareSync(password, cliente
        .password);
    // console.log(validacion);
    if (!validacion) {
        return res.send ({"message": 'Contraseña incorrecta'});
    }
    const token = jwt.sign({
        id: cliente.id,
        email: cliente.email,
        nombre: cliente.nombre
    }, process.env.JWT_SECRETO, {
        expiresIn: '1h'
    });
    res.send ({token});
    
}




export const isAuth = async (req, res) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.send ({"message": 'No autorizado'});
        }
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRETO);
        const cliente = await ClientesModel.findOne({where: {id: decoded.id}});
        if (!cliente) {
            return res.send ({"message": 'No autorizado'});
        }
        res.send ({"message": 'Autorizado'});
    } catch (error) {
        console.log(error);
    }


}

//** metodos para el crud **//

//mostrar todos los clientes
export const getClientes = async (req, res) => {
    try {
        const clientes = await ClientesModel.findAll();
        res.json(clientes);
    } catch (error) {
        console.log(error);
    }
}
export const getClienteById = async (req, res) => {
    try {
        const {id} = req.params;
        const cliente = await ClientesModel.findOne({
            where: {id}
        });
        res.json(cliente);
    } catch (error) {
        console.log(error);
    }
}


//crear un cliente

export const createCliente = async (req, res) => {
    //crear un cliente
    try {
        const {email, password, nombre} = req.body;
        const cliente = await ClientesModel.findOne({
            where: {email}
        });
        if (cliente) {
            res.send({"message": 'El usuario ya existe'});
            return;
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const nuevoCliente = await ClientesModel.create({
            email,
            password: hash,
            nombre
        }, {
            fields: ["email", "password", "nombre"]
        });
        if (nuevoCliente) {
            res.send({"message": 'Usuario creado'});
        }
    } catch (error) {
        res.json(error);
    }
}


export const deleteCliente = async (req, res) => {
    //comprobar si existe el cliente
    try {
        const {id} = req.params;
        const cliente = await ClientesModel.findOne
        ({
            where: {id}
        });
        if (!cliente) {
            res.json({"message": 'El usuario no existe'});
            return;
        }
        await ClientesModel.destroy({
            where: {id}
        });
        res.json({"message": 'Usuario eliminado'});
    } catch (error) {
        res.json(error);
    }
}

export const updateCliente = async (req, res) => {
    //desencryptar el password
    try {
        const {id} = req.params;
        const {email, password, nombre} = req.body;
        const cliente = await ClientesModel.findOne
        ({
            where: {id}
        });
        if (!cliente) {
            res.json({"message": 'El usuario no existe'});
            return;
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        await ClientesModel.update({
            nombre,
            email,
            password: hash
        }, {
            where: {id}
        });
        res.json({"message": 'Usuario actualizado'});
    } catch (error) {
        res.json(error);
    }
    
}


