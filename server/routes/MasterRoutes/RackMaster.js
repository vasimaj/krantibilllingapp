const express=require("express");
const router=express.Router();
const dbConn=require('../../config/Config.js');

router.post('/insertrack',(req,res)=>{

    const {RackName,RackCode,Companyid,user_id}=req.body;
    const sqlQuery=`INSERT INTO rackmaster(RackName,RackCode,Status,Created_by_id,dt_created_on,Updated_by_id,last_updated_on,Companyid,user_id)VALUES("${RackName}","${RackCode}",1,1,NOW(),1,null,"${Companyid}","${user_id}")`;

    dbConn.query(sqlQuery,(error,result)=>{
        if(error)
        {
            console.log(error);
            res.send("ERROR");
        }
        else if(result)
        {
            res.status(200).send("SAVED");
        }
    })
})

router.post("/updaterack",(req,res)=>{
    const {Rackid,RackName,RackCode,Status,Updated_by_id,user_id}=req.body;
    const sqlQuery="UPDATE rackmaster SET RackName=?,RackCode=?,Status=?,Updated_by_id=?,last_updated_on=NOW(),user_id=? WHERE Rackid=?";
    dbConn.query(sqlQuery,[RackName,RackCode,Status,Updated_by_id,user_id,Rackid],(error,result)=>{
        if(error)
        {
            console.log(error);
            res.send(error);
        }
        else if(result)
        {
            res.status(200).send("result");
        }
    })
})

router.post('/deleterackid',(req,res)=>{
    const {Rackid,Companyid,user_id}=req.body;

    const sqlQuery=`DELETE FROM  rackmaster WHERE Rackid=? and Companyid=? and user_id=?`;

    dbConn.query(sqlQuery,[Rackid,Companyid,user_id],(error,result)=>{
        if(error)
        {
            console.log(error);
            res.send(error)
        }
        else if(result)
        {
            res.status(200).send("Deleted")
        }
    })
})


module.exports=router;