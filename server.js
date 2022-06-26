const express = require("express")
const { Ragister, Login, Read, Update, Delete, Postimage, Putimage, Readimgage, Deletimage } = require("./router/router")
const app = express()
const { tokenVrify } = require("./modules/jsonwebtoken")
const { validate, valiUpdate } = require("./modules/validater")
const dotenv = require("dotenv")
const uplode = require("./modules/multer")
dotenv.config()
const Port = process.env.PORT

app.use(express.json())

app.post("/register", validate, Ragister)

app.get("/login", Login)

app.get("/read", tokenVrify, Read)

app.put("/update", valiUpdate, tokenVrify, Update)

app.delete("/delet", tokenVrify, Delete)

// multer 

app.post("/Postimage",tokenVrify,uplode.single("image"),Postimage)

app.put("/Imageupdate",tokenVrify,uplode.single("image"), Putimage)

app.get("/Readimage",tokenVrify,Readimgage)

app.delete("/Deletimage",tokenVrify,Deletimage)

app.listen(Port, () => {
    console.log("Connected");
})