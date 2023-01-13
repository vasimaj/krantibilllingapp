const express = require("express");
const router = express.Router()
const dbConn = require("../../Config/Config")


//Save 
router.post("/saveTypeMaster", (req, res) => {
    const { typeName, createdById, companyId } = req.body;

    //Typeid, TypeName, Status, Created_by_id, dt_created_on, Updated_by_id, last_updated_on, Companyid

    const sqlQuery = `INSERT INTO typemaster(TypeName, Status, Created_by_id, dt_created_on, Updated_by_id, last_updated_on, Companyid) 
    VALUES ("${typeName}", 1, ${createdById}, NOW(), null, null, ${companyId})`;

    dbConn.query(sqlQuery, (error, result) => {
        if (error) {
            console.log(error)
            res.send("ERROR")
        }
        else if (result) {
            res.status(200).send("SAVED")
        }
    })
})

//Update
router.post("/updateTypeMaster", (req, res) => {
    const { Typeid, TypeName } = req.body;


    const sqlQuery = `UPDATE typemaster SET TypeName=?, Updated_by_id=1, last_updated_on=NOW() WHERE Typeid=?`;

    dbConn.query(sqlQuery, [TypeName, Typeid], (error, result) => {
        if (error) {
            console.log(error)
            res.send("ERROR")
        }
        else if (result) {
            res.status(200).send("UPDATED")
        }
    })
})

//Delete
router.post("/deleteTypeMaster", (req, res) => {
    const Typeid = req.body.Typeid;
    console.log(Typeid)
    //DELETE FROM table_name WHERE condition;

    const sqlQuery = `DELETE FROM typemaster WHERE Typeid=?`;

    dbConn.query(sqlQuery, [Typeid], (error, result) => {
        if (error) {
            console.log(error)
            res.send("ERROR")
        }
        else if (result) {
            res.status(200).send("DELETED")
        }
    })
})

router.get("/getTypeMaster", (req, res) => {

    const sqlQuery = "SELECT Typeid , TypeName FROM typemaster order by Typeid desc";
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