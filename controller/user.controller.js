const {response} = require('express')

const User = require('../models/user.model');

const createUser =  async (req,res = response) =>{
    const {nombre,primerApellido,segundoApellido,email,telefono} = req.body;

    try {

        const existUSer = await User.findOne({email});

        if(existUSer){
            return res.status(400).json({
                ok : false ,
                msj : "El correo ya esta registrado"
            })
        }

        // si no exite lo crea 

        const user = new User(
            {
                "nombre" : nombre,
                "primerApellido" : primerApellido,
                "segundoApellido" : segundoApellido,
                "email" : email,
                "telefono" : telefono
            }
        )

        await user.save();

        res.json({
            ok : true,
            user : user
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok : false,
            msj : "Error"
        })
        
    }
}

const getUser =  async (req,res = response) =>{
    try {
        const users = await User.find();

        res.json(users)

        
    } catch (error) {
        console.log(error)
        res.status(400).json({
            ok : false,
            msg : "Error"
        })
        
    }
}

const deleteUser = async (req,res = response) => {
    try {

        const uid = req.params.id;

        console.log("entre");

        const userDB =  await User.findById(uid);
        if(!userDB){
            return res.status(404).json({
                ok : false,
                msg : "No se encontro el usuario po ese ID"
            });
        };
        await User.findByIdAndDelete(uid);

        res.status(200).json({
            ok : true,
            msg : "Usuario Eliminado"
        })

        
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok : false,
            msg : "Error"
        })
    }


}

const updateUSer = async (req,res = response) => {
    try {
        const uid = req.params.id;

        const userDB =  await User.findById(uid)
        if(!userDB){
            return res.status(404).json({
                ok : false,
                msg : "No se encontro el usuario po ese ID"
            });
        };
        //aqui el use ya existe

        //actualizacion
        //controlo si e manda algo que no quiere actualizar
        const {password,email, ...fields} =  req.body;

        if(userDB.email !== email){

            const emailExistt = await User.findOne({email});
            if (emailExistt){
                return res.status(400).json({
                    ok : false,
                    msg : "Ya existe un usuario con ese email."
                });
            }
        }

        fields.email = email

        const updateUser = await User.findByIdAndUpdate(uid,fields,{new:true})

        res.json(updateUser)
        
    } catch (error) {
        console.log(error),
        res.status(500).json({
            ok:false,
            msg:"Error inesperado"
        })
        
    }
}
module.exports={
    createUser,
    getUser,
    deleteUser,
    updateUSer

}