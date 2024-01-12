import { useEffect, useState } from "react";
import axios from "axios";
import {
  Snackbar,
  Alert,
  Box,
  Avatar,
  Typography,
  Grid,
  Button,
  IconButton,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Save from "@mui/icons-material/SaveAlt";
import Send from "@mui/icons-material/Send";

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: 96,
      height: 96,
      m: "0 auto",
      mt: "40px",
      fontSize: "4rem",
      color: "white",
    },
    children: `${name[0]}`,
  };
}

export default function Wallet() {
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loginName, setLoginName] = useState("");
  const [country, setCounrty] = useState("");
  const [wallet, setWallet] = useState("");
  const [vicBalance, setVicBalance] = useState("0.0000");
  const [c98Balance, setC98Balance] = useState("0.0000");
  const [usdtBalance, setUsdtBalance] = useState("0.00");
  const [ticketBalance, setTicketBalance] = useState("0");
  const [oceanxBalance, setOceanxBalance] = useState("0");
  const [tmrbetBalance, setTMRBetBalance] = useState("0");
  const [tmrbetLogin, setTMRBetLogin] = useState(false);
  const [oceanxLogin, setOceanXLogin] = useState(false);

  const handleParamEmptyClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setError(false);
  };

  const nav = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .post(`/api/user/getBalance`, {}, { headers: { Authorization: token } })
      .then((res) => {
        if (res.status == 200) {
          if (res.data.code == 200) {
            console.log("ok");
            setLoginName("" + localStorage.getItem("loginName"));
            setCounrty("" + localStorage.getItem("country"));
            setWallet(res.data.data.wallet);
            if (res.data.data.balanceList.length > 0) {
              setVicBalance(
                (res.data.data.balanceList[0].amount / 1e18).toFixed(4) + ""
              );
              if (res.data.data.balanceList.length > 1) {
                setC98Balance(
                  (res.data.data.balanceList[1].amount / 1e18).toFixed(4) + ""
                );
              }

              setUsdtBalance(
                (
                  (res.data.data.balanceList[0].amount *
                    res.data.data.priceList[0].price) /
                  1e18
                ).toFixed(2) + ""
              );
              setTicketBalance(res.data.data.ticketBalance);
            }
          } else {
            nav("/login");
            /*setErrorMsg(res.data.msg);
            setError(true);*/
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
    axios
      .post(
        `/api/app/getOceanxUserInfo`,
        {},
        { headers: { Authorization: token } }
      )
      .then((res) => {
        if (res.status == 200) {
          if (res.data.code == 200) {
            console.log(res.data.data);
            setOceanxBalance(res.data.data.balance);
            setOceanXLogin(true);
          } else {
            console.log("getOceanxUserInfo res.data.code error" + res.data.msg);
          }
        } else {
          console.log("getOceanxUserInfo res.status error" + res.data.msg);
        }
        console.log(res);
        console.log(res.data);
      })
      .catch(() => {
        console.log("getOceanxUserInfo network error");
      });
    axios
      .post(
        `/api/app/getTmrBetToken`,
        {},
        { headers: { Authorization: token } }
      )
      .then((res) => {
        if (res.status == 200) {
          if (res.data.code == 200) {
            setTMRBetLogin(true);
            console.log(res.data.data);
            axios
              .post(
                `/api/app/getTmrBetBalance`,
                { token: res.data.data },
                { headers: { Authorization: token } }
              )
              .then((res) => {
                if (res.status == 200) {
                  if (res.data.code == 200) {
                    console.log(
                      "usdt:" + JSON.parse(res.data.data).balance_usdt
                    );
                    setTMRBetBalance(JSON.parse(res.data.data).balance_usdt);
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
          } else {
            console.log("getTmrBetToken res.data.code error" + res.data.msg);
          }
        } else {
          console.log("getTmrBetToken res.status error" + res.data.msg);
        }
      })
      .catch(() => {
        console.log("getTmrBetToken network error");
      });
  }, []);

  return (
    <>
      <Box component="form" noValidate autoComplete="off" sx={{ m: "10px" }}>
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
        <Avatar {...stringAvatar(loginName)}></Avatar>
        <Typography
          variant="h6"
          color="white"
          align="center"
          sx={{ mt: "10px" }}
          gutterBottom
        >
          {loginName}
        </Typography>
        <Typography
          variant="h6"
          color="gray"
          align="center"
          gutterBottom
          sx={{ mb: "10px" }}
        >
          {country}
        </Typography>
        <Grid container spacing={0}>
          <Grid item xs={7}>
            <Typography variant="body2" color="gray" align="right" gutterBottom>
              New Gamer, Level 1
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Box
              sx={{
                height: "20px",
                img: { height: "100%" },
                textAlign: "left",
                ml: "10px",
              }}
            >
              <img src={"/images/no1.png"} />
            </Box>
          </Grid>
        </Grid>
        <Typography
          variant="h5"
          color="primary"
          align="center"
          gutterBottom
          sx={{ mt: "10px" }}
        >
          My Assets
        </Typography>
        <Box
          sx={{
            height: "60px",
            textAlign: "left",
            backgroundSize: "cover",
            backgroundImage: "url('/images/wallet_bg.png')",
          }}
        >
          <Grid container spacing={0}>
            <Grid item xs={2}></Grid>
            <Grid item xs={2}>
              <Typography
                variant="h6"
                color="gray"
                align="center"
                marginTop="10px"
                ml="10px"
              >
                Total
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography
                variant="h6"
                color="white"
                align="right"
                marginTop="10px"
                marginRight="20px"
              >
                $ {usdtBalance}
              </Typography>
            </Grid>
            <Grid item xs={3}></Grid>
          </Grid>
        </Box>
        <Grid container spacing={0}>
          <Grid item xs={2}>
            <Stack
              sx={{
                height: "60px",
              }}
            >
              <Box
                sx={{
                  height: "40px",
                  width: "40px",
                  margin: "auto",
                  borderRadius: "12px",
                  img: { height: "100%" },
                  background: "white",
                }}
              >
                <img src={"/images/vic.png"} />
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={1}>
            <Stack
              sx={{
                height: "60px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h6" color="gray" align="center">
                VIC
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={5}>
            <Stack
              sx={{
                height: "60px",
                alignItems: "right",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h6"
                color="white"
                align="right"
                sx={{ mr: "20px" }}
              >
                {vicBalance}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={2}>
            <Stack
              sx={{
                height: "60px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconButton
                size="large"
                edge="start"
                color="primary"
                aria-label="menu"
                sx={{ mr: 0 }}
                onClick={() =>
                  nav("/deposit", {
                    state: {
                      loginName: loginName,
                      wallet: wallet,
                      crypto: "VIC",
                      chain: "Viction",
                    },
                  })
                }
              >
                <Save />
              </IconButton>
            </Stack>
          </Grid>
          <Grid item xs={2}>
            <Stack
              sx={{
                height: "60px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconButton
                size="large"
                edge="start"
                color="primary"
                aria-label="menu"
                sx={{ mr: 0 }}
                onClick={() => {
                  nav("/withdraw", {
                    state: {
                      loginName: loginName,
                      wallet: wallet,
                      crypto: "VIC",
                      chain: "Viction",
                    },
                  });
                }}
              >
                <Send />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>
        <Grid container spacing={0}>
          <Grid item xs={2}>
            <Stack
              sx={{
                height: "60px",
              }}
            >
              <Box
                sx={{
                  height: "40px",
                  width: "40px",
                  margin: "auto",
                  borderRadius: "12px",
                  img: { height: "100%" },
                  background: "white",
                }}
              >
                <img src={"/images/c98.png"} />
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={1}>
            <Stack
              sx={{
                height: "60px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h6" color="gray" align="center">
                C98
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={5}>
            <Stack
              sx={{
                height: "60px",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h6"
                color="white"
                align="right"
                sx={{ mr: "20px" }}
              >
                {c98Balance}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={2}>
            <Stack
              sx={{
                height: "60px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconButton
                size="large"
                edge="start"
                color="primary"
                aria-label="menu"
                sx={{ mr: 0 }}
                onClick={() => {
                  nav("/deposit", {
                    state: {
                      loginName: loginName,
                      wallet: wallet,
                      crypto: "C98",
                      chain: "Viction",
                    },
                  });
                }}
              >
                <Save />
              </IconButton>
            </Stack>
          </Grid>
          <Grid item xs={2}>
            <Stack
              sx={{
                height: "60px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconButton
                size="large"
                edge="start"
                color="primary"
                aria-label="menu"
                sx={{ mr: 0 }}
                onClick={() => {
                  nav("/withdraw", {
                    state: {
                      loginName: loginName,
                      wallet: wallet,
                      crypto: "C98",
                      chain: "Viction",
                    },
                  });
                }}
              >
                <Send />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>
        <Grid container spacing={0}>
          <Grid item xs={2}>
            <Stack
              sx={{
                height: "60px",
              }}
            >
              <Box
                sx={{
                  height: "40px",
                  width: "40px",
                  margin: "auto",
                  borderRadius: "12px",
                  img: { height: "100%" },
                }}
              >
                <img src={"/images/usdt.png"} />
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={1}>
            <Stack
              sx={{
                height: "60px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h6" color="gray" align="center">
                USDT
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={5}>
            <Stack
              sx={{
                height: "60px",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h6"
                color="white"
                align="right"
                sx={{ mr: "20px" }}
              >
                0.0000
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={2}>
            <Stack
              sx={{
                height: "60px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconButton
                size="large"
                edge="start"
                color="primary"
                aria-label="menu"
                sx={{ mr: 0 }}
                onClick={() => {
                  nav("/deposit", {
                    state: {
                      loginName: loginName,
                      wallet: wallet,
                      crypto: "USDT",
                      chain: "Viction",
                    },
                  });
                }}
              >
                <Save />
              </IconButton>
            </Stack>
          </Grid>
          <Grid item xs={2}>
            <Stack
              sx={{
                height: "60px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconButton
                size="large"
                edge="start"
                color="primary"
                aria-label="menu"
                sx={{ mr: 0 }}
                onClick={() => {
                  nav("/withdraw", {
                    state: {
                      loginName: loginName,
                      wallet: wallet,
                      crypto: "USDT",
                      chain: "Viction",
                    },
                  });
                }}
              >
                <Send />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>
        <Typography
          variant="h5"
          color="primary"
          align="center"
          gutterBottom
          sx={{ mt: "10px" }}
        >
          My Tickets
        </Typography>
        <Grid container spacing={0}>
          <Grid item xs={3}>
            <Box
              sx={{
                height: "60px",
                width: "60px",
                margin: "auto",
                borderRadius: "12px",
                backgroundSize: "cover",
                backgroundImage: "url('/images/ticket.png')",
                marginBottom: "20px",
              }}
            ></Box>
          </Grid>
          <Grid item xs={4}>
            <Stack
              sx={{
                height: "60px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h6" color="white" align="center">
                x {ticketBalance}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={3}>
            <Stack
              sx={{
                height: "60px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                size="small"
                sx={{ width: "60px" }}
                onClick={() => {
                  nav("/buyTicket", {
                    state: {
                      loginName: loginName,
                      crypto: "VIC",
                    },
                  });
                }}
              >
                Buy
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={2}>
            <Stack
              sx={{
                height: "60px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                variant="outlined"
                size="small"
                sx={{ width: "60px" }}
                onClick={() => {
                  setErrorMsg("Coming soon");
                  setError(true);
                }}
              >
                Redeem
              </Button>
            </Stack>
          </Grid>
        </Grid>
        <Typography
          variant="h5"
          color="primary"
          align="center"
          gutterBottom
          sx={{ mt: "10px" }}
        >
          My Games
        </Typography>
        <Grid container spacing={0}>
          <Grid item xs={3}>
            <Typography
              variant="body2"
              color="white"
              align="center"
              gutterBottom
            >
              OceanX
            </Typography>
            <Box
              sx={{
                height: "60px",
                width: "60px",
                margin: "auto",
                borderRadius: "12px",
                backgroundSize: "cover",
                backgroundImage: "url('/images/oceanx_icon.png')",
                marginBottom: "20px",
              }}
            ></Box>
          </Grid>
          <Grid item xs={4}>
            <Stack
              sx={{
                height: "100px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="body1" color="gray" align="center">
                Gold
              </Typography>
              <Typography variant="body1" color="white" align="center">
                {parseFloat(oceanxBalance).toFixed(2)}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={3}>
            <Stack
              sx={{
                height: "100px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                size="small"
                sx={{ width: "60px" }}
                onClick={() => {
                  if (oceanxLogin) {
                    nav("/buy", {
                      state: {
                        loginName: loginName,
                        app: "OceanX",
                        crypto: "VIC",
                      },
                    });
                  } else {
                    setErrorMsg("Purchase is enabled after login OceanX");
                    setError(true);
                  }
                }}
              >
                Buy
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={2}>
            <Stack
              sx={{
                height: "100px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                variant="outlined"
                size="small"
                sx={{ width: "60px" }}
                onClick={() => {
                  setErrorMsg("Coming soon");
                  setError(true);
                }}
              >
                Sell
              </Button>
            </Stack>
          </Grid>
        </Grid>
        <Grid container spacing={0}>
          <Grid item xs={3}>
            <Typography
              variant="body2"
              color="white"
              align="center"
              gutterBottom
            >
              TMR Stakes
            </Typography>
            <Box
              sx={{
                height: "60px",
                width: "60px",
                margin: "auto",
                borderRadius: "12px",
                backgroundSize: "cover",
                backgroundImage: "url('/images/tradex_icon.png')",
              }}
            ></Box>
          </Grid>
          <Grid item xs={4}>
            <Stack
              sx={{
                height: "100px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="body1" color="gray" align="center">
                Usdt
              </Typography>
              <Typography variant="body1" color="white" align="center">
                {parseFloat(tmrbetBalance).toFixed(2)}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={3}>
            <Stack
              sx={{
                height: "100px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                size="small"
                sx={{ width: "60px" }}
                onClick={() => {
                  if (tmrbetLogin) {
                    nav("/buy", {
                      state: {
                        loginName: loginName,
                        app: "TMR Bet",
                        crypto: "VIC",
                      },
                    });
                  } else {
                    setErrorMsg("Purchase is enabled after login TMR Bet");
                    setError(true);
                  }
                }}
              >
                Buy
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={2}>
            <Stack
              sx={{
                height: "100px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                variant="outlined"
                size="small"
                sx={{ width: "60px" }}
                onClick={() => {
                  if (tmrbetLogin) {
                    nav("/sell", {
                      state: {
                        loginName: loginName,
                        app: "TMR Bet",
                        crypto: "VIC",
                      },
                    });
                  } else {
                    setErrorMsg("Sell is enabled after login TMR Bet");
                    setError(true);
                  }
                }}
              >
                Sell
              </Button>
            </Stack>
          </Grid>
        </Grid>
        <p className="footer"></p>
      </Box>
    </>
  );
}
