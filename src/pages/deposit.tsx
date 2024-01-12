import QRCode from "react-qr-code";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Typography, Button, Grid, Snackbar, Alert } from "@mui/material";
import { useState } from "react";
import Back from "@mui/icons-material/ArrowBackIos";

export default function Deposit() {
  const { state } = useLocation();
  const loginName = state.loginName;
  const wallet = state.wallet;
  const crypto = state.crypto;
  const chain = state.chain;
  const navigate = useNavigate();

  const [success, setSuccess] = useState(false);

  const handleOKClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccess(false);
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
          {"Address copied to clip board"}
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
          Deposit
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
          align="center"
          marginTop="20px"
        >
          To: {loginName}
        </Typography>
        <Typography variant="body1" color="white" align="center">
          Token: {crypto} on {chain} chain
        </Typography>
        <Typography
          variant="body1"
          color="primary"
          align="left"
          marginTop={"20px"}
          marginLeft={"20px"}
        >
          SCAN / COPY YOUR WALLET
        </Typography>

        <Grid container marginBottom={"20px"}>
          <Grid item xs={9}>
            <Typography
              variant="body2"
              color="white"
              align="left"
              marginLeft={"20px"}
            >
              {wallet.slice(0, 30)}
            </Typography>
            <Typography
              variant="body2"
              color="white"
              align="left"
              marginLeft={"20px"}
            >
              {wallet.slice(30)}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              onClick={() => {
                navigator.clipboard.writeText(wallet);
                setSuccess(true);
              }}
            >
              COPY
            </Button>
          </Grid>
        </Grid>

        <QRCode
          size={256}
          style={{
            height: "auto",
            maxWidth: "40%",
            width: "40%",
          }}
          value={wallet}
          viewBox={`0 0 256 256`}
        />
      </Box>
    </>
  );
}
