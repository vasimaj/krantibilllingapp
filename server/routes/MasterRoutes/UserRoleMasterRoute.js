const express = require("express");
const router = express.Router()
const dbConn = require("../../Config/Config")


//Save 
router.post("/saveUserRoleMaster", (req, res) => {
    const { role_name } = req.body;

    //role_id, role_name

    const sqlQuery = `INSERT INTO user_roles(role_name) VALUES("${role_name}")`;

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
router.post("/updateUserRoleMaster", (req, res) => {
    const { role_id, role_name } = req.body;


    const sqlQuery = `UPDATE user_roles SET role_name=? WHERE role_id=?`;

    dbConn.query(sqlQuery, [role_name, role_id], (error, result) => {
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
router.post("/deleteUserRoleMaster", (req, res) => {
    const role_id = req.body.role_id;
    console.log(role_id)
    //DELETE FROM table_name WHERE condition;

    const sqlQuery = `DELETE FROM user_roles WHERE role_id=?`;

    dbConn.query(sqlQuery, [role_id], (error, result) => {
        if (error) {
            console.log(error)
            res.send("ERROR")
        }
        else if (result) {
            res.status(200).send("DELETED")
        }
    })
})

router.get("/getUserRoleMaster", (req, res) => {

    const sqlQuery = "SELECT role_id , role_name FROM user_roles order by role_id desc";
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