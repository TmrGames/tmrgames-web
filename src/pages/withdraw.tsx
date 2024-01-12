import { useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  TextField,
  Snackbar,
  Alert,
  Grid,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Back from "@mui/icons-material/ArrowBackIos";

export default function Withdraw() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const loginName = state.loginName;
  const crypto = state.crypto;
  const chain = state.chain;
  const wallet = state.wallet;

  const [success, setSuccess] = useState(false);
  const [amount, setAmount] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [okMsg, setOkMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEnable, setIsEnable] = useState(false);
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

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .post(
        `/api/user/getWithdraw`,
        { crypto: crypto },
        { headers: { Authorization: token } }
      )
      .then((res) => {
        if (res.status == 200) {
          if (res.data.code == 200) {
            console.log("data", res.data.data);
            if (res.data.data !== null) {
              setAmount(res.data.data.amount);
            } else {
              setIsEnable(true);
            }
          } else {
            setIsEnable(true);
          }
        }
      });
  }, []);

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
          Withdraw
        </Typography>
        {!isEnable ? (
          <>
            <Typography
              variant="body1"
              color="white"
              align="left"
              marginTop="20px"
              marginLeft={"20px"}
            >
              Please wait...
            </Typography>
            <Typography
              variant="body1"
              color="white"
              align="left"
              marginTop="20px"
              marginLeft={"20px"}
            >
              Your withdrawal {amount} {crypto} is being processed
            </Typography>
          </>
        ) : null}
        {isEnable ? (
          <>
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
              Token: {crypto} on {chain} chain
            </Typography>
            <Typography
              variant="body1"
              color="white"
              align="left"
              marginLeft={"20px"}
            >
              From: {wallet.slice(0, 30)}
            </Typography>
            <Typography
              variant="body1"
              color="white"
              align="left"
              marginLeft={"20px"}
            >
              {wallet.slice(30)}
            </Typography>
            <Grid container spacing={0} marginTop={"20px"}>
              <Grid item xs={6}>
                <Typography
                  variant="body1"
                  color="primary"
                  align="left"
                  marginLeft={"20px"}
                >
                  To Address
                </Typography>
              </Grid>
              <Grid item xs={6}></Grid>
            </Grid>
            <TextField
              fullWidth
              id="toAddress"
              type="hex"
              label=""
              value={toAddress}
              onChange={(e) => setToAddress(e.target.value)}
            ></TextField>
            <Grid container spacing={0} marginTop={"20px"}>
              <Grid item xs={6}>
                <Typography
                  variant="body1"
                  color="primary"
                  align="left"
                  marginLeft={"20px"}
                >
                  Amount
                </Typography>
              </Grid>
              <Grid item xs={6}></Grid>
            </Grid>
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
            ></TextField>
            <Button
              sx={{ width: "100%", mt: "20px", mb: "40px" }}
              size="large"
              disabled={loading}
              variant="contained"
              onClick={() => {
                const token = localStorage.getItem("token");
                setLoading(true);
                axios
                  .post(
                    `/api/user/withdraw`,
                    {
                      crypto: crypto,
                      amount: amount,
                      fromAddress: wallet,
                      toAddress: toAddress,
                    },
                    { headers: { Authorization: token } }
                  )
                  .then((res) => {
                    if (res.status == 200) {
                      if (res.data.code == 200) {
                        setOkMsg("Withdraw success");
                        setSuccess(true);
                        setTimeout(function () {
                          navigate("/wallet");
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
                  });
                setLoading(false);
              }}
            >
              Withdraw
            </Button>
          </>
        ) : null}
      </Box>
      <p className="footer"></p>
    </>
  );
}
