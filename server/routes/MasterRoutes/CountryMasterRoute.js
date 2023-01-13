const express = require("express");
const router = express.Router()
const dbConn = require("../../Config/Config")



router.get("/getCountryMaster", (req, res) => {

    const sqlQuery = "SELECT country_id, country, nationality, currency FROM country";
    dbConn.query(sqlQuery, (error, result) => {
        if (error) {
            console.log(error)
            res.send("ERROR")
        }
        else if (result) {
            res.status(200).send(result)
        }
    })
})

module.exports = router;