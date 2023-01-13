const express=require("express");
const router=express.Router();

const dbConn=require('../../config/Config.js');

router.post('/inserttax',(req,res)=>{
   
    const {Tax_Name,Cgst,Sgst,Igst,Cess,Created_by_id,Companyid,user_id}=req.body;

    const sqlQuery=`INSERT INTO taxmaster(Tax_Name,Cgst,Sgst,Igst,Cess,Status,Created_by_id,dt_created_on,Updated_by_id,last_updated_on,Companyid,user_id)VALUES("${Tax_Name}","${Cgst}","${Sgst}","${Igst}","${Cess}",1,"${Created_by_id}",NOW(),null,NOW(),"${Companyid}","${user_id}") `;

    dbConn.query(sqlQuery,(error,result)=>{
       
       if(error)
       {
          console.log(error);
          res.send(error);

        }
        else if(result)
        {
            res.status(200).send("Success");
        }
        
    });


   

})

router.post('/deletetaxmaster',(req,res)=>{
    const {tax_id,Companyid,user_id}=req.body;

    const sqlQuery=`DELETE FROM  taxmaster WHERE tax_id=? and Companyid=? and user_id=?`;

    dbConn.query(sqlQuery,[tax_id,Companyid,user_id],(error,result)=>{
        if(error)
        {
            console.log(error);
            res.send(error)
        }
        else if(result)
        {
            res.status(200).send(result)
        }
    })
})

module.exports=router;