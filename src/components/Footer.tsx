import { Container, Box, Typography, Link } from "@mui/material";
import { pokeapiLogo } from "../assets/image";

export default function Footer() {
  return (
    <Container component="footer" maxWidth="xl">
      {/* Footer */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
          mt: 4,
          mb: 3,
        }}
      >
        <Typography
          sx={{ fontSize: "16px", color: "#0066cc", fontWeight: "bold" }}
        >
          Powered By
        </Typography>
        <Link
          component="a"
          href="https://pokeapi.co/"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src={pokeapiLogo}
            alt="PokeAPI"
            sx={{ width: 80, height: "auto" }}
          />
        </Link>
      </Box>
    </Container>
  );
}
