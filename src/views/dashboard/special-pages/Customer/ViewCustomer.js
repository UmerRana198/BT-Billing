// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Table, Button, Form } from 'react-bootstrap';
// import { notification } from 'antd';
// import { useNavigate } from 'react-router-dom';
// // import { useDispatch } from 'react-redux';
// import dataArray from './Util';
// // import Cookies from "js-cookie";

// function ViewCustomer() {

//   const [data, setData] = useState([]);
//   const [selectedRows, setSelectedRows] = useState([]);
//   const navigate = useNavigate();
//   // const dispatch = useDispatch();
//   const [filters, setFilters] = useState({
//     customerno: '',
//     btnostatus: '',
//     btnomaintenance: '',
//     customername: '',
//     cnicno: '', 
//   });



// useEffect(() => {
//   // Make a GET request without any parameters
//   axios
//     .get('https://ebill.bsite.net/api/CustomerInformations/GetAllInfo')
//     .then((response) => {
//       setData(response.data);
//       console.log("ViewTestCustomerAfterGet: ", data);
//     })
//     .catch((error) => {
//       console.error('Error fetching data:', error);
//     });
// }, []);

//   const handleCheckboxChange = (customerno) => {
//     if (selectedRows.includes(customerno)) {
//       setSelectedRows(selectedRows.filter((selectedCustomerno) => selectedCustomerno !== customerno));
//     } else {
//       setSelectedRows([...selectedRows, customerno]);
//     }
//   };

//   const toggleSelectAll = () => {
//     if (selectedRows.length === filteredData.length) {
//       setSelectedRows([]);
//     } else {
//       setSelectedRows(filteredData.map((row) => row.customerno));
//     }
//   };

//   const handleRowClick = (params) => {
//     console.log('clicked');
//     console.log('Params: ', params);
//     const rowdata = params;
//     dataArray['Customer'] = rowdata;
//     navigate('/dashboard/updatecustomer', { replace: true });

//   };

//   const handleSubmit = () => {
//     axios
//       .post('https://ebill.bsite.net/api/CreateBills/CreateBill', selectedRows)
//       .then((response) => {
//         console.log('Data sent successfully:', response);

//         if (response.data.includes('Total Bills Created: 0')) {
//           notification.warning({
//             message: 'No Data Entered',
//             description:
//               "No bills were created. It's possible that bills have already been created.",
//             style: {
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               marginTop: '40px',
//               width: '220px',
//             },
//           });
//         } else {
//           notification.success({
//             message: 'Success',
//             description: response.data,
//             style: {
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               marginTop: '40px',
//               width: '220px', 
//             },
//           });
//         }
//       })
//       .catch((error) => {
//         console.error('Error sending data:', error);
//       });
//   };

//     // Filtering logic
//     const filteredData = data
//     ? data.filter((row) => {
//         const project = (row.project || '').toLowerCase();
//         const subproject = (row.subproject || '').toLowerCase();
//         const category = (row.category|| '').toLowerCase();
//         const sector = (row.sector || '').toLowerCase();
//         const block = (row.block || '').toLowerCase();
//         const btno = (row.btno || '').toLowerCase(); // Add project filter

//         return (
//           (!filters.project || project.includes(filters.project.toLowerCase())) &&
//           (!filters.subproject || subproject.includes(filters.subproject.toLowerCase())) &&
//           (!filters.category || category.includes(filters.category.toLowerCase())) &&
//           (!filters.sector || sector.includes(filters.sector.toLowerCase())) &&
//           (!filters.block || block.includes(filters.block.toLowerCase())) &&
//           (!filters.btno || btno.includes(filters.btno.toLowerCase())) // Apply project filter
//         );
//       })
//     : [];

//   return (
//     <>
//       <div style={{ width: '90%', marginTop: '40px', marginLeft: '10px' }}>
//         <br />
//         <h2 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           Customer Details
//           <Button onClick={handleSubmit} disabled={selectedRows.length === 0}>
//             Create Bill
//           </Button>
//         </h2>
//         <p>
//             <b>Total Rows: {filteredData.length}</b>
//           </p>
//         <Form>
//           <Table striped bordered hover>
//             <thead>
//               <tr>
//                 <th>
//                 <input
//                   type="checkbox"
//                   onChange={toggleSelectAll}
//                   checked={selectedRows.length === filteredData.length}
//                 />
//                 </th>

//                 <th>
//                   <div className="filter-header">
//                     <div>Sub Project</div>
//                     <input
//                       type="text"
//                       placeholder="Filter"  
//                       value={filters.subproject}
//                       onChange={(e) => setFilters({ ...filters, subproject: e.target.value })}
//                     />
//                   </div>
//                 </th>
//                 <th>
//                   <div className="filter-header">
//                     <div>Category</div>
//                     <input
//                       type="text"
//                       placeholder="Filter"
//                       value={filters.category}
//                       onChange={(e) => setFilters({ ...filters, category: e.target.value })}
//                     />
//                   </div>
//                 </th>
//                 <th>
//                   <div className="filter-header">
//                     <div>Sector</div>
//                     <input
//                       type="text"
//                       placeholder="Filter"
//                       value={filters.sector}
//                       onChange={(e) => setFilters({ ...filters, sector: e.target.value })}
//                     />
//                   </div>
//                 </th>
//                 <th>
//                   <div className="filter-header">
//                     <div>Block</div>
//                     <input
//                       type="text"
//                       placeholder="Filter"
//                       value={filters.block}
//                       onChange={(e) => setFilters({ ...filters, block: e.target.value })}
//                     />
//                   </div>
//                 </th>
//                 <th>
//                   <div className="filter-header">
//                     <div>Reg No</div>
//                     <input
//                       type="text"
//                       placeholder="Filter"
//                       value={filters.btno}
//                       onChange={(e) => setFilters({ ...filters, btno: e.target.value })}
//                     />
//                   </div>
//                 </th>
//                 <th>
//                   <div className="filter-header">
//                     <div>Customer No</div>
//                     <input
//                       type="text"
//                       placeholder="Filter"
//                       value={filters.customerno}
//                       onChange={(e) => setFilters({ ...filters, customerno: e.target.value })}
//                     />
//                   </div>
//                 </th>

//               </tr>
//             </thead>
//             <tbody>
//               {filteredData.map((row) => (
//                 <tr key={row.customerno} onDoubleClick={() => handleRowClick(row)}>
//                   <td>
//                     <input
//                       type="checkbox"
//                       onChange={() => handleCheckboxChange(row.customerno)}
//                       checked={selectedRows.includes(row.customerno)}
//                     />
//                   </td>

//                   <td>{row.subproject}</td>
//                   <td>{row.category}</td>
//                   <td>{row.sector}</td>
//                   <td>{row.block}</td>
//                   <td>{row.btno}</td> {/* Display the project field here */}
//                   <td>{row.customerno}</td>

//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//           <p>
//             <b>Total Rows: {filteredData.length}</b>
//           </p>
//         </Form>
//       </div>
//     </>
//   );
// }

// export default ViewCustomer;

















import React, { useState, useEffect, useRef } from 'react';
import {
    Column,
    DataGrid,
    FilterRow,
    HeaderFilter,
    GroupPanel,
    Scrolling,
    Editing,
    Grouping,
    Lookup,
    MasterDetail,
    Summary,
    RangeRule,
    RequiredRule,
    StringLengthRule,
    GroupItem,
    TotalItem,
    ValueFormat,
    Pager, Paging, Selection
}from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import { Form, SimpleItem, Label } from 'devextreme-react/form';
import axios from 'axios';







const Help_List = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const formRef = useRef(null);
    const [data, setData] = useState([]);
    // useEffect(() => {
    //     axios.get('https://jwtauth.bsite.net/api/PostProject/images')
    //         .then(response => {
    //             if (response.data && Array.isArray(response.data)) {
    //                 const formattedData = response.data.map((image, index) => ({
    //                     ...image,
    //                     key: index,
    //                     viewLink: image.imageUrl,
    //                 }));
    //                 setImages(formattedData);
    //             } else {
    //                 setImages([]);
    //             }
    //         })
    //         .catch(error => {
    //             console.error('Error fetching images:', error);
    //             setImages([]);
    //         });
    // }, []);









    // useEffect(() => {
    //     axios.get('https://ebill.bsite.net/api/CustomerInformations/GetAllInfo')
    //         .then(response => {
    //             if (response.data && Array.isArray(response.data)) {
    //                 const formattedData = response.data.map(item => {
    //                     return {
                           
    //                         ...item.customerinformation,
    //                         customerno:item.customerinformation.customerno,
    //                         tariffName: item.tariff.name,
    //                         tariffType: item.tariff.tarifftype,
    //                         subprojectName: item.subproject,
    //                         projectName: item.project
    //                     };
    //                 });
    //                 setImages(formattedData);
    //             } else {
    //                 setImages([]);
    //             }
    //         })
    //         .catch(error => {
    //             console.error('Error fetching data:', error);
    //             setImages([]);
    //         });
    // }, []);




    useEffect(() => {
        axios.get('https://ebill.bsite.net/api/CustomerInformations/GetAllInfo')
            .then(response => {
                if (response.data && Array.isArray(response.data)) {
                    const formattedData = response.data.map((item, index) => {
                        return {
                            key: item.customerinformation.customerno, // Adding a unique key
                            ...item.customerinformation,
                            tariffName: item.tariff?.name,
                            tariffType: item.tariff?.tarifftype,
                            subprojectName: item.subproject,
                            projectName: item.project
                        };
                    });
                    setImages(formattedData);
                } else {
                    setImages([]);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setImages([]);
            });
    }, []);
    
    const handleSelectionChange = (selectedRowKeys) => {
        setSelectedRows(selectedRowKeys.map((key) => {
            const selectedRow = images.find((image) => image.key === key);
            if (selectedRow) {
                return {
                    key: selectedRow.key,
                    customername: selectedRow.customername,
                    customerno: selectedRow.customerno,
                    cnicno: selectedRow.cnicno,
                    tariffName: selectedRow.tariffName,
                    tariffType: selectedRow.tariffType,
                    subprojectName: selectedRow.subprojectName,
                    projectName: selectedRow.projectName,
                };
            }
            
            return null; // Handle the case where the selected row is not found
        }).filter(row => row !== null)); // Filter out null entries

       
        setEditMode(false); 
    };
    
    const handlePrintSelected = () => {
        selectedRows.forEach((row) => {
            console.log('Customer Name:', row.customername);
            console.log('Customer Number:', row.customerno);
            console.log('CNIC No:', row.cnicno);
            console.log('Tariff Name:', row.tariffName);
            console.log('Tariff Type:', row.tariffType);
            console.log('Subproject:', row.subprojectName);
            console.log('Project:', row.projectName);
            console.log('-------------------------');
        });
    };
    

    // const handleEditSelected = () => {
    //     setEditMode(true);
    // };

    return (
        <React.Fragment>
            <div className="PageHeader_Container">
                <h2 className="Pageheading">My Portfolio</h2>
            </div>
            <div className="card" style={{ width: '90%' }}>
                <div className="card-body">
                    {editMode ? (
                        <Form
                            ref={formRef}
                            formData={selectedRows.length > 0 ? selectedRows[0] : {}}
                            labelLocation="top"
                            readOnly={false}
                        >
                            <SimpleItem dataField="title" editorOptions={{}}>
                                <Label text="Project Name" />
                            </SimpleItem>
                            <SimpleItem dataField="youtubeVideoUrl" editorOptions={{}}>
                                <Label text="Project URL" />
                            </SimpleItem>
                        </Form>
                    ) : (
                        <DataGrid
                            dataSource={images}
                            showBorders={true}
                            remoteOperations={true}
                          
                            keyExpr="customerno" 
                            selection={{ mode: 'multiple' }}
                            onSelectionChanged={(e) => handleSelectionChange(e.selectedRowKeys)}
                            // onRowDblClick={handleEditSelected}
                        >
                            <Selection mode="multiple" />
                            <Column dataField="customername" caption="Customer Name"  width={'200px'}/>
                            <Column dataField="customerno" caption="Customer Number" width={'200px'}/>
                            <Column dataField="cnicno" caption="CNIC No" width={'200px'} />
                            <Column dataField="tariffName" caption="Tariff Name" width={'100px'}/>
                            <Column dataField="tariffType" caption="Tariff Type" />
                            <Column dataField="subprojectName" caption="Subproject" width={'200px'}/>
                            <Column dataField="projectName" caption="Project" width={'200px'}/>
                            <Paging defaultPageSize={20} />
                            <Pager showPageSizeSelector={true} showInfo={true} />
                            <HeaderFilter visible={true} />
                            <GroupPanel visible={true} />
                            <Scrolling mode="virtual" />
                            <Grouping autoExpandAll={true} />
                        </DataGrid>

                    )}
                    {/* <button onClick={handlePrintSelected}>Print Selected Rows</button> */}
                    {!editMode && selectedRows.length > 0 && (
                        <div>
                            <h3>Selected Rows Details:</h3>
                            <ul>
                                {selectedRows.map((row, index) => (
                                    <li key={index}>
                                        <strong>Customer No:</strong> {row.customerno}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </React.Fragment>
    );
};

export default Help_List;
