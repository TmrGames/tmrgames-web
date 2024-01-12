import { useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  TextField,
  Snackbar,
  Alert,
  Grid,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import Back from "@mui/icons-material/ArrowBackIos";

export default function Buy() {
  const { state } = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  let loginName: string | null;
  let app: string | null;
  let crypto: string | null;
  let externalAmount: string | null;
  let timestamp: string | null;
  let signature: string | null;
  let isExternal = false;

  const [success, setSuccess] = useState(false);
  const [amount, setAmount] = useState("");
  const [oxAmount, setOxAmount] = useState("2");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [okMsg, setOkMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState("");

  if (searchParams.size > 0) {
    loginName = searchParams.get("loginName");
    app = searchParams.get("app");
    crypto = searchParams.get("crypto");
    externalAmount = searchParams.get("amount");
    timestamp = searchParams.get("timestamp");
    signature = searchParams.get("signature");
    isExternal = true;
  } else {
    loginName = state.loginName;
    app = state.app;
    crypto = state.crypto;
  }

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
    if (externalAmount) {
      setOxAmount(externalAmount);
    }
    const token = localStorage.getItem("token");
    axios
      .get(`/api/app/getTmrBetRate`, { headers: { Authorization: token } })
      .then((res) => {
        if (res.status == 200) {
          if (res.data.code == 200) {
            setPrice(parseFloat(res.data.data).toFixed(2));
          }
        }
      });
  });

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
          Buy Game Asset
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
        {app === "OceanX" ? (
          <>
            <Box
              sx={{
                width: "336px",
                height: "126px",
                margin: "auto",
                marginTop: "20px",
                backgroundSize: "cover",
                backgroundImage: "url('/images/package.png')",
              }}
            ></Box>
            <RadioGroup
              row
              aria-label="gender"
              defaultValue={2}
              name="row-radio-buttons-group"
              value={oxAmount}
              onChange={(e) => setOxAmount(e.target.value)}
              sx={{
                margin: "auto",
                width: "330px",
              }}
            >
              <FormControlLabel
                value="2"
                disabled={isExternal}
                control={<Radio />}
                label="$2"
                sx={{
                  margin: "auto",
                  width: "82px",
                }}
              />
              <FormControlLabel
                value="10"
                disabled={isExternal}
                control={<Radio />}
                label="$10"
                sx={{
                  margin: "auto",
                  width: "82px",
                }}
              />
              <FormControlLabel
                value="20"
                disabled={isExternal}
                control={<Radio />}
                label="$20"
                sx={{
                  margin: "auto",
                  width: "82px",
                }}
              />
              <FormControlLabel
                value="100"
                disabled={isExternal}
                control={<Radio />}
                label="$100"
                sx={{
                  margin: "auto",
                  width: "82px",
                }}
              />
            </RadioGroup>
          </>
        ) : null}
        {app === "TMR Bet" ? (
          <>
            <Grid container spacing={0} marginTop={"20px"}>
              <Grid item xs={6}>
                <Typography
                  variant="body1"
                  color="primary"
                  align="left"
                  marginLeft={"20px"}
                >
                  USDT Amount
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="white" align="right">
                  1 USDT = {price} Credits
                </Typography>
              </Grid>
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
          </>
        ) : null}

        <Button
          sx={{ width: "100%", mt: "20px", mb: "40px" }}
          size="large"
          disabled={loading}
          variant="contained"
          onClick={() => {
            const token = localStorage.getItem("token");
            if (app === "OceanX") {
              setLoading(true);
              if (isExternal) {
                axios
                  .post(
                    `/api/app/depositOceanxExternal`,
                    {
                      crypto: crypto,
                      usdtValue: externalAmount,
                      loginName: loginName,
                      timestamp: timestamp,
                      signature: signature,
                    },
                    { headers: { Authorization: token } }
                  )
                  .then((res) => {
                    if (res.status == 200) {
                      if (res.data.code == 200) {
                        setOkMsg("Purchase success");
                        setSuccess(true);
                        setTimeout(function () {
                          navigate("/success");
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
              } else {
                axios
                  .post(
                    `/api/app/depositOceanx`,
                    { crypto: crypto, usdtValue: oxAmount },
                    { headers: { Authorization: token } }
                  )
                  .then((res) => {
                    if (res.status == 200) {
                      if (res.data.code == 200) {
                        setOkMsg("Purchase success");
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
              }
              setLoading(false);
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
                          `/api/app/depositTmrBet`,
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
                              setOkMsg("Purchase success");
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
          BUY
        </Button>
      </Box>
      <p className="footer"></p>
    </>
  );
}
