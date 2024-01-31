// import React, { useEffect, useState } from 'react'
// import Card from 'react-bootstrap/Card';
// import Col from 'react-bootstrap/Col';
// import Row from 'react-bootstrap/Row';
// import {
//   Link, Navigate, useNavigate,
// } from "react-router-dom";
// import Container from 'react-bootstrap/Container';
// import people from './people.png'
// import Docs from './Docs.png'
// import admin from './admin.png'
// import config from './config.png'
// import tariff from './tariff.png'

// const Main = () => {
// const navigate = useNavigate();

// const cardInfo = [
//   {image:people,   modName:"Customer", title:"Customer",  modulepath:"addcustomer" },
//   {image:config, modName:"Config", title:"Config",modulepath:"Configuration"},
//   {image:Docs,  modName:"Bills", title:"Bill Details",  modulepath:"viewcreatedbills" },
//   {image:Docs, modName:"Readings", title:"Readings", modulepath:"Readings"},
//   {image:tariff, modName:"Tariff", title:"Tariff Information",modulepath:"Tariff"},
//   {image:admin, modName:"Admin", title:"Admin",modulepath:"viewuser"},

//  ]


// import Cookies from "js-cookie";

// const Main = () => {



// const navigate = useNavigate();
// const Email = Cookies.get("userEmail");
// const electricityrights = Cookies.get("electricityrights");
// const maintenancerights = Cookies.get("maintenancerights");
// const hasElectricityEditorRights =
//   electricityrights &&
//   (electricityrights.includes("electricityeditor") ||
//     electricityrights.includes("electricityadmin") ||
//     electricityrights.includes("electricitymanager") ||
//     electricityrights.includes("electricityreader"));

// const hasMaintenanceEditorRights =
//   maintenancerights &&
//   (maintenancerights.includes("maintenanceeditor") ||
//     maintenancerights.includes("maintenanceadmin") ||
//     maintenancerights.includes("maintenancemanager") ||
//     maintenancerights.includes("electricityreader"));
//  const cardInfo = [
// //   {image:people,   modName:"Customer", title:"Customer",  modulepath:"addcustomer" },
// //   {image:config, modName:"Config", title:"Config",modulepath:"Configuration"},
// //   {image:Docs,  modName:"Bills", title:"Bill Details",  modulepath:"viewcreatedbills" },
// //   {image:Docs, modName:"Readings", title:"Readings", modulepath:"Readings"},
// //   {image:tariff, modName:"Tariff", title:"Tariff Information",modulepath:"Tariff"},
// //   {image:admin, modName:"Admin", title:"Admin",modulepath:"viewuser"},

//  ]




// if (hasElectricityEditorRights) {
//   cardInfo.unshift({ image: people, modName: "Customer", title: "Customer", modulepath: "customer" });
// }

// if (hasElectricityEditorRights) {
//   cardInfo.unshift({ image: config, modName: "Config", title: "Config", modulepath: "configuration" });
// }

// if (hasElectricityEditorRights) {
//   cardInfo.unshift({ image: Docs, modName: "Bills", title: "Bill Details", modulepath: "Bills" });
// }


// if (hasElectricityEditorRights) {
//   cardInfo.unshift({ image: Docs, modName: "Readings", title: "Readings", modulepath: "Readings" });
// }


// if (hasElectricityEditorRights) {
//   cardInfo.unshift({ image: tariff, modName: "tariff", title: "Tariff", modulepath: "tariff" });
// }


// if (hasElectricityEditorRights) {
//   cardInfo.unshift({ image: admin, modName: "admin", title: "admin", modulepath: "viewuser" });
// }


//  const cardClicked = () => {
//   this.setState((prevState, { count }) => ({
//     count: prevState.count + 1
//   }));
// };

//  return (
// <Container fluid="true" style={{marginLeft:'30px',marginRight:'20px',marginTop:'50px'}}>
//    <Row style={{backgroundColor: '#f7f8fc'}}>
//       {cardInfo &&      
//       cardInfo.map((product,index) => {
//           const { id, title, price, category, description, image, modulepath, modName } =   product;
//           return (
//              <Col className="col-3 p-1" >
//              <Card key={id} className="productlist p-0" style={{alignItems:'center'}}>
//              <Card.Link href={modulepath}>  
//              <Card.Img variant="top" 
//                 style={{ height: '100px', width: '100px', padding:'20px' }} 
//                 src={image} 
//                 />
//                 </Card.Link>       
//                <Card.Body >              
//                <Link to={modulepath}  ><Card.Title >{title}</Card.Title></Link>
//                   <Card.Text>{description}</Card.Text>
//                   <Card.Text>{category}</Card.Text>
//                   <Card.Text>{price}</Card.Text>
                  
//                 </Card.Body>
//               </Card>
//             </Col>
//           );
//         })}
//     </Row>  
//     </Container> 
//   )
// }

// export default Main