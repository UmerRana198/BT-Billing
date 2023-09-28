import dataArray from "./Util";
import { Form, Button, Tab, Nav } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useState, useEffect } from "react";
// import NavBar from './NavBar'
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";




const Addcustomer = () => {
  const navigate = useNavigate();
  const [tarrifIds, setTarrifIds] = useState([]);
  const [meterInfo, setmeterinfo] = useState([]);
  const [dataArray1, setDataArray1] = useState({});
  const [selectedMeterRow, setSelectedMeterRow] = useState(null);
  const { id } = useParams(); // Use useParams to access the route parameters
  const [formSubmissionCount, setFormSubmissionCount] = useState(0);



  async function Fetchconfigurations() {
    try {
      const response = await axios.get(
        "  https://btkbilling.bsite.net/api/Configurations"
      );
      const data = response.data;
    

      // const meterTypes = data.filter((item) => item.configkey === "Meter Type");
      const projects = data.filter((item) => item.configkey === "Project");
      const subProjects = data.filter(
        (item) => item.configkey === "SubProject"
      );
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }








  useEffect(() => {
    setDataArray1(dataArray["Customer"]);
  }, [dataArray1.btno ,formSubmissionCount]);


  const [errors, setErrors] = useState({});
  const [submit, setSubmit] = useState("");
  const [errorexist, setErrorExist] = useState("");
  const [saveStatus, setSaveStatus] = useState("");

  const validateForm = () => {
    const {
      customername,
      cnicno,
      mobileno,

      subproject,
      tariffid,

    } = dataArray1;
    const newError = {};
    // if (!customerid || customerid === "")
    //   newError.customerid = "Customer Id required";
    if (!subproject || subproject === "")
      newError.subproject = "Subproject required";
    if (!mobileno || mobileno === "") newError.mobileno = "Mobile No required";
    if (!customername || customername === "")
      newError.customername = "Customer Name required";
    if (!cnicno || cnicno === "") newError.cnicno = "CNIC No required";

    if (!tariffid || tariffid === "") newError.tariffid = "Tarrif Id required";

    return newError;
  };






  const handleInput = (e, stateKey) => {
    const { name, value } = e.target;
      setDataArray1((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    if (!!errors[name]) setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
  };




  const handleSubmit = (e) => {
    e.preventDefault();
  
    setSubmit("submitted");
    setErrorExist("errorexist");
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      console.log("Errors in Form");
      alert("Error in form submission");
    } else {
      axios
      .put(`  https://btkbilling.bsite.net/api/CustomerInformations/${dataArray1.customerno}`, dataArray1)
        .then((res) => {

          alert("Saved Successfully");
          navigate("/viewCustomer", { replace: true });
          setSaveStatus("Saved");
        })

        .catch((error) => {
          if (error.response && error.response.status === 400) {
            alert("Wrong Data Format. Please Enter Correct Data");
          } else if (error.response && error.response.status === 409) {
            console.log(error.response.data);
            alert("Customer ID Already Exists");
          } else if (error.response && error.response.status === 401) {
            alert("Unauthorized");
          } else if (error.response && error.response.status === 403) {
            alert("Forbidden");
          } else if (error.response && error.response.status === 404) {
            alert("Not Found");
          } else if (error.response && error.response.status === 503) {
            alert("Service Unavailable");
          }
        });
    }
  };




  return (
    <div style={{ width: "80%",marginLeft:'10px',marginTop:'60px' }}>
        
      <Tab.Container defaultActiveKey="customerInfo">
        <Nav variant="tabs" className="mb-3">
          <Nav.Item>
            <Nav.Link eventKey="customerInfo">Update Customer</Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content >
          <Tab.Pane eventKey="customerInfo">
            <Form onSubmit={handleSubmit}>
              <Form.Group >
                <Row className="p-1">

                <Col xl={4}>
                <label className="form-label"  style={{color:'Black'}}>
                      Bt No maintenance
                      </label>
                      <Form.Control
                        type="text"
                        placeholder="Btno Maintenance"
                        name="btnomaintenance"
                        onChange={handleInput}
                        value={dataArray1.btnomaintenance}
                        isInvalid={!!errors.btnomaintenance}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.btnomaintenance}
                      </Form.Control.Feedback>
              </Col>
                  <Col xl={4}>
                    <label className="form-label"  style={{color:'Black'}}>
                      Customer No
                    </label>
                    <Form.Control
                      type="text"
                      placeholder="Customer"
                      name="customerno"
                      value={dataArray1.customerno}
                      onChange={handleInput}
                      isInvalid={!!errors.customerno}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.customerno}
                    </Form.Control.Feedback>
                  </Col>

                  <Col xl={4}>
                  <label className="form-label"  style={{color:'Black'}}>
                      Customer Name
                    </label>
                    <Form.Control
                      type="text"
                      placeholder="Customer Name"
                      name="customername"
                      onChange={handleInput}
                      value={dataArray1.customername}
                      isInvalid={!!errors.customername}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.customername}
                    </Form.Control.Feedback>
                  </Col>

                  <Col xl={4}>
                  <label className="form-label"  style={{color:'Black'}}>CNIC No</label>
                    <Form.Control
                      type="text"
                      name="cnicno"
                      onChange={handleInput}
                      value={dataArray1.cnicno}
                      isInvalid={!!errors.cnicno}
                      placeholder="CNIC No"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.cnicno}
                    </Form.Control.Feedback>
                  </Col>

                  <Col xl={4}>
                  <label className="form-label"  style={{color:'Black'}}>
                      Father Name
                    </label>
                    <Form.Control
                      type="text"
                      name="fathername"
                      onChange={handleInput}
                      value={dataArray1.fathername}
                      isInvalid={!!errors.fathername}
                      placeholder="Father Name"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.fathername}
                    </Form.Control.Feedback>
                  </Col>

                  <Col xl={4}>
                  <label className="form-label"  style={{color:'Black'}}>
                      Mobile No
                    </label>
                    <Form.Control
                      type="text"
                      placeholder="Mobile No"
                      name="mobileno"
                      onChange={handleInput}
                      value={dataArray1.mobileno}
                      isInvalid={!!errors.mobileno}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.mobileno}
                    </Form.Control.Feedback>
                  </Col>

                  <Col xl={4}>
                  <label className="form-label"  style={{color:'Black'}}>
                      Telephone No
                    </label>
                    <Form.Control
                      type="text"
                      name="telephoneno"
                      onChange={handleInput}
                      value={dataArray1.telephoneno}
                      isInvalid={!!errors.telephoneno}
                      placeholder="Tel No"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.telephoneno}
                    </Form.Control.Feedback>
                  </Col>

                  <Col xl={4}>
                  <label className="form-label"  style={{color:'Black'}}>BT No</label>
                    <Form.Control
                      type="text"
                      placeholder="BT No"
                      name="btno"
                      value={dataArray1.btno}
                      onChange={handleInput}
                      isInvalid={!!errors.btno}

                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.btno}
                    </Form.Control.Feedback>
                  </Col>
                  <Col xl={4}>
                  <label className="form-label"  style={{color:'Black'}}>
                      Installed On
                    </label>
                    <Form.Control
                      type="date"
                      name="installedon"
                      value={dataArray1.installedon}
                      onChange={handleInput}
                      isInvalid={!!errors.installedon}
                    />

                    <Form.Control.Feedback type="invalid">
                      {errors.installedon}
                    </Form.Control.Feedback>
                  </Col>
                </Row>
                <Row className="p-1">

                  <Col xl={4}>
                  <label className="form-label"  style={{color:'Black'}}>NTN No</label>
                    <Form.Control
                      type="text"
                      name="ntnno"
                      onChange={handleInput}
                      value={dataArray1.ntnno}
                      isInvalid={!!errors.ntnno}
                      placeholder="NTN No"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.ntnno}
                    </Form.Control.Feedback>
                  </Col>

                  <Col xl={4}>
                  <label className="form-label"  style={{color:'Black'}}>Project</label>
                    <Form.Control
                      type="text"
                      placeholder="Project"
                      name="project"
                      onChange={handleInput}
                      value={dataArray1.project}
                      isInvalid={!!errors.project}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.project}
                    </Form.Control.Feedback>
                  </Col>

                  <Col xl={4}>
                  <label className="form-label"  style={{color:'Black'}}>
                      Sub Project
                    </label>
                    <Form.Control
                      type="text"
                      name="subproject"
                      onChange={handleInput}
                      value={dataArray1.subproject}
                      isInvalid={!!errors.subproject}
                      placeholder="Sub Project"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.subproject}
                    </Form.Control.Feedback>
                  </Col>

                  <Col xl={4}>
                  <label className="form-label"  style={{color:'Black'}}>Tarrif</label>

                    <Form.Control
                      type="text"
                      name="Tarrif Id"
                      onChange={handleInput}
                      value={dataArray1.tariffid}
                      isInvalid={!!errors.tariffid}
                      placeholder="Sub Project"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.tariffid}
                    </Form.Control.Feedback>

                    <Form.Control.Feedback type="invalid">
                      {errors.tarrifid}
                    </Form.Control.Feedback>
                  </Col>
                  
                  <Col xl={4}>
                  <label className="form-label"  style={{color:'Black'}}>Bank No</label>

                    <Form.Control
                      type="text"
                      name="bankno"
                      onChange={handleInput}
                      value={dataArray1.bankno}
                      isInvalid={!!errors.bankno}
                      placeholder="Bank No"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.bankno}
                    </Form.Control.Feedback>

                    <Form.Control.Feedback type="invalid">
                      {errors.bankno}
                    </Form.Control.Feedback>
                  </Col>
                </Row>
                
              </Form.Group>
            </Form>
          </Tab.Pane>
    
        </Tab.Content>
      </Tab.Container>
    </div>
  );
};

export default Addcustomer;