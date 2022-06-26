const { createToken } = require("../modules/jsonwebtoken")
const knex = require("../config/Database_connection")
const uplode = require("../modules/multer")
const cloudinary = require("../modules/cloudinary")

// LOGIN,SINGUP WORKING

const Ragister = (req, res) => {
    knex("Testing").where({ email: req.body.email }).then((result) => {
        if (result.length == 0) {
            knex("Testing").insert(req.body).then((result) => {
                res.send("done")
            })
        } else {
            res.send("try again")
        }
    })
}

const Login = (req, res) => {
    knex("Testing").where({ email: req.body.email, password: req.body.password }).then((result) => {
        const token = createToken(result[0])
        res.cookie("Cookie", token)
        res.send("login successful")
    }).catch((err) => {
        res.send("try Again")
    })
}


const Update = (req, res) => {
    knex("Testing").where({ email: req.userData[0].email }).update(req.body).then((result) => {
        res.send("updated")
    })
}

const Delete = (req, res) => {
    knex("Testing").where({ email: req.userData[0].email }).del().then((result) => {
        res.send("deleted")
    })
}
const Postimage = (req,res)=>{
    cloudinary.uploader.upload(req.file.path).then((result)=>{
        knex("image_portel").insert({testingId:req.userData[0].id,avatar:result.secure_url,cloudinary_id:result.public_id}).then((resl)=>{
            res.send("inserted")
        })
    })
}


// IMAGE WORKING


const Putimage = async (req,res)=>{
    const find = await knex("image_portel").where({testingId:req.userData[0].id})
    const del_url = await cloudinary.uploader.destroy(find[0].cloudinary_id)
    const Update_url = await cloudinary.uploader.upload(req.file.path)
    const updat = await knex("image_portel").where({testingId:req.userData[0].id}).update({avatar: Update_url.secure_url || find.secure_url,cloudinary_id:Update_url.public_id || find.public_id})
    res.send("Update")
}

const Readimgage = async (req,res)=>{
    const find = await knex("image_portel").where({testingId:req.userData[0].id})
    res.json(find[0])
}

const Read = (req, res) => {
    res.send(`${req.userData[0].name},\n${req.userData[0].email},\n${req.userData[0].password},\n${req.userData[0].image_name}`)
}

const Deletimage =async (req,res)=>{
    const find = await knex("image_portel").where({testingId:req.userData[0].id})
    const del_url = await cloudinary.uploader.destroy(find[0].cloudinary_id)
    const del = await knex("image_portel").where({testingId:req.userData[0].id}).del()
    res.send("deleted")
}

module.exports = { Ragister, Login, Read, Update, Delete, Postimage, Putimage, Readimgage, Deletimage }