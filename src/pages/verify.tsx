import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Verify() {
  const { state } = useLocation();
  const loginName = state.loginName;
  const password = state.password;
  const country = state.country;
  const nav = useNavigate();

  const [captcha, setCaptcha] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [okMsg, setOkMsg] = useState("");

  useEffect(() => {
    axios
      .post(`/api/user/sendEmailCode`, { email: loginName })
      .then((res) => {
        if (res.status == 200) {
          if (res.data.code == 200) {
            setSuccess(true);
            setOkMsg("Sending success to " + loginName);
          } else {
            setErrorMsg(res.data.msg);
            setError(true);
          }
        } else {
          setErrorMsg("Network error");
          setError(true);
          nav("/login");
        }
        console.log(res);
        console.log(res.data);
      })
      .catch(() => {
        setErrorMsg("Network error");
        setError(true);
        nav("/login");
      });
  }, []);

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
    axios
      .post(`/api/user/register`, {
        loginName: loginName,
        password: password,
        country: country,
        captcha: captcha,
      })
      .then((res) => {
        if (res.status == 200) {
          if (res.data.code == 200) {
            setSuccess(true);
            setOkMsg("Register success");
            setTimeout(function () {
              nav("/login");
            }, 3000);
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
          Verify your email
        </Typography>
        <TextField
          fullWidth
          id="username"
          variant="outlined"
          label="Code"
          sx={{
            marginBottom: "20px",
          }}
          value={captcha}
          onChange={(e) => setCaptcha(e.target.value)}
        />
        <Button
          sx={{ width: "100%", mt: "20px", mb: "40px" }}
          size="large"
          variant="contained"
          onClick={onClick}
        >
          Submit
        </Button>
        <Typography gutterBottom>
          Code not received? <Link to="/register">Try another email</Link>
        </Typography>
      </Box>
    </>
  );
}
