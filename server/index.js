const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')

const port = 8088;

app.use(cors());
app.use(express.json())
app.use(express.static("./public"))
app.use(bodyParser.urlencoded({ extended: true }));

const typeMasterRoutes = require("./routes/MasterRoutes/TypeMasterRoute");
const deptMasterRoutes=require("./routes/MasterRoutes/DeptMasterRoute")
const userRoleMasterRoutes=require("./routes/MasterRoutes/UserRoleMasterRoute");
const countryMasterRoutes=require("./routes/MasterRoutes/CountryMasterRoute")
const stateMasterRoutes=require("./routes/MasterRoutes/StateMasterRoute")
const cityMasterRoutes=require("./routes/MasterRoutes/CityMasterRoute")
const companyMasterRoutes=require("./routes/MasterRoutes/CompanyMasterRoute");
const rackMasterRoutes=require("./routes/MasterRoutes/RackMaster.js");
const taxMasterRoutes=require('./routes/MasterRoutes/TaxMaster.js');
app.get("/", (req, res) => {
    res.send("Welcome to Project")
})

//Login
app.use("/ptskvs/master/type", typeMasterRoutes);
app.use("/ptskvs/master/dept", deptMasterRoutes);
app.use("/ptskvs/master/userRole", userRoleMasterRoutes);
app.use("/ptskvs/master/country", countryMasterRoutes);
app.use("/ptskvs/master/state", stateMasterRoutes);
app.use("/ptskvs/master/city", cityMasterRoutes);
app.use("/ptskvs/master/company", companyMasterRoutes);
app.use("/ptskvs/master/rack", rackMasterRoutes);
app.use("/ptskvs/master/tax", taxMasterRoutes);


app.listen(port, () => {
    console.log("on port : " + port)
})

module.exports = app;