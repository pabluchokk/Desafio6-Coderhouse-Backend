import express from "express";
import mongoose from "mongoose";
import { engine } from "express-handlebars";

import { cartRouter } from "./routes/carts.routes.js";
import { chatRouter } from "./routes/chat.routes.js";
import { productRouter } from "./routes/products.routes.js";

import __dirname from "./utils.js";

const PORT = 8080;
const app = express();

const MONGO = 'mongodb+srv://pabloagusrivero:azqsxwdce01@cluster0.ypyomam.mongodb.net/ecommerce'

const connection = mongoose.connect(MONGO)

const db = mongoose.connection

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(`${__dirname}/public`))

app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/api/chat', chatRouter)

app.listen(PORT, ()=>{
    console.log(`Servidor funcionando en el puerto: ${PORT}`)
})

app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", __dirname + "/views")