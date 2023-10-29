import { Box, Typography } from "@mui/material";

export default function NotFound() {
  return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Typography variant="h3">
          Page not found. Please try again later
        </Typography>
      </Box>
  );
}
