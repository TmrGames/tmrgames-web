import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function MenuAppBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorHome, setAnchorHome] = React.useState<null | HTMLElement>(null);

  const handleMenu = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("login");
    } else {
      setAnchorEl(event?.currentTarget as HTMLInputElement);
    }
  };

  const handleMain = () => {
    navigate("/");
  };

  const handleTicket = () => {
    const token = localStorage.getItem("token");
    axios
      .post(`/api/user/getBalance`, {}, { headers: { Authorization: token } })
      .then((res) => {
        if (res.status == 200) {
          if (res.data.code == 200) {
            const loginName = localStorage.getItem("loginName");
            console.log(loginName);
            if (!loginName) {
              navigate("login");
            } else {
              navigate("/buyTicket", {
                state: {
                  loginName: loginName,
                  crypto: "VIC",
                },
              });
            }
          } else {
            navigate("login");
          }
        }
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loginName");
    setAnchorEl(null);
    navigate("/");
  };

  const handleMyAccount = () => {
    setAnchorEl(null);
    navigate("/wallet");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleHome = () => {
    setAnchorHome(event?.currentTarget as HTMLInputElement);
  };

  const handleHomeClose = () => {
    setAnchorHome(null);
  };

  const handleTwitter = () => {
    window.open("https://twitter.com/tmrgamesio");
    setAnchorHome(null);
  };

  const handleDiscord = () => {
    window.open("https://bit.ly/Discord-TMRGames");
    setAnchorHome(null);
  };

  const navigate = useNavigate();

  return (
    <AppBar
      sx={{
        background: "#20222A",
        left: "auto",
        right: "auto",
        maxWidth: "480px",
      }}
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 0 }}
          onClick={handleHome}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorHome}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorHome)}
          onClose={handleHomeClose}
        >
          <MenuItem onClick={handleTwitter}>Twitter</MenuItem>
          <MenuItem onClick={handleDiscord}>Discord</MenuItem>
        </Menu>
        <Box
          sx={{
            height: "30px",
            flex: 1,
            img: { height: "100%" },
            textAlign: "left",
          }}
        >
          <img src={"/head_logo.png"} onClick={handleMain} />
        </Box>
        <Box
          sx={{
            height: "40px",
            flex: 1,
            img: { height: "100%" },
            textAlign: "right",
          }}
        >
          <img src={"/images/ticket.png"} onClick={handleTicket} />
        </Box>
        <Box
          sx={{
            height: "40px",
            maxWidth: "30px",
            textAlign: "right",
          }}
        >
          <Typography
            variant="body1"
            color="white"
            align="center"
            gutterBottom
            sx={{ mt: "10px" }}
          >
            {}
          </Typography>
        </Box>
        {
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleMyAccount}>My Account</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        }
      </Toolbar>
    </AppBar>
  );
}
