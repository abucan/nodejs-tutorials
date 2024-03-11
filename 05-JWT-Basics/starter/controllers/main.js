const jwt = require("jsonwebtoken")
const { BadRequestError } = require("../errors")

const login = async (req, res) => {
    const {username, password} = req.body
    if(!username || !password) {
        throw new BadRequestError('Please provide email and password')
    }

    const id = new Date().getTime()
    // payload, secret, options
    const token = jwt.sign({id, username}, process.env.JWT_SECRET, {expiresIn: '30d'})

    res.status(200).json({msg: 'user created', token})
}

const dashboard = async (req, res) => {
    const luckyNumber = Math.floor(Math.random()*100)
    // passed from middleware
    const {username} = req.user
    res.status(200).json({msg: `Hello, ${username}`, secret: `Here is your authorized data, ${luckyNumber}`})
}

module.exports = {
    login,
    dashboard
}