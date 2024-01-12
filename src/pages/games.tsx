import {
  Card,
  CardMedia,
  Typography,
  CardActions,
  Button,
  Box,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Games() {
  const nav = useNavigate();

  return (
    <>
      <Box component="form" noValidate autoComplete="off" sx={{ m: "10px" }}>
        <Typography
          variant="h5"
          color="primary"
          align="left"
          gutterBottom
          sx={{ mt: "10px" }}
        >
          All Games
        </Typography>
        <Card sx={{ mb: "10px" }}>
          <CardMedia sx={{ height: "160px" }} image="/images/oceanx.jpeg" />
          <CardActions sx={{ display: "flex" }}>
            <Typography align="left" gutterBottom variant="h6" sx={{ flex: 1 }}>
              OceanX
            </Typography>
            <Typography align="right" variant="body1" color="text.secondary">
              Shooting
            </Typography>
            <Button
              sx={{ ml: "10px", width: "120px" }}
              variant="contained"
              size="medium"
              color="primary"
              onClick={() => {
                const token = localStorage.getItem("token");
                axios
                  .post(
                    `/api/user/getBalance`,
                    {},
                    { headers: { Authorization: token } }
                  )
                  .then((res) => {
                    if (res.status == 200) {
                      if (res.data.code == 200) {
                        axios
                          .post(
                            `/api/app/getOceanxUrl`,
                            {},
                            { headers: { Authorization: token } }
                          )
                          .then((res) => {
                            if (res.status == 200) {
                              console.log(res.data.data.url);
                              window.open(res.data.data.url);
                            } else {
                              console.log("network error");
                            }
                          })
                          .catch(() => {
                            console.log("network error");
                          });
                      } else {
                        nav("/login");
                      }
                    } else {
                      nav("/login");
                    }
                  })
                  .catch(() => {
                    nav("/login");
                  });
              }}
            >
              Play Now
            </Button>
          </CardActions>
        </Card>
        <Card sx={{ mb: "10px" }}>
          <CardMedia sx={{ height: "160px" }} image="/images/tradex.png" />
          <CardActions sx={{ display: "flex" }}>
            <Typography align="left" gutterBottom variant="h6" sx={{ flex: 1 }}>
              TMR Stakes
            </Typography>
            <Typography align="right" variant="body1" color="text.secondary">
              App
            </Typography>
            <Button
              sx={{ ml: "10px", width: "120px" }}
              variant="contained"
              size="medium"
              onClick={() => {
                const token = localStorage.getItem("token");
                axios
                  .post(
                    `/api/user/getBalance`,
                    {},
                    { headers: { Authorization: token } }
                  )
                  .then((res) => {
                    if (res.status == 200) {
                      if (res.data.code == 200) {
                        axios
                          .post(
                            `/api/app/getTmrBetUrl`,
                            {},
                            { headers: { Authorization: token } }
                          )
                          .then((res) => {
                            if (res.status == 200) {
                              console.log(res.data.data.url);
                              window.open(res.data.data.url);
                            } else {
                              console.log("network error");
                            }
                          })
                          .catch(() => {
                            console.log("network error");
                          });
                      } else {
                        nav("/login");
                      }
                    } else {
                      nav("/login");
                    }
                  })
                  .catch(() => {
                    nav("/login");
                  });
              }}
            >
              Stake Now
            </Button>
          </CardActions>
        </Card>
        <Card sx={{ mb: "10px" }}>
          <CardMedia
            sx={{ height: "160px" }}
            image="/images/pakour_swing.png"
          />
          <CardActions sx={{ display: "flex" }}>
            <Typography align="left" gutterBottom variant="h6" sx={{ flex: 1 }}>
              Parkour Swing
            </Typography>
            <Typography align="center" variant="body1" color="text.secondary">
              Casual
            </Typography>
            <Button
              sx={{ ml: "10px", width: "120px" }}
              variant="contained"
              size="medium"
              onClick={() => {
                const token = localStorage.getItem("token");
                axios
                  .post(
                    `/api/user/getBalance`,
                    {},
                    { headers: { Authorization: token } }
                  )
                  .then((res) => {
                    if (res.status == 200) {
                      if (res.data.code == 200) {
                        const loginName = localStorage.getItem("loginName");
                        window.open(
                          "https://tmrgames.j4fgame.com/tga-h5/game-play.html?ad-test=0&ad-off=1&env=production&visible-button=false&app-id=30a377ecfccf40cea3a202fd2e064ad8&game-id=151&lang=en&txn-id=" +
                            loginName +
                            "&nickname=" +
                            loginName
                        );
                      } else {
                        nav("/login");
                      }
                    } else {
                      nav("/login");
                    }
                  })
                  .catch(() => {
                    nav("/login");
                  });
              }}
            >
              Play Now
            </Button>
          </CardActions>
        </Card>
        <Card sx={{ mb: "10px" }}>
          <CardMedia
            sx={{ height: "160px" }}
            image="/images/dangerous_road.png"
          />
          <CardActions sx={{ display: "flex" }}>
            <Typography align="left" gutterBottom variant="h6" sx={{ flex: 1 }}>
              Dangerous Road
            </Typography>
            <Typography align="center" variant="body1" color="text.secondary">
              Casual
            </Typography>
            <Button
              sx={{ ml: "10px", width: "120px" }}
              variant="contained"
              size="medium"
              onClick={() => {
                const token = localStorage.getItem("token");
                axios
                  .post(
                    `/api/user/getBalance`,
                    {},
                    { headers: { Authorization: token } }
                  )
                  .then((res) => {
                    if (res.status == 200) {
                      if (res.data.code == 200) {
                        const loginName = localStorage.getItem("loginName");
                        window.open(
                          "https://tmrgames.j4fgame.com/tga-h5/game-play.html?ad-test=0&ad-off=1&env=production&visible-button=false&app-id=30a377ecfccf40cea3a202fd2e064ad8&game-id=149&lang=en&txn-id=" +
                            loginName +
                            "&nickname=" +
                            loginName
                        );
                      } else {
                        nav("/login");
                      }
                    } else {
                      nav("/login");
                    }
                  })
                  .catch(() => {
                    nav("/login");
                  });
              }}
            >
              Play Now
            </Button>
          </CardActions>
        </Card>
        <Card sx={{ mb: "10px" }}>
          <CardMedia
            sx={{ height: "160px" }}
            image="/images/bridge_master.png"
          />
          <CardActions sx={{ display: "flex" }}>
            <Typography align="left" gutterBottom variant="h6" sx={{ flex: 1 }}>
              Bridge Master
            </Typography>
            <Typography align="right" variant="body1" color="text.secondary">
              Casual
            </Typography>
            <Button
              sx={{ ml: "10px", width: "120px" }}
              variant="contained"
              size="medium"
              onClick={() => {
                const token = localStorage.getItem("token");
                axios
                  .post(
                    `/api/user/getBalance`,
                    {},
                    { headers: { Authorization: token } }
                  )
                  .then((res) => {
                    if (res.status == 200) {
                      if (res.data.code == 200) {
                        const loginName = localStorage.getItem("loginName");
                        window.open(
                          "https://tmrgames.j4fgame.com/tga-h5/game-play.html?ad-test=0&ad-off=1&env=production&visible-button=false&app-id=30a377ecfccf40cea3a202fd2e064ad8&game-id=167&lang=en&txn-id=" +
                            loginName +
                            "&nickname=" +
                            loginName
                        );
                      } else {
                        nav("/login");
                      }
                    } else {
                      nav("/login");
                    }
                  })
                  .catch(() => {
                    nav("/login");
                  });
              }}
            >
              Play Now
            </Button>
          </CardActions>
        </Card>
        <p className="footer"></p>
      </Box>
    </>
  );
}
