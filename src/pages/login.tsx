import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [loginName, setLoginName] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [okMsg, setOkMsg] = useState("");

  const nav = useNavigate();

  const handleParamEmptyClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setError(false);
  };

  const handleOKClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccess(false);
  };

  const onClick = () => {
    if (loginName.length == 0) {
      setErrorMsg("Email is empty");
      setError(true);
      return;
    }

    if (password.length == 0) {
      setErrorMsg("Password is empty");
      setError(true);
      return;
    }

    axios
      .post(`/api/user/login`, { loginName: loginName, password: password })
      .then((res) => {
        if (res.status == 200) {
          if (res.data.code == 200) {
            localStorage.setItem("token", res.data.data.token);
            localStorage.setItem("loginName", res.data.data.loginName);
            localStorage.setItem("country", res.data.data.country);
            setSuccess(true);
            setOkMsg("Login success");
            setTimeout(function () {
              nav("/wallet");
            }, 1000);
          } else {
            setErrorMsg(res.data.msg);
            setError(true);
          }
        } else {
          setErrorMsg("Network error");
          setError(true);
        }
        console.log(res);
        console.log(res.data);
      })
      .catch(() => {
        setErrorMsg("Network error");
        setError(true);
        nav("/login");
      });
  };
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={error}
        autoHideDuration={3000}
        onClose={handleParamEmptyClose}
      >
        <Alert
          onClose={handleParamEmptyClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMsg}
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={success}
        autoHideDuration={3000}
        onClose={handleOKClose}
      >
        <Alert
          onClose={handleOKClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {okMsg}
        </Alert>
      </Snackbar>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{ m: "20px", height: "60vh" }}
      >
        <Typography
          align="left"
          variant="h4"
          gutterBottom
          sx={{ mt: "10vh", mb: "40px" }}
        >
          Login
        </Typography>
        <TextField
          fullWidth
          id="username"
          variant="outlined"
          label="Email"
          value={loginName}
          onChange={(e) => setLoginName(e.target.value)}
          sx={{
            marginBottom: "20px",
          }}
        />

        <TextField
          fullWidth
          id="password"
          type="password"
          label="Password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            marginBottom: "20px",
          }}
        />

        <Button
          sx={{ width: "100%", mt: "20px", mb: "40px" }}
          size="large"
          variant="contained"
          onClick={onClick}
        >
          Login
        </Button>
        <Typography gutterBottom>
          Don't have an account? <Link to="/register">Sign up</Link>
        </Typography>
      </Box>
    </>
  );
}
