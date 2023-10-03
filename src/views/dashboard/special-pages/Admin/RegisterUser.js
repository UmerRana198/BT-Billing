import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import Cookies from "js-cookie";
import { notification } from "antd";


const defaultTheme = createTheme();

export default function SignIn() {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const [formData, setFormData] = useState({
    user_id: 0,
    email: "",
    password: "",
    electricityrights: "",
    maintenancerights: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = formData;

    if (email === "") {
      // ... (error handling for email)
      return;
    }
    if (password === "") {
      // ... (error handling for password)
      return;
    }

    try {
      console.log("formdata", formData);
      const response = await axios.post(
        // "https://localhost:7285/api/User/signup",
       "https://btkbilling.bsite.net/api/User/signup",
        formData
      );

      notification.success({
        message: "Registration Successful",
        description: "You have successfully registered your account.",
      });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        notification.error({
          message: "Email Already Registered",
         
        });
      } else {
        console.error("Error occurred during login:", error);
      }
    }
  };

  const iselectricityadmin = Cookies.get("electricityrights") || "";
  const ismaintenanceadmin = Cookies.get("maintenancerights") || "";

  return (
   
      <Container component="main" maxWidth="xs">
        
        <Box
          sx={{
            marginTop: 18,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              name="email"
              onChange={handleInputChange}
              autoFocus
              value={formData.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
            />

            {iselectricityadmin.includes('admin') ||
            iselectricityadmin.includes('electricitymanager') ? (
              <>
                <InputLabel>Electricity Billing System</InputLabel>

                <FormControl margin="normal" required fullWidth>
                  <InputLabel>User Rights</InputLabel>
                  <Select
                    label=" User Rights"
                    name="electricityrights"
                    value={formData.electricityrights}
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

            {ismaintenanceadmin.includes('admin') ||
            ismaintenanceadmin.includes('maintenancemanager') ? (
              <>
                <InputLabel>Maintenance Billing System</InputLabel>

                <FormControl margin="normal" required fullWidth>
                  <InputLabel>User Rights</InputLabel>
                  <Select
                    label=" User Rights"
                    name="maintenancerights"
                    value={formData.maintenancerights}
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
            >
              Sign In
            </Button>
          </Box>
        </Box>



      </Container>
  
  );
}






