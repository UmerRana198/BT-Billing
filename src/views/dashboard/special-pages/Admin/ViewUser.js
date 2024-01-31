import dataArray from './Util'
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'; 
import Cookies from "js-cookie";


function ViewCustomer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const iselectricityadmin = Cookies.get("electricityrights") || "";
  const ismaintenanceadmin = Cookies.get("maintenancerights") || "";

  const [data, setData] = useState([]);

  useEffect(() => {

    console.log(iselectricityadmin)
    console.log(ismaintenanceadmin)
    if (iselectricityadmin !== '') {
      axios.get("https://ebill.bsite.net/api/User/GetUsersWithElectricityRights")
        .then((res) => {
          setData(res.data);
        })
        .catch((error) => {
          console.error("Error fetching electricityrights data:", error);
        });
    } else if (ismaintenanceadmin !== '') {
      axios.get("https://ebill.bsite.net/api/User/GetUsersWithMaintenanceRights")
        .then((res) => {
          setData(res.data);
        })
        .catch((error) => {
          console.error("Error fetching maintenance data:", error);
        });
    }
  }, [iselectricityadmin, ismaintenanceadmin]);



const handleRowClick = (params) => {
  dataArray['User'] = params.row
   navigate('/dashboard/updateuser', { replace: true });     
  };





  const columns = [
    {field :"email", headerName:"email", width:300  },
    {field :"electricityrights", headerName:"electricity rights", width:250},
    {field :"maintenancerights", headerName:"maintenance rights", width:250},
    
  ];




  const rows = data.map((row) => ({
    user_id: row.user_id,
    email:row.email,
    electricityrights: row.electricityrights,
    maintenancerights:row.maintenancerights,
  }))

  return (
    <div style={{ width: '100%', marginTop: '60px', marginLeft: '10px' }}>
      <h5>User Details</h5>
      <DataGrid
        style={{ height: 800 }}
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
         onRowDoubleClick={handleRowClick}
        getRowId={(row) => row.user_id}
      />
    </div>
  );
}

export default ViewCustomer;