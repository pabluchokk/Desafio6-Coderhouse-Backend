import { Router } from 'express'
import userModel from '../models/userModel.js'

const router = new Router()

router.post("/register", async (req,res) => {
    const { first_name, last_name, email, age, password } = req.body;

    const exists = await userModel.findOne({email})

    if(exists) {
        return res.status(400)
        .send({
            status: "error",
            error: "El usuario ya existe."
        })
    }
    const user = {
        first_name,
        last_name,
        email,
        age,
        password
    }

    user.role = (email === "adminCoder@coder.com" && password === "adminCod3r123") ? "admin" : "usuario"

    let result = await userModel.create(user)
    res.send({
        status: "success",
        message: "Usuario registrado!"
    })
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body
    const user = await userModel.findOne({email, password})

    if(!user) {
        return res.status(400).send({
            status:"Error",
            error: "Datos incorrectos"
        })
    }
    req.session.user = {
        full_name: `${user.first_name} ${user.last_name}`,
        email: `${user.email}`,
        age: `${user.age}`,
        role: user.role
    }
    res.redirect('/')

    res.send({
        status: "success",
        payload: req.session.user,
        message: "Mi primer login"
    })
})

router.get('/logout', (req, res) => {
    req.session.destroy(err =>  {
        if (err) {
            return res.status(500).send({
                status: "success",
                message:"No se pudo desloguear"
            })
        }
        res.redirect('/login')
    })
})

export default router