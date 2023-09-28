import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import axios from "axios";
import dataArray from "./Util";
import Cookies from "js-cookie";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { notification } from "antd";



const defaultTheme = createTheme();

export default function Updateuser() {
  const [dataArray1, setDataArray1] = useState({
    electricityrights: "",
    maintenancerights:"",
  });

  const [selectedOptions, setSelectedOptions] = useState([]);
  const iselectricityadmin = Cookies.get("electricityrights") || "";
  const ismaintenanceadmin = Cookies.get("maintenancerights") || "";
  const [formData, setFormData] = useState({
    user_id: 0,
    email: "",
    password: "",
    userrights: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDataArray1((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    if (checked) {
      setSelectedOptions((prevOptions) => [...prevOptions, name]);
    } else {
      setSelectedOptions((prevOptions) =>
        prevOptions.filter((option) => option !== name)
      );
    }
  };

  const handleCheckboxConcatenation = () => {
    const concatenatedOptions = selectedOptions.join(", ");
    setFormData((prevState) => ({
      ...prevState,
      userrights: concatenatedOptions,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(dataArray1);
      const response = await axios.put(
        "https://btkbilling.bsite.net/api/User/updateuserrights",
        dataArray1
      );

      notification.success({
        message: "Update Successful",
        description: "You have successfully Update User Rights.",
      });
    } catch (error) {
      console.error("Error occurred during login:", error);
    }
  };

  useEffect(() => {
    setDataArray1(dataArray["User"]);
    console.log(dataArray1)
  }, dataArray1);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" >
       
        <Box
          sx={{
            marginTop: 14,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Update Rights
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
            style={{width:'50%'}}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              name="email"
              onChange={handleInputChange}
              autoFocus
              value={dataArray1.email}
              InputProps={{
                readOnly: true, // Make the input read-only
              }}
            />

            {iselectricityadmin.includes("admin") ||
            iselectricityadmin.includes("electricitymanager") ? (
              <>
                <InputLabel>Electricity Billing System</InputLabel>

                <FormControl margin="normal" required fullWidth>
                  <InputLabel>User Rights</InputLabel>
                  <Select
                    label=" User Rights"
                    name="electricityrights"
                    value={dataArray1.electricityrights}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="electricitynoaccess">No Access</MenuItem>
                    <MenuItem value="electricityreader">Reader</MenuItem>
                    <MenuItem value="electricityeditor">Editor</MenuItem>
                    <MenuItem value="electricitymanager">Manager</MenuItem>
                    <MenuItem value="electricityadmin">Admin</MenuItem>
                  </Select>
                </FormControl>
              </>
            ) : (
              <div></div>
            )}

            {ismaintenanceadmin.includes("admin") ||
            ismaintenanceadmin.includes("maintenancemanager") ? (
              <>
                <InputLabel>Maintenance Billing System</InputLabel>

                <FormControl margin="normal" required fullWidth>
                  <InputLabel>User Rights</InputLabel>
                  <Select
                    label=" User Rights"
                    name="maintenancerights"
                    value={dataArray1.maintenancerights}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="maintenancenoaccess">No Access</MenuItem>
                    <MenuItem value="maintenancereader">Reader</MenuItem>
                    <MenuItem value="maintenanceeditor">Editor</MenuItem>
                    <MenuItem value="maintenancemanager">Manager</MenuItem>
                    <MenuItem value="maintenanceadmin">Admin</MenuItem>
                  </Select>
                </FormControl>
              </>
            ) : (
              <div></div>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {
                handleSubmit();
                handleCheckboxConcatenation();
              }}
            >
              Update Rights
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}