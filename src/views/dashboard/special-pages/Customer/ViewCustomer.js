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
            return null; 
        }).filter(row => row !== null)); 

       
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
    

    
    return (
        <React.Fragment>
            
            <div className="card" style={{ width: '100%' ,marginTop:'80px'}}>
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
                            <Grouping autoExpandAll={false} />
                        </DataGrid>

                    )}
                   
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
