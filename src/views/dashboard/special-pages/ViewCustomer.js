import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form } from 'react-bootstrap';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import dataArray from './Util';
import Cookies from "js-cookie";

function ViewCustomer() {
 
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    customerno: '',
    btnostatus: '',
    btnomaintenance: '',
    customername: '',
    cnicno: '',
  });
 


useEffect(() => {
  // Make a GET request without any parameters
  axios
    .get('https://btkbilling.bsite.net/api/CustomerInformations/GetAllInfo')
    .then((response) => {
      setData(response.data);
      console.log("ViewTestCustomerAfterGet: ", data);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}, []);

  const handleCheckboxChange = (customerno) => {
    if (selectedRows.includes(customerno)) {
      setSelectedRows(selectedRows.filter((selectedCustomerno) => selectedCustomerno !== customerno));
    } else {
      setSelectedRows([...selectedRows, customerno]);
    }
  };
  
  const toggleSelectAll = () => {
    if (selectedRows.length === filteredData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredData.map((row) => row.customerno));
    }
  };

  const handleRowClick = (params) => {
    console.log('clicked');
    console.log('Params: ', params);
    const rowdata = params;
    dataArray['Customer'] = rowdata;
    navigate('/dashboard/updatecustomer', { replace: true });
    
  };

  const handleSubmit = () => {
    axios
      .post('https://btkbilling.bsite.net/api/CreateBills/CreateBill', selectedRows)
      .then((response) => {
        console.log('Data sent successfully:', response);

        if (response.data.includes('Total Bills Created: 0')) {
          notification.warning({
            message: 'No Data Entered',
            description:
              "No bills were created. It's possible that bills have already been created.",
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '40px',
              width: '220px',
            },
          });
        } else {
          notification.success({
            message: 'Success',
            description: response.data,
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '40px',
              width: '220px',
            },
          });
        }
      })
      .catch((error) => {
        console.error('Error sending data:', error);
      });
  };

    // Filtering logic
    const filteredData = data
    ? data.filter((row) => {
        const project = (row.project || '').toLowerCase();
        const subproject = (row.subproject || '').toLowerCase();
        const category = (row.category|| '').toLowerCase();
        const sector = (row.sector || '').toLowerCase();
        const block = (row.block || '').toLowerCase();
        const btno = (row.btno || '').toLowerCase(); // Add project filter

        return (
          (!filters.project || project.includes(filters.project.toLowerCase())) &&
          (!filters.subproject || subproject.includes(filters.subproject.toLowerCase())) &&
          (!filters.category || category.includes(filters.category.toLowerCase())) &&
          (!filters.sector || sector.includes(filters.sector.toLowerCase())) &&
          (!filters.block || block.includes(filters.block.toLowerCase())) &&
          (!filters.btno || btno.includes(filters.btno.toLowerCase())) // Apply project filter
        );
      })
    : [];

  return (
    <>
      <div style={{ width: '90%', marginTop: '40px', marginLeft: '10px' }}>
        <br />
        <h2 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Customer Details
          <Button onClick={handleSubmit} disabled={selectedRows.length === 0}>
            Create Bill
          </Button>
        </h2>
        <p>
            <b>Total Rows: {filteredData.length}</b>
          </p>
        <Form>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>
                <input
                  type="checkbox"
                  onChange={toggleSelectAll}
                  checked={selectedRows.length === filteredData.length}
                />
                </th>
               
                <th>
                  <div className="filter-header">
                    <div>Sub Project</div>
                    <input
                      type="text"
                      placeholder="Filter"
                      value={filters.subproject}
                      onChange={(e) => setFilters({ ...filters, subproject: e.target.value })}
                    />
                  </div>
                </th>
                <th>
                  <div className="filter-header">
                    <div>Category</div>
                    <input
                      type="text"
                      placeholder="Filter"
                      value={filters.category}
                      onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    />
                  </div>
                </th>
                <th>
                  <div className="filter-header">
                    <div>Sector</div>
                    <input
                      type="text"
                      placeholder="Filter"
                      value={filters.sector}
                      onChange={(e) => setFilters({ ...filters, sector: e.target.value })}
                    />
                  </div>
                </th>
                <th>
                  <div className="filter-header">
                    <div>Block</div>
                    <input
                      type="text"
                      placeholder="Filter"
                      value={filters.block}
                      onChange={(e) => setFilters({ ...filters, block: e.target.value })}
                    />
                  </div>
                </th>
                <th>
                  <div className="filter-header">
                    <div>Reg No</div>
                    <input
                      type="text"
                      placeholder="Filter"
                      value={filters.btno}
                      onChange={(e) => setFilters({ ...filters, btno: e.target.value })}
                    />
                  </div>
                </th>
                <th>
                  <div className="filter-header">
                    <div>Customer No</div>
                    <input
                      type="text"
                      placeholder="Filter"
                      value={filters.customerno}
                      onChange={(e) => setFilters({ ...filters, customerno: e.target.value })}
                    />
                  </div>
                </th>
               
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row) => (
                <tr key={row.customerno} onDoubleClick={() => handleRowClick(row)}>
                  <td>
                    <input
                      type="checkbox"
                      onChange={() => handleCheckboxChange(row.customerno)}
                      checked={selectedRows.includes(row.customerno)}
                    />
                  </td>
                 
                  <td>{row.subproject}</td>
                  <td>{row.category}</td>
                  <td>{row.sector}</td>
                  <td>{row.block}</td>
                  <td>{row.btno}</td> {/* Display the project field here */}
                  <td>{row.customerno}</td>
                 
                </tr>
              ))}
            </tbody>
          </Table>
          <p>
            <b>Total Rows: {filteredData.length}</b>
          </p>
        </Form>
      </div>
    </>
  );
}

export default ViewCustomer;