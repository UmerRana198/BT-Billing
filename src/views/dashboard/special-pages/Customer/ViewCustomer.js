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
    axios.get('https://billingsys.bsite.net/api/CustomerInformation/GetAllCustomerData')
        .then(response => {
            if (response.data && Array.isArray(response.data)) {
                const formattedData = response.data.map((item, index) => {
                    return {
                        key: item.customerNo, 
                        customername: item.customerName, 
                        customerno: item.customerNo,
                        cnicno: item.cnicNo,
                        fatherName: item.fatherName,
                        mobileNo: item.mobileNo,
                        telephoneNo: item.telephoneNo,
                        ntnNumber: item.ntnNumber,
                        locationSeqNo: item.locationSeqNo,
                        btNo: item.btNo,
                        tariffId: item.tariffId,
                        bankNo: item.bankNo,
                        btNoMaintenance: item.btNoMaintenance,
                        serviceStatus: item.serviceStatus,
                        comments: item.comments,
                        propertyId: item.propertyId
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
                    tariffId: selectedRow.tariffId,
                    fatherName: selectedRow.fatherName,
                    locationSeqNo: selectedRow.locationSeqNo,
                    btNo: selectedRow.btNo,
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
            console.log('Tariff Id:', row.tariffId);
            console.log('Father Name:', row.fatherName);
            console.log('location SeqNo:', row.locationSeqNo);
            console.log('btNo:', row.btNo);
            console.log('-------------------------');
        });
    };
    

    
    return (
        <React.Fragment>
            
            <div className="card" style={{ width: '100%' ,marginTop:'80px'}}>
                <div className="card-body">
              
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
                            <Column dataField="tariffId" caption="Tariff Id" width={'100px'}/>
                            <Column dataField="fatherName" caption="father Name " />
                            <Column dataField="locationSeqNo" caption="locationSeqNo" width={'200px'}/>
                            
                            <Paging defaultPageSize={20} />
                            <Pager showPageSizeSelector={true} showInfo={true} />
                            <HeaderFilter visible={true} />
                            <GroupPanel visible={true} />
                            <Scrolling mode="virtual" />
                            <Grouping autoExpandAll={false} />
                        </DataGrid>

                    
                   
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
