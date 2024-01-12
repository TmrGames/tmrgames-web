import CarouselBanner from "../components/Carousel";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  Grid,
  Stack,
} from "@mui/material";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Games() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToScroll: 1,
  };

  const nav = useNavigate();

  return (
    <>
      <Box component="form" noValidate autoComplete="off" sx={{ m: "10px" }}>
        <CarouselBanner></CarouselBanner>
        <Typography
          variant="h6"
          color="primary"
          align="left"
          gutterBottom
          sx={{ mt: "10px" }}
        >
          Available Now
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card sx={{}}>
              <CardMedia sx={{ height: 160 }} image="/images/oceanx.jpeg" />
              <CardActions
                sx={{
                  marginTop: "-40px",
                }}
              >
                <Button
                  variant="contained"
                  size="small"
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
              <CardContent sx={{ pt: "5px" }}>
                <Typography align="left" gutterBottom variant="body2">
                  OceanX
                </Typography>
                <Typography align="left" variant="body2" color="text.secondary">
                  Collect your box
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6} alignItems="center">
            <Card sx={{}}>
              <CardMedia sx={{ height: 160 }} image="/images/pakour_icon.png" />
              <CardActions
                sx={{
                  marginTop: "-40px",
                }}
              >
                <Button
                  variant="contained"
                  size="small"
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

              <CardContent sx={{ pt: "5px" }}>
                <Typography align="left" gutterBottom variant="body2">
                  Parkour Swing
                </Typography>
                <Typography align="left" variant="body2" color="text.secondary">
                  Reward: 1000 Tomo
                </Typography>
                <Typography align="left" variant="body2" color="text.secondary">
                  Start date: TBD
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card sx={{}}>
              <CardMedia sx={{ height: 160 }} image="/images/tradex_icon.png" />
              <CardActions
                sx={{
                  marginTop: "-40px",
                }}
              >
                <Button
                  variant="contained"
                  size="small"
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
              <CardContent sx={{ pt: "5px" }}>
                <Typography align="left" gutterBottom variant="body2">
                  TMR Stakes
                </Typography>
                <Typography align="left" variant="body2" color="text.secondary">
                  Predict to earn
                </Typography>
                <Typography align="left" variant="body2" color="text.secondary">
                  Start date: TBD
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Typography
          variant="h6"
          color="primary"
          align="left"
          gutterBottom
          sx={{ mt: "10px" }}
        >
          More coming Up
        </Typography>
        <Typography variant="h4" margin={"40px"}>
          PARTNERS
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Stack
              sx={{
                height: "80px",
                alignItems: "center",
                justifyContent: "center",
                background: "#7B67E380",
                borderRadius: "4px",
                border: "2px solid rgb(93, 67, 221)",
                boxShadow: "0px 3px 5px 1px rgba(0, 0, 0, 0.5)",
                ml: "20px",
              }}
            >
              <Box
                sx={{
                  height: "40px",
                  margin: "auto",
                  borderRadius: "12px",
                  img: { height: "100%" },
                }}
              >
                <img src={"/images/partner_c98.png"} />
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack
              sx={{
                height: "80px",
                alignItems: "center",
                justifyContent: "center",
                background: "#7B67E380",
                borderRadius: "4px",
                border: "2px solid rgb(93, 67, 221)",
                boxShadow: "0px 3px 5px 1px rgba(0, 0, 0, 0.5)",
                mr: "20px",
              }}
            >
              <Box
                sx={{
                  height: "30px",
                  margin: "auto",
                  borderRadius: "12px",
                  img: { height: "100%" },
                }}
              >
                <img src={"/images/partner_ach.png"} />
              </Box>
            </Stack>
          </Grid>
        </Grid>
        <Typography margin={"20px"}></Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Stack
              sx={{
                height: "80px",
                alignItems: "center",
                justifyContent: "center",
                background: "#7B67E380",
                borderRadius: "4px",
                border: "2px solid rgb(93, 67, 221)",
                boxShadow: "0px 3px 5px 1px rgba(0, 0, 0, 0.5)",
                ml: "20px",
              }}
            >
              <Box
                sx={{
                  height: "50px",
                  margin: "auto",
                  borderRadius: "12px",
                  img: { height: "100%" },
                }}
              >
                <img src={"/images/partner_particle.png"} />
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack
              sx={{
                height: "80px",
                alignItems: "center",
                justifyContent: "center",
                background: "#7B67E380",
                borderRadius: "4px",
                border: "2px solid rgb(93, 67, 221)",
                boxShadow: "0px 3px 5px 1px rgba(0, 0, 0, 0.5)",
                mr: "20px",
              }}
            >
              <Box
                sx={{
                  height: "50px",
                  margin: "auto",
                  borderRadius: "12px",
                  img: { height: "100%" },
                }}
              >
                <img src={"/images/partner_viction.png"} />
              </Box>
            </Stack>
          </Grid>
        </Grid>
        <Typography variant="h4" margin={"40px"}>
          ADVISORS
        </Typography>
        <Slider {...settings} arrows={false}>
          <Box
            sx={{ width: "100%" }}
            onClick={() => {
              console.log("jump");
            }}
          >
            <Grid
              container
              spacing={0}
              sx={{
                margin: "auto",
                width: "320px",
                height: "240px",
                background: "url('/images/advisor_bg.png')",
                backgroundSize: "cover",
                mb: "40px",
              }}
            >
              <Grid item xs={5}>
                <Stack
                  sx={{
                    height: "240px",
                    alignItems: "center",
                    justifyContent: "center",
                    img: { height: "160px" },
                    ml: "40px",
                  }}
                >
                  <img src={"/images/charlie.png"} />
                </Stack>
              </Grid>
              <Grid item xs={7}>
                <Typography variant="h6" mt={"40px"}>
                  Charlie Hu
                </Typography>
                <Typography fontSize="11px" ml={"20px"} mr={"20px"}>
                  Charlie Hu is one of the most renowned names in the crypto
                  industry with unrivalled expertise in blockchain, web 3.0, and
                  decentralised applications.
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{ width: "100%" }}
            onClick={() => {
              console.log("jump");
            }}
          >
            <Grid
              container
              spacing={0}
              sx={{
                margin: "auto",
                width: "320px",
                height: "240px",
                background: "url('/images/advisor_bg.png')",
                backgroundSize: "cover",
                mb: "40px",
              }}
            >
              <Grid item xs={5}>
                <Stack
                  sx={{
                    height: "240px",
                    alignItems: "center",
                    justifyContent: "center",
                    img: { height: "160px" },
                    ml: "40px",
                  }}
                >
                  <img src={"/images/roland.png"} />
                </Stack>
              </Grid>
              <Grid item xs={7}>
                <Typography variant="h6" mt={"40px"}>
                  Roland ONG
                </Typography>
                <Typography fontSize="11px" ml={"20px"} mr={"20px"}>
                  Serial entrepreneur with 20+ years of experience in the game
                  industry, Roland has reaped huge success from bringing WoW to
                  China and listing the 9 Ltd in Nasdaq.
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{ width: "100%" }}
            onClick={() => {
              console.log("jump");
            }}
          >
            <Grid
              container
              spacing={0}
              sx={{
                margin: "auto",
                width: "320px",
                height: "240px",
                background: "url('/images/advisor_bg.png')",
                backgroundSize: "cover",
                mb: "40px",
              }}
            >
              <Grid item xs={5}>
                <Stack
                  sx={{
                    height: "240px",
                    alignItems: "center",
                    justifyContent: "center",
                    img: { height: "160px" },
                    ml: "40px",
                  }}
                >
                  <img src={"/images/tess.png"} />
                </Stack>
              </Grid>
              <Grid item xs={7}>
                <Typography variant="h6" mt={"40px"}>
                  Tess Hau
                </Typography>
                <Typography fontSize="11px" ml={"20px"} mr={"20px"}>
                  Tess Hau is an investor & advisor to high performing startups
                  globally. She had successful investments and exits in VR,
                  biotech, construction, crypto companies.
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{ width: "100%" }}
            onClick={() => {
              console.log("jump");
            }}
          >
            <Grid
              container
              spacing={0}
              sx={{
                margin: "auto",
                width: "320px",
                height: "240px",
                background: "url('/images/advisor_bg.png')",
                backgroundSize: "cover",
                mb: "40px",
              }}
            >
              <Grid item xs={5}>
                <Stack
                  sx={{
                    height: "240px",
                    alignItems: "center",
                    justifyContent: "center",
                    img: { height: "160px" },
                    ml: "40px",
                  }}
                >
                  <img src={"/images/martin.png"} />
                </Stack>
              </Grid>
              <Grid item xs={7}>
                <Typography variant="h6" mt={"40px"}>
                  Marrtin Hoon
                </Typography>
                <Typography fontSize="11px" ml={"20px"} mr={"20px"}>
                  Marrtin has 20+ years of immense experience in the field of
                  ICT, Cloud, Mobile Gaming and Blockchain with a vision to
                  contribute to the growth of Web3 world.
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Slider>
        <Grid container spacing={4} sx={{ mt: "20px", mb: "40px" }}>
          <Grid item xs={6}>
            <Box
              sx={{
                height: "30px",
                textAlign: "right",
                borderRadius: "12px",
                img: { height: "100%" },
              }}
            >
              <Link target="_blank" to="https://twitter.com/tmrgamesio">
                <img src={"/images/twitter.png"} />
              </Link>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                height: "30px",
                textAlign: "left",
                borderRadius: "12px",
                img: { height: "100%" },
              }}
            >
              <Link target="_blank" to="https://bit.ly/Discord-TMRGames">
                <img src={"/images/discord.png"} />
              </Link>
            </Box>
          </Grid>
        </Grid>
        <p className="footer">© Tomorrow Games. All Rights Reserved. 2023</p>
      </Box>
    </>
  );
}
