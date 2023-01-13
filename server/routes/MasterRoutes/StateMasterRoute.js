const express = require("express");
const router = express.Router()
const dbConn = require("../../Config/Config")



router.get("/getStateMaster/:cId", (req, res) => {

    const cId = req.params.cId;


    const sqlQuery = "SELECT state_id, country_id, state_name, GSTStateCode, AlphaCode FROM state where country_id=?";
    dbConn.query(sqlQuery, cId, (error, result) => {
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