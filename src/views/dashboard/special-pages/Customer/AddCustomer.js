import { Form, Button, Tab, Nav } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import Cookies from "js-cookie";
import { notification } from "antd";
import Sidebar from "../../../../components/partials/dashboard/SidebarStyle/sidebar";
import * as SettingSelector from "../../../../store/setting/selectors";


const Addcustomer = () => {
  const navigate = useNavigate();
  const [tarrifIds, setTarrifIds] = useState([]);
  const [metertype, setmetertypes] = useState([]);
  const [projects, setprojects] = useState([]);
  const [subProjects, setsubproject] = useState([]);
  const [formSubmissionCount, setFormSubmissionCount] = useState(0);
  const [btNo, setBtNo] = useState("");
  const userData = useSelector(state => state.user);
  // const Username = userData.email
  // const UserEmail = Cookies.get("userEmail", "usertype");





  async function Fetchconfigurations() {
    try {
      const response = await axios.get(
        "https://ebill.bsite.net/api/Configurations"
      );
      const data = response.data;
      const projects = data.filter((item) => item.configkey === "Project");
      const subProjects = data.filter((item) => item.configkey === "SubProject");
      const metertype = data
        .filter((item) => item.configkey === "Meter Type")
        .map((item) => item.configvalue); // Extracting the metertype values
      setprojects(projects);
      setsubproject(subProjects);
      setmetertypes(metertype);
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://ebill.bsite.net/api/Tariffs/GetDistinctTariffs"
        );

        if (Array.isArray(response.data)) {
          setTarrifIds(response.data);
        }
      } catch (error) {
      }
    };

    fetchData();
    Fetchconfigurations();
  }, []);

  const [Customer, setCustomer] = useState({

    CustomerNo:"",
    customerName: "",
    locationSeqNo: "",
    cnicNo: "",
    fatherName: "",
    mobileNo: "",
    telephoneNo: "",
    ntnNumber: "",
    btNo: "",
    tariffId: "",
    bankNo: "",
    btNoMaintenance: "",
    serviceStatus: "",
    comments: "",
    propertyId: ""

  });

  const [errors, setErrors] = useState({});
  const [submit, setSubmit] = useState("");
  const [errorexist, setErrorExist] = useState("");
  const [saveStatus, setSaveStatus] = useState("");
  const [dataArray1, setDataArray1] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);





  const validateForm = () => {
    const {
    customerName,
    cnicNo,
    mobileNo,
    ntnNumber,
    tariffId,
    comments,
    } = Customer;




    const newError = {};
    // if (!customerno || customerno === "") newError.customerno = "Customer No required";
    if (!customerName || customerName === "") newError.customerName = "required";
    else if (/\d/.test(customerName)) newError.customerName = "Customer Name must not contain digits";
    else if (!cnicNo || cnicNo === "") newError.cnicNo = " required";
    else if (!/^\d{13}$/.test(cnicNo)) newError.cnicNo = "must be a 13-digit number without dashes";

    else if (!mobileNo || mobileNo === "") newError.mobileNo = " required";
    else if (!/^\d{11}$/.test(mobileNo)) newError.mobileNo = " must be an 11-digit number without dashes";
    else if (!tariffId || tariffId === "") newError.tariffId = "Tarrif Id required";
    else if (ntnNumber && !/^\d{11}$/.test(ntnNumber)) {
      newError.ntnNumber = " must be an 11-digit number without dashes";
    } else if (!ntnNumber) {
      newError.ntnNumber = "required"; // Display this error when ntnno is empty
    }
    else if (!comments || comments === "") newError.comments = "Enter comments ";

    return newError;
  };












  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name in Customer) {
      setCustomer({ ...Customer, [name]: value });
      if (!!errors[name]) setErrors({ ...errors, [name]: null });
    }
  };





  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Customer);
    setSubmit("submitted");
    setErrorExist("errorexist");
    const formErrors = validateForm();
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
      console.log(Customer)
      axios
        .post("https://billingsys.bsite.net/api/CustomerInformation/AddCustomer", Customer)
        .then((res) => {
          setBtNo(Customer.btno);
          notification.success({
            message: "Record Saved Successfully!",
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "40px",
              width: "320px",
            },
          });
          navigate("/dashboard/viewCustomer", { replace: true });
          setSaveStatus("Saved");
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            notification.error({
              message: "Wrong Data Format. Please Enter Correct Data",
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "40px",
                width: "320px",
              },
            });
          
          } else if (error.response && error.response.status === 409) {
            // console.log(error.response.data);
            alert("BTNo  Already Exists");
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

   
    <div style={{ width: "80%", marginLeft: '10px' ,marginTop:'60px'}}>
      {/* <SubNav/> */}
      
      <Tab.Container defaultActiveKey="customerInfo">
        <Nav variant="tabs" className="mb-3">
          <Nav.Item>
            <Nav.Link eventKey="customerInfo">Customer Form</Nav.Link>
          </Nav.Item>
        
        </Nav>



        <Tab.Content>
          <Tab.Pane eventKey="customerInfo">
            <Form onSubmit={handleSubmit}>
              <Form.Group>

              <Col xl={12}>
                  <label className="form-label" style={{color:'Black'}}>
                      Customer No
                    </label>
                    <Form.Control
                      type="text"
                      placeholder="Customer No"
                      name="CustomerNo"
                      onChange={handleInput}
                      value={Customer.CustomerNo}
                      isInvalid={!!errors.CustomerNo}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.CustomerNo}
                    </Form.Control.Feedback>
                  </Col>
                <Row className="p-1">

                  <Col xl={4}>
                  <label className="form-label" style={{color:'Black'}}>
                      Customer Name
                    </label>
                    <Form.Control
                      type="text"
                      placeholder="Customer Name"
                      name="customerName"
                      onChange={handleInput}
                      value={Customer.customerName}
                      isInvalid={!!errors.customerName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.customerName}
                    </Form.Control.Feedback>
                  </Col>


                  <Col xl={4}>
                  <label className="form-label"  style={{color:'Black'}}>CNIC No</label>
                    <Form.Control
                      type="text"
                      name="cnicNo"
                      onChange={handleInput}
                      value={Customer.cnicNo}
                      isInvalid={!!errors.cnicNo}
                      placeholder="CNIC No"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.cnicNo}
                    </Form.Control.Feedback>
                  </Col>


                  <Col xl={4}>
                  <label className="form-label"  style={{color:'Black'}}>
                      Father Name
                    </label>
                    <Form.Control
                      type="text"
                      name="fatherName"
                      onChange={handleInput}
                      value={Customer.fatherName}
                      isInvalid={!!errors.fatherName}
                      placeholder="Father Name"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.fatherName}
                    </Form.Control.Feedback>
                  </Col>


                  <Col xl={4}>
                  <label className="form-label"  style={{color:'Black'}}>
                      Mobile No
                    </label>
                    <Form.Control
                      type="text"
                      placeholder="Mobile No"
                      name="mobileNo"
                      onChange={handleInput}
                      value={Customer.mobileNo}
                      isInvalid={!!errors.mobileNo}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.mobileNo}
                    </Form.Control.Feedback>
                  </Col>

                  <Col xl={4}>
                  <label className="form-label"  style={{color:'Black'}}>
                      Telephone No
                    </label>
                    <Form.Control
                      type="text"
                      name="telephoneNo"
                      onChange={handleInput}
                      value={Customer.telephoneNo}
                      isInvalid={!!errors.telephoneNo}
                      placeholder="Tel No"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.telephoneNo}
                    </Form.Control.Feedback>
                  </Col>

                  <Col xl={4}>
                  <label className="form-label"  style={{color:'Black'}}>NTN Number</label>
                    <Form.Control
                      name="ntnNumber"
                      value={Customer.ntnNumber}
                      onChange={handleInput}
                      isInvalid={!!errors.ntnNumber}
                      placeholder="NTN Number"
                    >
                      {/* <option value="">Select</option>
                      {projects.map((project) => (
                        <option
                          key={project.configid}
                          value={project.configid}
                        >
                          {project.configvalue}
                        </option>
                      ))} */}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.ntnNumber}
                    </Form.Control.Feedback>
                  </Col>
                </Row>

                <Row className="p-1">
                <Col xl={4}>
                  <label className="form-label"  style={{color:'Black'}}>BT No</label>
                    <Form.Control
                      name="btNo"
                      value={Customer.btNo}
                      onChange={handleInput}
                      isInvalid={!!errors.btNo}
                      placeholder="BT No"
                    >
                  
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.btNo}
                    </Form.Control.Feedback>
                  </Col>
                  
                  <Col xl={4}>
                  <label className="form-label"  style={{color:'Black'}}>
                  Tariff Id
                    </label>
                    <Form.Control
                      type="text"
                      name="tariffId"
                      value={Customer.tariffId}
                      onChange={handleInput}
                      isInvalid={!!errors.tariffId}
                      placeholder="Tariff Id"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.tariffId}
                    </Form.Control.Feedback>
                  </Col>
                  <Col xl={4}>
                  <label className="form-label"  style={{color:'Black'}}>Bank No</label>
                    <Form.Control
                      name="bankNo" // Updated name attribute to "tariffId"
                      value={Customer.bankNo}
                      onChange={handleInput}
                      isInvalid={!!errors.bankNo} // Updated to "tariffId"
                      placeholder="Bank No"
                    >
                      
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.bankNo} {/* Updated to "tariffId" */}
                    </Form.Control.Feedback>
                  </Col>
                </Row>


                <Row className="p-1">
                  
                  <Col xl={4} >
                  <label className="form-label"  style={{color:'Black'}}>
                      BTNO Maintenance
                    </label>
                    <Form.Select
                      name="btNoMaintenance"
                      value={Customer.btNoMaintenance}
                      onChange={handleInput}
                      isInvalid={!!errors.btNoMaintenance}
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.btNoMaintenance}
                    </Form.Control.Feedback>
                  </Col>

                  <Col xl={4}>
                  <label className="form-label"  style={{color:'Black'}}>
                  Service Status
                    </label>
                    <Form.Control
                      type="text"
                      placeholder="Service Status"
                      name="serviceStatus"
                      onChange={handleInput}
                      value={Customer.serviceStatus}
                      isInvalid={!!errors.serviceStatus}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.serviceStatus}
                    </Form.Control.Feedback>
                  </Col>
                  <Col xl={4}>
                  <label className="form-label"  style={{color:'Black'}} >
                  Property Id
                    </label>
                    <Form.Control
                      type="text"
                      placeholder="propertyId"
                      name="propertyId"
                      onChange={handleInput}
                      value={Customer.propertyId}
                      isInvalid={!!errors.propertyId}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.propertyId}
                    </Form.Control.Feedback>
                  </Col>
                </Row>


                <Row className="p-1">
                  <Col xl={9}>
                  <label className="form-label"  style={{color:'Black'}} >
                  Comments
                    </label>
                    <Form.Control
                      type="text"
                      placeholder="comments"
                      name="comments"
                      onChange={handleInput}
                      value={Customer.comments}
                      isInvalid={!!errors.comments}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.comments}
                    </Form.Control.Feedback>
                  </Col>


                  
                  <Col style={{ marginTop: "30PX" }}>
                    <Button
                      variant="primary"
                      type="submit"
                      onSubmit={handleSubmit}
                    >
                      Save Record
                    </Button>
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