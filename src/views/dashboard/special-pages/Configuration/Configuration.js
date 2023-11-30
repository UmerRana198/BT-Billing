  // import axios from "axios";
  // import { useEffect, useState } from "react";
  // function Configuration() {
  // const [id, setId] = useState("");
  // const [configKey, setConfigkey] = useState("");
  // const [configValue, setConfigValue] = useState("");
  // const [config, setUsers] = useState([]);
  
  //   useEffect(() => {
  //     (async () => await Load())();
  //   }, []);
  
  //   async function Load() {
      
  //     const result = await axios.get("https://bahriatownbilling.bsite.net/api/TblConfiguration");
  //     setUsers(result.data);
  //     console.log(result.data);
  //   }
  
  //    async function save(event) {
    
  //      event.preventDefault();
  //      try {
  //        await axios.post("https://bahriatownbilling.bsite.net/api/TblConfiguration", {
          
  //        configKey: configKey,
  //        configValue: configValue,
        
  //        });
  //        alert("Configuration Save Successfully");
  //            setId("");
  //            setConfigkey("");
  //            setConfigValue("");
        
      
  //        Load();
  //      } catch (err) {
  //        alert(err);
  //      }
  //    }
  //    async function edit(config) {
  //     setConfigkey(config.configKey);
  //     setConfigValue(config.configValue);
    
  
  //      setId(config.id);
  //     }
  
  //    async function Delete(id) {
  //    await axios.delete("https://bahriatownbilling.bsite.net/api/TblConfiguration/" + id);
  //     alert("Configuration deleted Successfully");
  //     setId("");
  //     setConfigkey("");
  //     setConfigValue("");
  //     Load();
  //    }
  
  //    async function update(event)
  //     {
  //      event.preventDefault();
  //      try {
  //      await axios.put("https://bahriatownbilling.bsite.net/api/TblConfiguration/"+ config.find((u) => u.id === id).id || id,
  //          {
  //          id: id,
  //          configKey: configKey,
  //          configValue: configValue,
  //          }
  //        );
  //        alert("Configuration  Update SuccessFully");
  //        setId("");
  //        setConfigkey("");
  //        setConfigValue("");
  //        Load();
  //      } catch (err) {
  //        alert(err);
  //      }
  //   }
  //     return (
  //       <div>
  //         <h1>Student Details</h1>
  //       <div class="container mt-4">
  //         <form>
  //           <div class="form-group">
            
  //             <input
  //               type="text"
  //               class="form-control"
  //               id="id"
                
  //               value={id}
  //               onChange={(event) => {
  //                 setId(event.target.value);
  //               }}
  //             />
  //             <label>Configuration Key</label>
  //             <input
  //               type="text"
  //               class="form-control"
  //               id="txtconfigKey"
  //               value={configKey}
  //               onChange={(event) => {
  //                 setConfigkey(event.target.value);
  //               }}
  //             />
  //           </div>
  //           <div class="form-group">
  //             <label>COnfiguration Value</label>
  //             <input
  //               type="text"
  //               class="form-control"
  //               id="txtconfigValue"
  //               value={configValue}
  //               onChange={(event) => {
  //                 setConfigValue(event.target.value);
  //               }}
  //             />
  //           </div>
  //           <div>
  //             <button class="btn btn-primary mt-4" onClick={save}>
  //               Submit
  //             </button>
  //             <button class="btn btn-warning mt-4" onClick={update}>
  //               Update
  //             </button>
  //           </div>
  //         </form>
  //       </div>
  //       <br></br>
  //       <table class="table table-dark" align="center">
  //         <thead>
  //           <tr>
  //             <th scope="col">Id</th>
  //             <th scope="col">COnfig key</th>
  //             <th scope="col">COnfig value</th>
          
  
  //             <th scope="col">Option</th>
  //           </tr>
  //         </thead>
  //         {config.map(function fn(configs) {
  //           return (
  //             <tbody>
  //               <tr>
  //                 <th scope="row">{configs.id} </th>
  //                 <td>{configs.configKey}</td>
  //                 <td>{configs.configValue}</td>
                  
  //                 <td>
  //                   <button
  //                     type="button"
  //                     class="btn btn-warning"
  //                     onClick={() => edit(configs)}
  //                   >
  //                     Edit
  //                   </button>
  //                   <button
  //                     type="button"
  //                     class="btn btn-danger"
  //                     onClick={() => Delete(configs.id)}
  //                   >
  //                     Delete
  //                   </button>
  //                 </td>
  //               </tr>
  //             </tbody>
  //           );
  //         })}
  //       </table>
          
  //       </div>
  //     );
  //   }
    
  //   export default Configuration;

















  import { Form, Button, Tab, Nav, TabPane } from "react-bootstrap";
  import Row from "react-bootstrap/Row";
  import Col from "react-bootstrap/Col";
  import axios from "axios";
  import { useState, useEffect } from "react";
  // import NavBar from './NavBar'
  import { useNavigate } from "react-router-dom";
  import { DataGrid } from "@mui/x-data-grid";
  import { notification } from 'antd';
  // import "./GridStyle.css";

  const Addcustomer = () => {
    const navigate = useNavigate();
    const [Configurationdata, setConfigurationData] = useState([]);
    const [data, setData] = useState([]);
    const [taxData, setTaxData] = useState([]);
    const [tariffData, setTariffData] = useState([]);
    const [formSubmissionCount, setFormSubmissionCount] = useState(0);
    const [selectedConfigRow, setSelectedConfigRow] = useState(null); // Track selected configuration row
    const [selectedTaxRow, setSelectedTaxRow] = useState(null); // Track selected tax row
    const [selectedTariffRow, setSelectedTariffRow] = useState(null); // Track selected tariff row
  //

    useEffect(() => {
      getTaxInformations();
      getConfigurations();
      // getTaxInformations();
      getTarrifs()
    }, [formSubmissionCount]);

    const [Configuration, setConfiguration] = useState({
      configid: "",
      configkey: "",
      configvalue: "",
    });

    const [Tarrif, setTarrif] = useState({
      name: "",
      tarifftype: "",
      startrange: "",
      endrange: "",
      fixrate: "",
      phrate: "",
      ophrate: "",
      istwometer: "0",
      tariffid: ""
    });

    const [MeterType, setMeterType] = useState({
      meterid: "",
      metertype: "",
      meterno: "",
      btno: "",
    });

    const [TaxInfo, setTaxInfo] = useState({
      taxid: "",
      taxtype: "",
      startrange: "",
      endrange: "",
      taxvalue: "",
    });

    const Configcolumns = [
      { field: "configid", headerName: "Config Id", width: 150 },
      { field: "configkey", headerName: "Config Key", width: 150 },
      { field: "configvalue", headerName: "Config Value", width: 450 },
    ];

    const Configrows = data.map((row) => ({
      id: row.configid,
      configid: row.configid,
      configkey: row.configkey,
      configvalue: row.configvalue,
    }));

    const Taxcolumns = [
      { field: "taxid", headerName: "Tax Id", width: 150 },
      { field: "taxtype", headerName: "Tax Type", width: 250 },
      { field: "startrange", headerName: "Start Range", width: 150 },
      { field: "endrange", headerName: "End Range", width: 180 },
      { field: "taxvalue", headerName: "Tax Value", width: 180 },
    ];

    const Taxrows = taxData.map((row) => ({
      taxid: row.taxid,
      taxtype: row.taxtype,
      startrange: row.startrange,
      endrange: row.endrange,
      taxvalue: row.taxvalue,
    }));
    const handleConfigRowClick = (params) => {
      const selectedRow = Configrows.find((row) => row.id === params.id);
      setConfiguration(selectedRow);
      setSelectedConfigRow("1")
      // console.log(selectedRow)
      // alert("hello")
    };

    const handleTaxRowClick = (params) => {
      const selectedRow = Taxrows.find((row) => row.taxid === params.id);
      setTaxInfo(selectedRow);
      setSelectedTaxRow("1")
    };


    const handleTariffRowClick = (params) => {
      const selectedRow = tariffData.find((row) => row.tariffid === params.id);
      setTarrif(selectedRow);
      setSelectedTariffRow("1")
      // console.log(Tarrif)
    };

    const tariffcolumns = [
      { field: "tariffid", headerName: "Tariff Id", width: 150 },
      { field: "name", headerName: "Config Key", width: 150 },
      { field: "tarifftype", headerName: "Tariff Type", width: 150 },
      { field: "startrange", headerName: "start Range", width: 150 },
      { field: "endrange", headerName: "End Range", width: 150 },
      { field: "fixrate", headerName: "Fix Rate", width: 150 },
      // { field: "phrate", headerName: "Ph Rate", width: 150 },
    ];

    const tarrifrows = tariffData.map((row) => ({
      tariffid: row.tariffid,
      name: row.name,
      tarifftype: row.tarifftype,
      startrange: row.startrange,
      endrange: row.endrange,
      fixrate: row.fixrate,
      phrate: row.phrate,
      ophrate: row.ophrate
    }));

    const getConfigurations = async () => {
      await axios
        .get("https://ebill.bsite.net/api/Configurations")
        .then((res) => {
          setData(res.data);
          // console.log(res.data);
        });
    };

    const getTarrifs = async () => {
      await axios
        .get("https://ebill.bsite.net/api/Tariffs")
        .then((res) => {
          setTariffData(res.data);
          // console.log(tariffData);
        });
    };

    const getMeterInformations = async () => {
      await axios
        .get("https://ebill.bsite.net/api/MeterInformations")
        .then((res) => {
          setData(res.data);
          // console.log(res.data);
        });
    };

    const getTaxInformations = async () => {
      await axios
        .get("https://ebill.bsite.net/api/TaxInformations")
        .then((res) => {
          setTaxData(res.data);
          // console.log(res.data);
        });
    };

    const resetForm = () => {
      setConfiguration({
        configid: "",
        configkey: "",
        configvalue: "",
      });

      setTarrif({
        tariffid: "",
        name: "",
        tarifftype: "",
        startrange: "",
        endrange: "",
        fixrate: "",
        phrate: "",
        ophrate: "",
        istwometer: "0",
      });

      setMeterType({
        meterid: "",
        metertype: "",
        meterno: "",
        btno: "",
      });

      setTaxInfo({
        taxid: "",
        taxtype: "",
        startrange: "",
        endrange: "",
        taxvalue: "",
      });
    };

    const [errors, setErrors] = useState({});
    const [submit, setSubmit] = useState("");
    const [errorexist, setErrorExist] = useState("");
    const [saveStatus, setSaveStatus] = useState("");
    const [dataArray1, setDataArray1] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);

    const validateConfigurationForm = () => {
      const { configid, configkey, configvalue } = Configuration;
      const newError = {};
      if (!configid || configid === "") newError.configid = "Config Id required";
      if (!configkey || configkey === "")
        newError.configkey = "Config key required";
      if (!configvalue || configvalue === "")
        newError.configvalue = "Config Value required";
      return newError;
    };

    const validateTarrifForm = () => {
      const {
        tariffid,
        name,
        tarifftype,
        startrange,
        endrange,
        fixrate,
        phrate,
        ophrate,
      } = Tarrif;
      const newError = {};

      if (!tariffid || tariffid === "")
        newError.tariffid = "Tarrif id required";
      if (!name || name.trim() === "") newError.name = "Tarrif Name required";
      if (!tarifftype || tarifftype.trim() === "")
        newError.tarifftype = "Tarrif Type required";
      if (!startrange || startrange.trim() === "")
        newError.startrange = "Start Range required";
      if (!endrange || endrange.trim() === "")
        newError.endrange = "End Range required";
      if (!fixrate || fixrate.trim() === "")
        newError.fixrate = "Fixrate Value required";
      if (!phrate || phrate.trim() === "") newError.phrate = "Ph rate required";
      if (!ophrate || ophrate.trim() === "")
        newError.ophrate = "OPH rate required";
      return newError;
    };

    const validateMeterTypeForm = () => {
      const { meterid, meterno, metertype, btno } = MeterType;
      const newError = {};
      if (!meterid || meterid === "") newError.meterid = "Meter id required";
      if (!meterno || meterno === "") newError.meterno = "Meter No required";
      if (!metertype || metertype === "")
        newError.metertype = "Meter Type required";
      if (!btno || btno === "") newError.btno = "BT No required";
      return newError;
    };

    const validateTaxForm = () => {
      const { taxid, taxtype, startrange, endrange, taxvalue } = TaxInfo;
      const newError = {};
      if (!taxid || taxid === "") newError.taxid = "Tax Id required";
      if (!taxtype || taxtype === "") newError.taxtype = "Tax Type required";
      if (!startrange || startrange === "")
        newError.startrange = "Start Range required";
      if (!endrange || endrange === "") newError.endrange = "End Range required";
      if (!taxvalue || taxvalue === "") newError.taxvalue = "Tax value  required";
      return newError;
    };

    const handleInput = (e, form) => {
      const { name, value } = e.target;
      switch (form) {
        case "Configuration":
          setConfiguration({ ...Configuration, [name]: value });
          if (!!errors[name]) setErrors({ ...errors, [name]: null });
          break;
        case "Tarrif":
          setTarrif({ ...Tarrif, [name]: value });
          if (!!errors[name]) setErrors({ ...errors, [name]: null });
          break;
        case "MeterType":
          setMeterType({ ...MeterType, [name]: value });
          if (!!errors[name]) setErrors({ ...errors, [name]: null });
          break;
        case "TaxInfo":
          setTaxInfo({ ...TaxInfo, [name]: value });
          if (!!errors[name]) setErrors({ ...errors, [name]: null });
          break;
        // Add more cases for additional forms if needed
        default:
          break;
      }
    };



  const handleConfigUpdate=(e)=>{
    e.preventDefault();
    // alert("hello")
      setSubmit("submitted");
      setErrorExist("errorexist");
      const formErrors = validateConfigurationForm();
      if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
        // console.log("Errors in Form");
        alert("Error in form submission");
      } else {
        // console.log(Configuration);
        axios
          .put(`https://ebill.bsite.net/api/Configurations/${Configuration.configid}`, Configuration)

          .then((res) => {
            notification.success({
              message: 'Record Updated',
            
              style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '40px',
                width: '320px',
              },
            });
            console.log(Configuration)
            setSelectedConfigRow("")
            setFormSubmissionCount((prevCount) => prevCount + 1);
            resetForm();

            // window.location.reload()
            // navigate("/viewCustomer", { replace: true });
            setSaveStatus("Saved");
          })
          .catch((error) => {
            if (error.response.status === 400) {
              alert("Wrong Data Format. Please Enter Correct Data");
            }
            if (error.response.status === 409) {
              // console.log(error.response.data);
              alert("Configuration ID Already Exist");
            } else if (error.response.status === 401) {
              alert("Unauthorized");
            } else if (error.response.status === 403) {
              alert("Forbidden");
            } else if (error.response.status === 404) {
              alert("Not Found");
            } else if (error.response.status === 503) {
              alert("Service Unavailable");
            }
          });
      }
    };


  
    const handleConfiguarationSubmit = (e) => {
      // console.log("Submited .............");
      console.log(Configuration);
      e.preventDefault();
      setSubmit("submitted");
      setErrorExist("errorexist");
      const formErrors = validateConfigurationForm();
      if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
        notification.error({
          message: "Error in form submission",
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "40px",
            width: "320px",
          },
        });

      } else {
        
        axios
          .post("https://ebill.bsite.net/api/Configurations", Configuration)
        // .post("https://localhost:7285/api/Configurations", Configuration) 
          .then((res) => {
            notification.success({
              message: 'Record Saved',
              style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '40px',
                width: '320px',
              },
            });
            setFormSubmissionCount((prevCount) => prevCount + 1);
            resetForm();
            setSaveStatus("Saved");
          })
          .catch((error) => {
            if (error.response.status === 400) {
              notification.error({
                message: 'Wrong Data Format. Please Enter Correct Data',
                style: {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '40px',
                  width: '320px',
                },
              });
            
            }
            if (error.response.status === 409) {
              notification.error({
                message: 'Configuration ID Already Exist',
                style: {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '40px',
                  width: '320px',
                },
              });
            } else if (error.response.status === 401) {
              notification.error({
                message: 'Unauthorized',
                style: {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '40px',
                  width: '320px',
                },
              });
            
            } else if (error.response.status === 403) {
              notification.error({
                message: 'Forbidden',
                style: {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '40px',
                  width: '320px',
                },
              });
            } else if (error.response.status === 404) {
              notification.error({
                message: 'Not Found',
                style: {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '40px',
                  width: '320px',
                },
              });
            
            } else if (error.response.status === 503) {
              notification.error({
                message: 'Service Unavailable',
                style: {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '40px',
                  width: '320px',
                },
              });
            
            }
          });
      }
    };


    return (
      <div style={{  width: "100%",marginTop:'60px'}}>
        <Tab.Container defaultActiveKey="configuration">
          <Nav variant="tabs" className="mb-3">
            <Nav.Item>
              <Nav.Link eventKey="configuration">Configuration</Nav.Link>
            </Nav.Item>

          
          </Nav>

          <Tab.Content>
            <Tab.Pane
              eventKey="configuration"
            
            >
            
              <Form onSubmit={handleConfiguarationSubmit}>
                <Form.Group >
                  <Row className="p-1">
                    <Col xl={3}>
                      <Form.Label style={{ color: "black" }}>
                        Config Id
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Config Id"
                        name="configid"
                        value={Configuration.configid}
                        onChange={(e) => handleInput(e, "Configuration")}
                        isInvalid={!!errors.configid}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.configid}
                      </Form.Control.Feedback>
                    </Col>

                    <Col xl={3}>
                      <Form.Label style={{ color: "Black" }}>
                        Config Key
                      </Form.Label>
                      <Form.Select
                        name="configkey"
                        value={Configuration.configkey}
                        onChange={(e) => handleInput(e, "Configuration")}
                        isInvalid={!!errors.configkey}
                      >
                        <option value="">Select option</option>
                        <option value="Meter Type">Meter Type</option>
                        <option value="Project">Project</option>
                        <option value="SubProject">Sub Project</option>
                        <option value="Bank Name">Bank Name</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.electricity}
                      </Form.Control.Feedback>
                    </Col>

                    <Col xl={3}>
                      <Form.Label style={{ color: "black" }}>
                        Config Value
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="configvalue"
                        onChange={(e) => handleInput(e, "Configuration")}
                        value={Configuration.configvalue}
                        isInvalid={!!errors.configvalue}
                        placeholder="Config Value"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.configvalue}
                      </Form.Control.Feedback>
                    </Col>

                    {/* <Col xl={3} style={{ marginTop: "26PX" }}>
                      <Button
                        variant="primary"
                        type="submit"
                        onSubmit={handleConfiguarationSubmit}
                      >
                        Add Detail
                      </Button>
                    </Col> */}




                    <Col xl={3} style={{ marginTop: "26PX" }}>
                      {selectedConfigRow ? (
                        <Button variant="primary" type="submit" onClick={handleConfigUpdate}>
                          Update Detail
                        </Button>
                      ) : (
                        <Button variant="primary" type="submit">
                          Add Detail
                        </Button>
                      )}
                    </Col>
                  </Row>
                </Form.Group>
              </Form>

              <DataGrid
                style={{ height: 630, marginTop: "20px",  backgroundColor: "white"  }}
                rows={Configrows}
                columns={Configcolumns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                onRowDoubleClick={handleConfigRowClick}
                headerClassName="datagrid-header"
                getRowId={(row) => row.configid}

              />
            </Tab.Pane>
          
          </Tab.Content>
        </Tab.Container>
      </div>
    );
  };

  export default Addcustomer;


























