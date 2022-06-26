const jwt = require("jsonwebtoken")
const knex = require("../config/Database_connection")

const createToken = ({ id }) => {
    return jwt.sign(id, "uytsdfijhjljuytrfrty65")
}

const tokenVrify = async (req, res, next) => {
    if (req.headers.cookie) {
        const token = (req.headers.cookie).split("=")[1]
        const id = jwt.verify(token, "uytsdfijhjljuytrfrty65")
        const user = await knex("Testing").where({ id })
        req.userData = user
        next()
    } else {
        res.send("token_expair")
    }
}

module.exports = { createToken, tokenVrify }