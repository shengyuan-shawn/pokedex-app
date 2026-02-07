import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

export default function Navigation() {
  // Navigation Items With Icons
  const navItems = [
    { label: "Pokemon", icon: CatchingPokemonIcon, path: "/pokemon" },
    { label: "Berries", icon: LocalFloristIcon, path: "/berries" },
    { label: "Items", icon: ShoppingBagIcon, path: "/items" },
  ];

  // Check If Route Is Active
  const isActive = (path: string) => location.pathname === path;

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#fff",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
          borderRadius: "8px",
          borderBottom: "none",
        }}
      >
        <Container>
          <Toolbar
            sx={{ padding: { xs: "12px 0", sm: "16px 0" }, minHeight: "auto" }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                width: "100%",
                gap: { xs: 1, sm: 2, md: 3, lg: 4 },
                alignItems: "center",
              }}
            >
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const active = isActive(item.path);

                return (
                  <Button
                    key={item.path}
                    href={item.path}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      color: active ? "#FF6B6B" : "#666",
                      textTransform: "none",
                      fontSize: { xs: "12px", sm: "14px" },
                      fontWeight: active ? "600" : "500",
                      padding: { xs: "6px 8px", sm: "8px 12px" },
                      transition: "all 0.3s ease",
                      position: "relative",
                      "&:hover": {
                        color: "#FF6B6B",
                        backgroundColor: "transparent",
                      },
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: -8,
                        left: 0,
                        right: 0,
                        height: "3px",
                        backgroundColor: "#FF6B6B",
                        transform: active ? "scaleX(1)" : "scaleX(0)",
                        transformOrigin: "center",
                        transition: "transform 0.3s ease",
                      },
                      "&:hover::after": {
                        transform: "scaleX(1)",
                      },
                    }}
                  >
                    <IconComponent
                      sx={{ fontSize: { xs: "18px", sm: "20px" } }}
                    />
                    <Typography
                      sx={{
                        fontSize: { xs: "12px", sm: "14px" },
                        display: { xs: "none", sm: "block" },
                      }}
                    >
                      {item.label}
                    </Typography>
                  </Button>
                );
              })}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Container>
  );
}
