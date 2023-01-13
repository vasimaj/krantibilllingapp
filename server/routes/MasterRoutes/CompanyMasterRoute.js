const express = require("express");
const router = express.Router();

const multer = require('multer')
const path = require('path')

const dbConn = require("../../Config/Config");

//! Use of Multer
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'data/images/')     // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        let originName = path.parse(file.originalname).name;
        //console.log(file.originalname)
        //console.log(path.parse(file.originalname).name)
        //console.log(path.extname(file.originalname))
        //console.log(Math.random().toString(36).slice(2, 15))
        callBack(null, originName + '-' + Date.now() + Math.random().toString(36).slice(2, 15) + path.extname(file.originalname))
    }
})

var upload = multer({
    storage: storage
});

router.post("/saveCompany", upload.single('file'), (req, res) => {
    if (!req.file) {
        res.send("No file upload");
    }
    else {
        //id, name, filename, category_id, branch_id
        console.log(req.file.filename)
        const regDateConv=new Date(req.body.regDate);
        const validDateConv=new Date(req.body.validDate)

        const sqlQuery = `INSERT INTO company(company_name, company_address, company_logo, phone_no, mobile_no, GST_no, SAC_code, pan_no, email, website, state_id, RegistrationDate, Validupto, Status, Created_by_id, dt_created_on, Updated_by_id, last_updated_on, city_id) 
        values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,NOW(),?,?,?)`;
        dbConn.query(sqlQuery, [req.body.name, req.body.address, req.file.filename, req.body.phone, req.body.mobile, req.body.gst, req.body.sac, req.body.pan, req.body.email, "website", req.body.stateId, regDateConv, validDateConv, 1, 1, null, null, req.body.cityId], (error, result) => {
            if (error) {
                console.log(error)
                res.send("ERROR")
            }
            else if (result) {
                const sqlQueryNew=`INSERT INTO users (username, user_password, UserType, state_id, city_id, dt_created_on, created_by_id, Status, Companyid)
                VALUES(?, ?, ?, ?, ?, NOW(), ?, ?, (select max(company_id) from company))`;

                dbConn.query(sqlQueryNew, [req.body.email, "12345", 1, req.body.stateId, req.body.cityId, 1, 1], (error1, result1)=>{
                    if(error1){
                        console.log("Error 1:"+error1);
                        res.send("ERROR")
                    }
                    else if(result1){
                        res.send("SAVED")
                    }
                })
            }
        })
    }
})

// router.post("/getEBook/:id", (req, res) => {
//     // res.send(req.params.id);
//     let instId = req.params.id;
//     const sqlQuery = "SELECT * FROM pdf WHERE branch_id=?";
//     dbConn.query(sqlQuery, [instId], (error, result) => {
//         if (error) {
//             res.send("ERROR");
//         }
//         else {
//             res.send(result);
//         }
//     })
// })

module.exports = router;