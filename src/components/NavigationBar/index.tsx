import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Home from "@mui/icons-material/Home";
import Games from "@mui/icons-material/SportsEsports";
import Wallet from "@mui/icons-material/AccountBalanceWallet";
import { useNavigate } from "react-router-dom";

export default function NavigationBar() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  return (
    <Box>
      <BottomNavigation
        sx={{ background: "#20222A" }}
        showLabels
        value={value}
        onChange={(_event, newValue) => {
          setValue(newValue);
          console.log(newValue);
          if (newValue === 0) {
            navigate("/");
          }
          if (newValue === 1) {
            navigate("games");
          }
          if (newValue === 2) {
            navigate("wallet");
          }
        }}
      >
        <BottomNavigationAction label="Home" icon={<Home />} />
        <BottomNavigationAction label="Games" icon={<Games />} />
        <BottomNavigationAction label="Wallet" icon={<Wallet />} />
      </BottomNavigation>
    </Box>
  );
}
