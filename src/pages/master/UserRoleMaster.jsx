import React, { useState, useEffect } from "react";
import data from "../../data/master/analytics.json";
import Modal from 'react-bootstrap/Modal';
import PageLayout from "../../layouts/PageLayout";
import { ToastContainer, toast } from 'react-toastify';
import { Box, Icon, Text, Item, Anchor, Heading } from "../../components/elements";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Breadcrumb } from "../../components";
import {
    DataGrid,
    GridToolbarQuickFilter,
    GridLinkOperator,
} from '@mui/x-data-grid';
import { MdEdit, MdDelete } from "react-icons/md";
import axios from 'axios';

import { saveUserRoleMasterApi, updateUserRoleMasterApi, getUserRoleMasterApi , deleteUserRoleMasterApi} from '../../Services/MasterServices/userRoleMasterAPIURL';


const UserRoleMaster = () => {


    const [alertModal, setAlertModal] = useState(false);
    const [ind, setInd] = useState("");
    const [id, setId] = useState("");
    const [name, setName] = useState("");

    const [searchTerm, setSearchTerm] = useState("");

    const [pageSize, setPageSize] = useState(5);

    const columns = [
        { field: 'role_id', headerName: 'ID', width: 80, headerClassName: 'mc-table-head primary' },
        {
            field: 'role_name',
            headerName: 'Role Name',
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
                const onClick = (role_id, role_name) => {
                    setName(role_name);
                    setId(role_id);
                };

                return <>
                    <span onClick={() => {
                        onClick(params.row.role_id, params.row.role_name);
                    }}
                        style={{ backgroundColor: "#ddfbe9", borderRadius: "10px" }}
                    >
                        <MdEdit style={{ fontSize: "16px", margin: "4px", color: "#1a9f53", cursor: "pointer" }} />
                    </span>

                    <span onClick={() => { setAlertModal(true); setId(params.row.role_id) }}
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
        await axios.get(getUserRoleMasterApi)
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
            "role_id": id,
            "role_name": name
        }

        await axios.post(updateUserRoleMasterApi, updateObj)
            .then((res) => {
                if (res.data === "UPDATED") {
                    clearFun();
                    getTypeMasterData();
                    toast.success("User Role Master updated sucessfully");
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
            "role_name": name
        }

        await axios.post(saveUserRoleMasterApi, saveObj)
            .then((res) => {
                if (res.data === "SAVED") {
                    getTypeMasterData();
                    clearFun();
                    toast.success("User Role Master saved sucessfully");
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
            "role_id": id            
        }
        await axios.post(deleteUserRoleMasterApi, delObj)
            .then((res) => {
                if (res.data === "DELETED") {
                    clearFun();
                    getTypeMasterData();
                    toast.success("User Role Master deleted sucessfully");
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
    }

    useEffect(() => {
        setFilterData(
            tableData.filter(
                (item) =>
                    item.role_name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm]);


    return (

        <PageLayout>
            <Row>
                <Col xl={12}>
                    <Box className="mc-card">
                    <Breadcrumb title={"User Role Master"}>
                            
                            <Item  className="mc-breadcrumb-item">
                               <Anchor className="mc-breadcrumb-link" href={'/'}>{"Home"}</Anchor> 
                            </Item>
                            <Item  className="mc-breadcrumb-item">
                               {"Dashboard"}
                            </Item>
                            <Item  className="mc-breadcrumb-item">
                               {"User Role Master"}
                            </Item>
                        
                    </Breadcrumb>
                    </Box>
                </Col>
            </Row>

            <Row className="my-2">
                <Col xl={4}>
                    <Form onSubmit={saveFun}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>User Role :</Form.Label>
                            <Form.Control type="text" placeholder="Enter User Role..." required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
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
            </Row>
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
                            getRowId={(row) => row.role_id}
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

export default UserRoleMaster;
