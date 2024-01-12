import { Box, Typography } from "@mui/material";

export default function Success() {
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{ m: "20px", height: "60vh" }}
    >
      <Typography
        align="center"
        variant="h4"
        gutterBottom
        sx={{ mt: "10vh", mb: "40px" }}
      >
        Your deposit is complete
      </Typography>
    </Box>
  );
}
