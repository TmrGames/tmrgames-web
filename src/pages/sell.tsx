import { useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Back from "@mui/icons-material/ArrowBackIos";

export default function Sell() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const loginName = state.loginName;
  const app = state.app;
  const crypto = state.crypto;

  const [success, setSuccess] = useState(false);
  const [amount, setAmount] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [okMsg, setOkMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOKClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccess(false);
  };

  const handleParamEmptyClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setError(false);
  };

  return (
    <>
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
      <Box component="form" noValidate autoComplete="off" sx={{ m: "10px" }}>
        <Box sx={{ textAlign: "left", marginTop: "20px" }}>
          <Button
            variant="outlined"
            size="small"
            sx={{ width: "80px" }}
            startIcon={<Back />}
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </Button>
        </Box>

        <Typography color="primary" variant="h4" marginTop={"40px"}>
          Sell Game Asset
        </Typography>
        <Typography
          variant="body1"
          color="primary"
          align="left"
          marginTop={"20px"}
          marginLeft={"20px"}
        >
          CONFIRM DETAILS BELOW
        </Typography>
        <Typography
          variant="body1"
          color="white"
          align="left"
          marginTop="20px"
          marginLeft={"20px"}
        >
          User: {loginName}
        </Typography>
        <Typography
          variant="body1"
          color="white"
          align="left"
          marginLeft={"20px"}
        >
          App: {app}
        </Typography>
        <Typography
          variant="body1"
          color="primary"
          align="left"
          marginTop={"20px"}
          marginLeft={"20px"}
        >
          USDT Amount
        </Typography>

        <TextField
          fullWidth
          id="amount"
          type="number"
          label=""
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          sx={{
            marginBottom: "20px",
          }}
        />

        <Button
          sx={{ width: "100%", mt: "20px", mb: "40px" }}
          size="large"
          disabled={loading}
          variant="contained"
          onClick={() => {
            const token = localStorage.getItem("token");
            if (app === "OceanX") {
              setErrorMsg("Not supported");
              setError(true);
            }
            if (app === "TMR Bet") {
              setLoading(true);
              axios
                .post(
                  `/api/app/getTmrBetToken`,
                  {},
                  { headers: { Authorization: token } }
                )
                .then((res) => {
                  if (res.status == 200) {
                    if (res.data.code == 200) {
                      console.log(res.data.data);
                      axios
                        .post(
                          `/api/app/withdrawTmrBet`,
                          {
                            token: res.data.data,
                            crypto: crypto,
                            usdtValue: amount,
                          },
                          { headers: { Authorization: token } }
                        )
                        .then((res) => {
                          if (res.status == 200) {
                            setLoading(false);
                            if (res.data.code == 200) {
                              console.log("usdt:" + JSON.parse(res.data.data));
                              setOkMsg("Sell success");
                              setSuccess(true);
                              setTimeout(function () {
                                navigate("/wallet");
                              }, 1000);
                            } else if (res.data.code == 500) {
                              setErrorMsg("Insufficient to withdraw");
                              setError(true);
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
                        });
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
                });
            }
          }}
        >
          Sell
        </Button>
      </Box>
    </>
  );
}
