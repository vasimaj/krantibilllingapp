const express = require("express");
const router = express.Router()
const dbConn = require("../../Config/Config")



router.get("/getCityMaster/:sId", (req, res) => {

    const sId = req.params.sId;


    const sqlQuery = "SELECT city_id, state_id, city_name FROM city where state_id=?";
    dbConn.query(sqlQuery, sId, (error, result) => {
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