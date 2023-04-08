const router = require("express").Router()
const pool = require("./db")
const authentication = require("./authentication")
router.get("/", authentication, async(req, res) => {
    try {
      //re.user has the payload
      //res.json(req.user)
      const user = await pool.query("SELECT username FROM jwta where id = $1;", [req.user])
      res.json(user.rows[0])
    }
    catch(err) {
        console.error(err.message)
        res.status(500).json("server error")
    }
})
module.exports = router