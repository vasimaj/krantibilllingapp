import React, { useState, useEffect } from "react";
import data from "../../data/master/analytics.json";
import Modal from 'react-bootstrap/Modal';
import PageLayout from "../../layouts/PageLayout";
import { CardLayout } from "../../components/cards";
import { ToastContainer, toast } from 'react-toastify';
import { Box, Icon, Text, Item, Anchor, Heading } from "../../components/elements";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Breadcrumb } from "../../components";
import { TextField } from "@mui/material";
import {
    DataGrid,
    GridToolbarQuickFilter,
    GridLinkOperator,
} from '@mui/x-data-grid';
import { MdEdit, MdDelete } from "react-icons/md";
import axios from 'axios';

import { saveTypeMasterApi, updateTypeMasterApi, getTypeMasterApi , deleteTypeMasterApi} from '../../Services/MasterServices/typeMasterAPIURL';
import { saveRackMasterApi } from "../../Services/MasterServices/RackMasterAPIURL";


const ManufactureCompanyMaster = () => {


    const [alertModal, setAlertModal] = useState(false);
    const [ind, setInd] = useState("");
    const [id, setId] = useState("");
    const [name, setName] = useState("");

    //Form Fields Start
      const[rackName, setRackName]= useState("");
      const[rackCode, setRackCode]= useState("");
    //Form Fields End

    const [searchTerm, setSearchTerm] = useState("");

    const [pageSize, setPageSize] = useState(5);

    const columns = [
        { field: 'Typeid', headerName: 'ID', width: 80, headerClassName: 'mc-table-head primary' },
        {
            field: 'TypeName',
            headerName: 'Type Name',
            headerClassName: 'mc-table-head primary',
            flex: 1,
            minWidth: 120,
        },
        {
            field: "action",
            headerName: "Action",
            headerClassName: 'mc-table-head primary',
            flex: 1,
            sortable: false,
            width: 100,
            renderCell: (params) => {
                const onClick = (Typeid, TypeName) => {
                    setName(TypeName);
                    setId(Typeid);
                };

                return <>
                    <span onClick={() => {
                        onClick(params.row.Typeid, params.row.TypeName);
                    }}
                        style={{ backgroundColor: "#ddfbe9", borderRadius: "10px" }}
                    >
                        <MdEdit style={{ fontSize: "16px", margin: "4px", color: "#1a9f53", cursor: "pointer" }} />
                    </span>

                    <span onClick={() => { setAlertModal(true); setId(params.row.Typeid) }}
                        style={{ backgroundColor: "#ffdfe4", borderRadius: "10px", marginLeft: "6px" }}
                    >
                        <MdDelete style={{ fontSize: "16px", margin: "4px", color: "#f11133", cursor: "pointer" }} />
                    </span>
                </>;
            }
        }
    ];



    const [tableData, setTabelData] = useState([]);
    const [filterData, setFilterData] = useState([]);

    const getTypeMasterData = async () => {
        await axios.get(getTypeMasterApi)
            .then((res) => {
                if (res.data === "ERROR") {
                    toast.error("Data fetching failed.")
                }
                else {
                    setTabelData(res.data);
                    setFilterData(res.data);
                }
            })
    }

    useEffect(() => {
        getTypeMasterData();
    }, []);

    const state = {
        button: 1
    }

    const saveFun = (e) => {
        e.preventDefault();
        if (state.button === 1) {
            insertFun();
        }
        else {
            updateFun();
        }
    }

    const updateFun = async () => {

        const updateObj = {
            "Typeid": id,
            "TypeName": name
        }

        await axios.post(updateTypeMasterApi, updateObj)
            .then((res) => {
                if (res.data === "UPDATED") {
                    clearFun();
                    getTypeMasterData();
                    toast.success("Type Master updated sucessfully");
                }
                else {
                    toast.error("Operation Failed.");
                }
            })
            .catch((err) => {
                toast.success("Error occoured, Try after sometime.");
                console.log("Error : " + err)
            })        
    }

    const insertFun = async () => {
        //Typeid, TypeName, Status, Created_by_id, dt_created_on, Updated_by_id, last_updated_on, Companyid
        const saveObj = {
          "RackName":rackName,
          "RackCode":rackCode,
          "Companyid":1,
          "user_id":1
        }

        await axios.post(saveRackMasterApi, saveObj)
            .then((res) => {
                if (res.data === "SAVED") {
                    getTypeMasterData();
                    clearFun();
                    toast.success("Rack Master saved sucessfully");
                }
                else {
                    toast.error("Operation Failed.");
                }
            })
            .catch((err) => {
                toast.success("Error occoured, Try after sometime.");
                console.log("Error : " + err)
            })       

    }

    const delFun =async () => {
       
        const delObj = {
            "Typeid": id            
        }
        await axios.post(deleteTypeMasterApi, delObj)
            .then((res) => {
                if (res.data === "DELETED") {
                    clearFun();
                    getTypeMasterData();
                    toast.success("Type Master deleted sucessfully");
                }
                else {
                    toast.error("Operation Failed.");
                }
            })
            .catch((err) => {
                toast.success("Error occoured, Try after sometime.");
                console.log("Error : " + err)
            })        
    }

    const clearFun = () => {
        setId("")
        setName("")
        setInd("");
        setRackName("");
        setRackCode("");
    }

    useEffect(() => {
        setFilterData(
            tableData.filter(
                (item) =>
                    item.TypeName.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm]);


    return (

        <PageLayout>
            <CardLayout className="mb-4">
                <Breadcrumb title={"Manufacture Company Master"}>

                    <Item className="mc-breadcrumb-item">
                        <Anchor className="mc-breadcrumb-link" href={"/"}>{"Home"}</Anchor>
                    </Item>
                    <Item className="mc-breadcrumb-item">
                        {"Manufacture Company Master"}
                    </Item>

                </Breadcrumb>

            </CardLayout>

            <CardLayout className="my-2">
                <Col xl={10}>
                    <Form onSubmit={saveFun}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                        <div className="row">
                        <div className="col-sm-6">
                        <Form.Label>ManuFacture Company Name :</Form.Label>
                            <Form.Control type="text" placeholder="Enter ManuCompanyName..." required
                                value={rackName}
                                onChange={(e) => setRackName(e.target.value)}
                            />
                        </div>
                        <div className="col-sm-6">
                        <Form.Label>ManufacturerNo :</Form.Label>
                            <Form.Control type="text" placeholder="Enter ManufacturerNo ..." required
                                value={rackCode}
                                onChange={(e) => setRackCode(e.target.value)}
                            />
                        </div>

                        <div className="col-sm-6">
                        <Form.Label>PerceptionNo :</Form.Label>
                            <Form.Control type="text" placeholder="Enter PerceptionNo ..." required
                                value={rackCode}
                                onChange={(e) => setRackCode(e.target.value)}
                            />
                        </div>

                        <div className="col-sm-6">
                        <Form.Label>State ID :</Form.Label>
                        <Form.Control type="text" placeholder="Enter PerceptionNo ..." required
                                value={rackCode}
                                onChange={(e) => setRackCode(e.target.value)}
                            />
                           
    
                        </div>
                        </div>                            

                            
                        </Form.Group>

                        <Button type="submit"
                            className={(id !== "") ? "btn btn-warning text-dark btn-sm" : "btn btn-primary btn-sm"}
                            onClick={() => {
                                if (id !== "") {
                                    state.button = 2
                                }
                                else {
                                    state.button = 1
                                }
                            }}
                        >
                            {(id !== "") ? "Update" : "Submit"}

                        </Button>

                        <Button type="button" className="btn- btn-danger btn-sm mx-2"
                            onClick={clearFun}
                        >
                            Cancle
                        </Button>
                    </Form>
                </Col>

                <div className='row my-1'>
                <div>
                    <input
                        //className='form-control form-control-sm'
                        type="search"
                        style={{ width: "250px", display: "block", float: "right", marginBottom: "0px", border: "1px solid #C2C1C1", fontSize: "12px", padding: "6px", borderRadius: "4px" }}
                        placeholder="Search Here"
                        value={searchTerm}
                        onChange={(event) => { setSearchTerm(event.target.value); }}
                    />
                </div>
            </div>

            <Row>

                <div style={{ display: 'flex', height: '100%' }}>
                    <div style={{ flexGrow: 1 }}>
                        <DataGrid
                            sx={{
                                width: '100%',
                                '& .super-app-theme--header': {
                                    background: "rgb(43,119,229)",
                                    background: "linear-gradient(to top, rgb(43,119,229), #2b77e5)",
                                    color: "#fff",
                                },
                            }}
                            autoHeight={true}
                            getRowId={(row) => row.Typeid}
                            rows={filterData}
                            columns={columns}
                            disableColumnSelector                            
                            disableSelectionOnClick
                            disableColumnFilter                            
                            experimentalFeatures={{ newEditingApi: true }}
                            pageSize={pageSize}
                            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                            rowsPerPageOptions={[5, 10, 25, 50, 100]}
                            pagination
                        />
                    </div>
                </div>
            </Row>
            </CardLayout>
            
            <ToastContainer position="top-right" />
            <Modal show={alertModal} onHide={() => setAlertModal(false)}>
                <Box className="mc-alert-modal">
                    <Icon type="new_releases" />
                    <Heading as="h3">are your sure!</Heading>
                    <Text as="p">Want to delete this item?</Text>
                    <Modal.Footer>
                        <Button type="button" className="btn btn-secondary" onClick={() => { setAlertModal(false); clearFun() }}>nop, close</Button>
                        <Button type="button" className="btn btn-danger" onClick={() => { setAlertModal(false); delFun() }}>yes, delete</Button>
                    </Modal.Footer>
                </Box>
            </Modal>
        </PageLayout>
    )
}

export default ManufactureCompanyMaster;
