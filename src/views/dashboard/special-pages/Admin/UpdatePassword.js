import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";

const defaultTheme = createTheme();

export default function SignIn() {
  // const { setJWT } = useContext(JWTContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = formData;

    if (email === "") {
      notification.error({
        message: "Please enter Email",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "40px",
          width: "270px",
        },
      });
      return;
    }
    if (password === "") {
      notification.error({
        message: "Please enter Password",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "40px",
          width: "270px",
        },
      });
      return;
    }

    try {
      console.log(formData);
      const response = await axios.put(
        "https://ebill.bsite.net/api/User/update",
        null, // Set the data parameter to null
        {
          params: {
            email: formData.email,
            newPassword: formData.password,
          },
        }
      );
      notification.success({
        message: "password Updated Successfully!",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "40px",
          width: "320px",
        },
      });
      navigate("/viewuser", { replace: true });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        notification.error({
          message: "Email not found",
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "40px",
            width: "290px",
          },
        });
      } else {
        console.error("Error occurred during login:", error);
      }
    }
  };

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    console.log(formData);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Update Password
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
              // id="UserName"
              label="Email Address"
              name="email"
              // autoComplete="UserName"
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
              // id="password"
              // autoComplete="current-password"
              value={formData.password}
              onChange={handleInputChange}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Update Pass
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
