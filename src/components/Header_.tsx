import { Container, Box } from "@mui/material";
import { pokemonLogo } from "../assets/image";

export default function Header() {
  return (
    <Container maxWidth="xl" component="header">
      {/* Platform Logo */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
        <img
          src={pokemonLogo}
          alt="Pokemon Logo"
          style={{ maxWidth: "200px", height: "auto" }}
        />
      </Box>
    </Container>
  );
}
