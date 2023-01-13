const express = require("express");
const router = express.Router()
const dbConn = require("../../Config/Config")


//Save 
router.post("/saveDeptMaster", (req, res) => {
    const { deptName, createdById } = req.body;

    //department_id, department, created_by_id, dt_created_on, last_updated_by, last_updated_on, Status

    const sqlQuery = `INSERT INTO department(department, created_by_id, dt_created_on, last_updated_by, last_updated_on, Status) 
    VALUES ("${deptName}", ${createdById}, NOW(), null, null, 1)`;

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
router.post("/updateDeptMaster", (req, res) => {
    const { deptId, deptName } = req.body;


    const sqlQuery = `UPDATE department SET department=?, last_updated_by=1, last_updated_on=NOW() WHERE department_id=?`;

    dbConn.query(sqlQuery, [deptName, deptId], (error, result) => {
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
router.post("/deleteDeptMaster", (req, res) => {
    const deptId = req.body.deptId;
    console.log(deptId)
    //DELETE FROM table_name WHERE condition;

    const sqlQuery = `DELETE FROM department WHERE department_id=?`;

    dbConn.query(sqlQuery, [deptId], (error, result) => {
        if (error) {
            console.log(error)
            res.send("ERROR")
        }
        else if (result) {
            res.status(200).send("DELETED")
        }
    })
})

router.get("/getDeptMaster", (req, res) => {

    const sqlQuery = "SELECT department_id, department FROM department order by department_id desc";
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