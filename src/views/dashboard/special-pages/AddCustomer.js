import { Form, Button, Tab, Nav } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useState, useEffect } from "react";
// import NavBar from './NavBar'
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import Cookies from "js-cookie"; // Import the js-cookie library
import { notification } from "antd";




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
        "https://btkbilling.bsite.net/api/Configurations"
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
          "https://btkbilling.bsite.net/api/Tariffs/GetDistinctTariffs"
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

    btnostatus: "",
    customername: "",
    locationseqno: "",
    cnicno: "",
    fathername: "",
    installedon: "",
    mobileno: "",
    telephoneno: "",
    ntnno: "",
    project: "",
    subproject: "",
    tariffid: "",
    createdby: "test",
    createdon: new Date,
    bankno: "",
    history: "-",
    isdeleted: ""

  });

  const [errors, setErrors] = useState({});
  const [submit, setSubmit] = useState("");
  const [errorexist, setErrorExist] = useState("");
  const [saveStatus, setSaveStatus] = useState("");
  const [dataArray1, setDataArray1] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);





  const validateForm = () => {
    const {

      btnostatus,
      customername,
      locationseqno,
      cnicno,
      fathername,
      installedon,
      mobileno,
      telephoneno,
      // ntnno,
      project,
      subproject,
      tariffid,
      bankno,
      ntnno
    } = Customer;

    const newError = {};
    // if (!customerno || customerno === "") newError.customerno = "Customer No required";
    if (!customername || customername === "") newError.customername = "required";
    else if (/\d/.test(customername)) newError.customername = "Customer Name must not contain digits";
    else if (!cnicno || cnicno === "") newError.cnicno = " required";
    else if (!/^\d{13}$/.test(cnicno)) newError.cnicno = "must be a 13-digit number without dashes";
    else if (!fathername || fathername === "") newError.fathername = " required";
    else if (/\d/.test(fathername)) newError.fathername = "must not contain digits";
    else if (!mobileno || mobileno === "") newError.mobileno = " required";
    else if (!/^\d{11}$/.test(mobileno)) newError.mobileno = " must be an 11-digit number without dashes";
    else if (!telephoneno || telephoneno === "") newError.telephoneno = "required";
    else if (!project || project === "") newError.project = " required";
    else if (!subproject || subproject === "") newError.subproject = " required";
    else if (!installedon || installedon === "") newError.installedon = "required";
    else if (!tariffid) {
      newError.tariffid = "required"; // Display this error when ntnno is empty
    }
    else if (!tariffid || tariffid === "") newError.tariffid = "Tarrif Id required";
    else if (ntnno && !/^\d{11}$/.test(ntnno)) {
      newError.ntnno = " must be an 11-digit number without dashes";
    } else if (!ntnno) {
      newError.ntnno = "required"; // Display this error when ntnno is empty
    }

    else if (!btnostatus || btnostatus === "") newError.btnostatus = "Select BTNO Status";

    else if (!locationseqno || locationseqno === "") newError.locationseqno = "required";

    else if (!/^\d{15}$/.test(locationseqno)) newError.locationseqno = "must be a 15-digit number";

    //  else  if (!locationseqno || locationseqno === "") newError.locationseqno = "required";
    else if (!bankno || !/^\d{3}$/.test(bankno)) newError.bankno = " must be a 3-digit number";
  
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
      axios
        .post("https://btkbilling.bsite.net/api/CustomerInformations", Customer)
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
      <Tab.Container defaultActiveKey="customerInfo">
        <Nav variant="tabs" className="mb-3">
          <Nav.Item>
            <Nav.Link eventKey="customerInfo">Customer Info</Nav.Link>
          </Nav.Item>
        </Nav>



        <Tab.Content>
          <Tab.Pane eventKey="customerInfo">
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Row className="p-1">

                  <Col xl={4}>
                  <label className="form-label">
                      Customer Name
                    </label>
                    <Form.Control
                      type="text"
                      placeholder="Customer Name"
                      name="customername"
                      onChange={handleInput}
                      value={Customer.customername}
                      isInvalid={!!errors.customername}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.customername}
                    </Form.Control.Feedback>
                  </Col>


                  <Col xl={4}>
                  <label className="form-label">CNIC No</label>
                    <Form.Control
                      type="text"
                      name="cnicno"
                      onChange={handleInput}
                      value={Customer.cnicno}
                      isInvalid={!!errors.cnicno}
                      placeholder="CNIC No"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.cnicno}
                    </Form.Control.Feedback>
                  </Col>


                  <Col xl={4}>
                  <label className="form-label">
                      Father Name
                    </label>
                    <Form.Control
                      type="text"
                      name="fathername"
                      onChange={handleInput}
                      value={Customer.fathername}
                      isInvalid={!!errors.fathername}
                      placeholder="Father Name"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.fathername}
                    </Form.Control.Feedback>
                  </Col>


                  <Col xl={4}>
                  <label className="form-label">
                      Mobile No
                    </label>
                    <Form.Control
                      type="text"
                      placeholder="Mobile No"
                      name="mobileno"
                      onChange={handleInput}
                      value={Customer.mobileno}
                      isInvalid={!!errors.mobileno}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.mobileno}
                    </Form.Control.Feedback>
                  </Col>

                  <Col xl={4}>
                  <label className="form-label">
                      Telephone No
                    </label>
                    <Form.Control
                      type="text"
                      name="telephoneno"
                      onChange={handleInput}
                      value={Customer.telephoneno}
                      isInvalid={!!errors.telephoneno}
                      placeholder="Tel No"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.telephoneno}
                    </Form.Control.Feedback>
                  </Col>

                  <Col xl={4}>
                  <label className="form-label">Projects</label>
                    <Form.Select
                      name="project"
                      value={Customer.project}
                      onChange={handleInput}
                      isInvalid={!!errors.project}
                    >
                      <option value="">Select</option>
                      {projects.map((project) => (
                        <option
                          key={project.configid}
                          value={project.configid}
                        >
                          {project.configvalue}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.project}
                    </Form.Control.Feedback>
                  </Col>
                </Row>

                <Row className="p-1">
                <Col xl={4}>
                  <label className="form-label">Sub Project</label>
                    <Form.Select
                      name="subproject"
                      value={Customer.subproject}
                      onChange={handleInput}
                      isInvalid={!!errors.subproject}
                    >
                      <option value="">Select</option>
                      {subProjects.map(subProject => (
                        <option key={subProject.configid} value={subProject.configid}>
                          {subProject.configvalue}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.subproject}
                    </Form.Control.Feedback>
                  </Col>
                  
                  <Col xl={4}>
                  <label className="form-label">
                      Installed On
                    </label>
                    <Form.Control
                      type="date"
                      name="installedon"
                      value={Customer.installedon}
                      onChange={handleInput}
                      isInvalid={!!errors.installedon}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.installedon}
                    </Form.Control.Feedback>
                  </Col>
                  <Col xl={4}>
                  <label className="form-label">Tariff</label>
                    <Form.Select
                      name="tariffid" // Updated name attribute to "tariffId"
                      value={Customer.tariffid}
                      onChange={handleInput}
                      isInvalid={!!errors.tariffid} // Updated to "tariffId"
                    >
                      <option value="">Select</option>
                      {tarrifIds.map((tariff) => (
                        <option key={tariff.tariffid} value={tariff.tariffid}>
                          {tariff.name}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.tariffid} {/* Updated to "tariffId" */}
                    </Form.Control.Feedback>
                  </Col>
                </Row>


                <Row className="p-1">
                  <Col xl={4}>
                  <label className="form-label">NTN No</label>
                    <Form.Control
                      type="text"
                      name="ntnno"
                      onChange={handleInput}
                      value={Customer.ntnno}
                      placeholder="NTN No"
                      isInvalid={!!errors.ntnno}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.ntnno}
                    </Form.Control.Feedback>
                  </Col>


                  <Col xl={4} >
                  <label className="form-label">
                      BTNO Status
                    </label>
                    <Form.Select
                      name="btnostatus"
                      value={Customer.btnostatus}
                      onChange={handleInput}
                      isInvalid={!!errors.btnostatus}
                    >
                      <option value="">Select</option>
                      <option value="different">Diffrent</option>
                      <option value="same">Same</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.btnostatus}
                    </Form.Control.Feedback>
                  </Col>

                  <Col xl={4}>
                  <label className="form-label">
                      Location SeqNo
                    </label>
                    <Form.Control
                      type="text"
                      placeholder="Location SeqNo"
                      name="locationseqno"
                      onChange={handleInput}
                      value={Customer.locationseqno}
                      isInvalid={!!errors.locationseqno}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.locationseqno}
                    </Form.Control.Feedback>
                  </Col>
                </Row>


                <Row className="p-1">
                  <Col xl={4}>
                  <label className="form-label">
                      Bank No
                    </label>
                    <Form.Control
                      type="text"
                      placeholder="Bank No"
                      name="bankno"
                      onChange={handleInput}
                      value={Customer.bankno}
                      isInvalid={!!errors.bankno}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.bankno}
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