const router = require("express").Router()
const pool = require("./db")
const bcrypt = require("bcrypt")
const jwtCreate = require("./jwtToken")
const validInfo = require("./validInfo")
const authentication = require("./authentication")
router.post("/register", validInfo, async(req, res) => {
    try {
    const {username, email, password} = req.body
    const user = await pool.query("SELECT * FROM jwta WHERE email = $1", [email])
    if (user.rows.length !== 0) {
        return res.status(401).json("User already exists")
    }
    const saltRound = 10
    const salt = await bcrypt.genSalt(saltRound)
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = await pool.query("INSERT INTO jwta (username, email, password) values ($1, $2, $3) returning *", [
        username, email, hashedPassword
    ])
    const token = jwtCreate(newUser.rows[0].id)
    res.json({token})
    }
    catch(err) {
       console.error(err.message)
       res.status(500).json("Server error")
    }
})
router.post("/login", validInfo, async(req, res) => {
    try {
    const {email, password} = req.body
    const checkUser = await pool.query("SELECT * FROM jwta where email = $1", [email])
    if (checkUser.rows.length == 0) {
        return res.status(401).json("Cannot find user")
    }
    const checkPassword = await bcrypt.compare(password, checkUser.rows[0].password)
    if (!checkPassword) {
        return res.status(401).json("Wrong password")
    }
    const token = jwtCreate(checkUser.rows[0].id)
    res.json({token})
    }
    catch(err) {
        console.error(err.message)
        res.status(500).send("Server error")
    } 
})
router.get('/is-verify', authentication, async(req, res) => {
    try {
       res.json(true)
    }
    catch(err) {
        console.error(err.message)
        res.status(500).send("Server error")
    }
})
module.exports = router

