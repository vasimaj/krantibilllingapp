import React, { useState, useEffect, useLayoutEffect } from "react";

import PageLayout from "../../layouts/PageLayout";
import { ToastContainer, toast } from 'react-toastify';
import { Box, Icon, Text, Item, Anchor, Heading } from "../../components/elements";
import { Row, Col, Form, Button, } from "react-bootstrap";

import { Breadcrumb } from "../../components";
import { CardLayout } from "../../components/cards";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from "axios";
//APIURL
import { getCountryMasterApi, getStateMasterApi, getCityMasterApi } from "../../Services/MasterServices/locationMasterAPIURL";
import { saveCompanyMasterApi } from "../../Services/MasterServices/companyMasterAPIURL";


const CompanyMasterForm = () => {
    const [value, setValue] = useState(new Date());

    const [id, setId] = useState("");
    const [name, setName] = useState("");

    const [phone, setPhone] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [gst, setGst] = useState("");
    const [sac, setSac] = useState("");
    const [pan, setPan] = useState("");

    const [regDate, setRegDate] = useState(new Date());
    const [validDate, setValidDate] = useState(new Date());

    const [companyLogo, setCompanyLogo] = useState(null);


    const [countryObj, setCountryObj] = useState(null);
    const [stateObj, setStateObj] = useState(null);
    const [cityObj, setCityObj] = useState(null);

    const [countryData, setCountryData] = useState([]);
    const [stateData, setStateData] = useState([]);
    const [cityData, setCityData] = useState([]);


    const getCountryData = async () => {
        await axios.get(getCountryMasterApi)
            .then((res) => {
                if (res.data !== null) {
                    setCountryData(res.data);
                }
            })
            .catch((err) => {
                console.log("Error :" + err)
            })
    }

    const getStateData = async (id) => {
        await axios.get(getStateMasterApi + id)
            .then((res) => {
                if (res.data !== null) {
                    setStateData(res.data);
                }
            })
            .catch((err) => {
                console.log("Error :" + err)
            })
    }

    const getCityData = async (id) => {
        await axios.get(getCityMasterApi + id)
            .then((res) => {
                if (res.data !== null) {
                    setCityData(res.data);
                }
            })
            .catch((err) => {
                console.log("Error :" + err)
            })
    }

    useEffect(() => {
        getCountryData();
    }, [])

    const clearFun = () => {
        setId("")
        setName("")
        setPhone("");
        setMobile("");
        setEmail("");
        setAddress("");
        setGst("");
        setSac("");
        setPan("");
        setRegDate(new Date());
        setValidDate(new Date());

        setCountryObj(null);
        setStateObj(null);
        setCityObj(null);
        setStateData([]);
        setCityData([]);
    }

    const saveCompanyFun = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("file", companyLogo);
        formData.append("name", name);
        formData.append("phone", phone);
        formData.append("mobile", mobile);
        formData.append("email", email);

        formData.append("address", address);
        formData.append("gst", gst);
        formData.append("sac", sac);
        formData.append("pan", pan);

        formData.append("countryId", countryObj.country_id);
        formData.append("stateId", stateObj.state_id);
        formData.append("cityId", cityObj.city_id);

        formData.append("regDate", regDate);
        formData.append("validDate", validDate);

        await axios.post(saveCompanyMasterApi, formData)
            .then((res) => {
                if (res.data === "SAVED") {
                    toast.success("Company Saved Sucessfully.")
                    clearFun();
                }
                else if (res.data === "ERROR") {
                    toast.error("Error occured, Try after sometime.")
                }
            })
            .catch((err) => {
                toast.error("Network Error, Try after sometime.")
                console.log(err)
            })
    }




    return (

        <PageLayout>
            <CardLayout className="mb-4">
                <Breadcrumb title={"Company Master"}>

                    <Item className="mc-breadcrumb-item">
                        <Anchor className="mc-breadcrumb-link" href={"/"}>{"Home"}</Anchor>
                    </Item>
                    <Item className="mc-breadcrumb-item">
                        {"Company Master"}
                    </Item>

                </Breadcrumb>

            </CardLayout>
            <CardLayout>
                <Form onSubmit={saveCompanyFun} encType="multipart/form-data" >



                    <Row className="mb-3">
                        <Col sm={12} md={12} lg={12} xl={12}>
                            <Form.Label>Company Name:</Form.Label>
                            <TextField id="CompanyName" margin="none" label="Enter Company Name" variant="outlined" size="small" fullWidth required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Col>

                    </Row>


                    <Row className="mb-3">
                        <Col sm={4} md={4} lg={4} xl={4}>
                            <Form.Label>Phone No:</Form.Label>
                            <TextField id="phoneNo" margin="none" label="Phone No" variant="outlined" size="small" fullWidth required
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </Col>

                        <Col sm={4} md={4} lg={4} xl={4}>
                            <Form.Label>Mobile No:</Form.Label>
                            <TextField id="mobileNo" margin="none" label="Mobile No" variant="outlined" size="small" fullWidth required
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                            />
                        </Col>

                        <Col sm={4} md={4} lg={4} xl={4}>
                            <Form.Label>Email Id:</Form.Label>
                            <TextField id="emailId" type={'email'} margin="none" label="Email Id" variant="outlined" size="small" fullWidth required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Col>


                    </Row>

                    <Row className="mb-3">
                        <Col sm={12} md={12} lg={12} xl={12}>
                            <Form.Label>Company Address:</Form.Label>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Enter Company Address"
                                multiline
                                rows={4}
                                size="small" fullWidth
                                required
                                margin="none"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col sm={4} md={4} lg={4} xl={4}>
                            <Form.Label>GST No:</Form.Label>
                            <TextField id="gstNo" margin="none" label="GST No" variant="outlined" size="small" fullWidth required
                                value={gst}
                                onChange={(e) => setGst(e.target.value)}
                            />
                        </Col>

                        <Col sm={4} md={4} lg={4} xl={4}>
                            <Form.Label>SAC Code:</Form.Label>
                            <TextField id="sacCode" margin="none" label="SAC Code" variant="outlined" size="small" fullWidth required
                                value={sac}
                                onChange={(e) => setSac(e.target.value)}
                            />
                        </Col>

                        <Col sm={4} md={4} lg={4} xl={4}>
                            <Form.Label>PAN No:</Form.Label>
                            <TextField id="panNo" margin="none" label="PAN No" variant="outlined" size="small" fullWidth required
                                value={pan}
                                onChange={(e) => setPan(e.target.value)}
                            />
                        </Col>


                    </Row>

                    <Row className="mb-3">
                        <Col sm={4} md={4} lg={4} xl={4}>
                            <Form.Label>Country:</Form.Label>
                            <Autocomplete
                                id="countryId"
                                options={countryData}
                                getOptionLabel={(option) => option.country}
                                fullWidth
                                renderInput={(params) => <TextField {...params} label="Select Country" margin='none' />}
                                size='small'
                                value={countryObj}
                                onChange={(event, newValue) => {
                                    setCountryObj(newValue);
                                    setCityData([]);
                                    setCityObj(null)

                                    if (newValue !== null) {
                                        getStateData(newValue.country_id)
                                    }
                                    else {
                                        setStateData([])
                                        setStateObj(null);
                                    }
                                }}
                            />
                        </Col>

                        <Col sm={4} md={4} lg={4} xl={4}>
                            <Form.Label>State:</Form.Label>
                            <Autocomplete
                                id="stateId"
                                options={stateData}
                                getOptionLabel={(option) => option.state_name}
                                fullWidth
                                renderInput={(params) => <TextField {...params} label="Select State" margin='none' />}
                                size='small'
                                value={stateObj}
                                onChange={(event, newValue) => {
                                    setStateObj(newValue);
                                    setCityObj(null);
                                    if (newValue !== null) {
                                        getCityData(newValue.state_id);
                                    }
                                    else {
                                        setCityData([]);
                                    }
                                }}
                            />
                        </Col>

                        <Col sm={4} md={4} lg={4} xl={4}>
                            <Form.Label>City:</Form.Label>
                            <Autocomplete
                                id="cityId"
                                options={cityData}
                                getOptionLabel={(option) => option.city_name}
                                fullWidth
                                renderInput={(params) => <TextField {...params} label="Select City" margin='none' />}
                                size='small'
                                value={cityObj}
                                onChange={(event, newValue) => {
                                    setCityObj(newValue);
                                }}
                            />
                        </Col>
                    </Row>
                    <Row className="mb-1">
                        <Col sm={4} md={4} lg={4} xl={4}>
                            <Form.Label>Registration Date:</Form.Label>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Registration Date"
                                    value={regDate}
                                    onChange={(newValue) => {
                                        setRegDate(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params}
                                        margin='none'
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        required
                                    />}
                                />
                            </LocalizationProvider>
                        </Col>

                        <Col sm={4} md={4} lg={4} xl={4}>
                            <Form.Label>Valid Upto Date:</Form.Label>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Valid Upto Date"
                                    value={validDate}
                                    onChange={(newValue) => {
                                        setValidDate(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params}
                                        margin='dense'
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        required
                                    />}
                                />
                            </LocalizationProvider>

                        </Col>

                        <Col sm={4} md={4} lg={4} xl={4}>
                            <Form.Label>Company Logo:</Form.Label>
                            <input id="companyLogo" type={'file'} name='file' margin="dense" className="form-control mt-2 form-control-sm" required
                                onChange={(e) => setCompanyLogo(e.target.files[0])}
                            />
                        </Col>
                    </Row>


                    <Row className="mt-1">
                        <Col sm={4} md={4}>
                            <Button type="submit"
                                className={(id !== "") ? "btn btn-warning text-dark btn-sm" : "btn btn-primary btn-sm"}
                            // onClick={() => {
                            //     if (id !== "") {
                            //         state.button = 2
                            //     }
                            //     else {
                            //         state.button = 1
                            //     }
                            // }}
                            >
                                {(id !== "") ? "Update" : "Submit"}

                            </Button>

                            <Button type="button" className="btn- btn-danger btn-sm mx-2"
                                onClick={clearFun}
                            >
                                Cancle
                            </Button>
                        </Col>
                    </Row>


                </Form>
            </CardLayout>



            <ToastContainer position="top-right" />

        </PageLayout>
    )
}

export default CompanyMasterForm;
