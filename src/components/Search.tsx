import { useState } from "react";
import {
  Container,
  Box,
  Stack,
  TextField,
  Button,
  CardMedia,
  CardContent,
  Card,
  Chip,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { getPokemon } from "../api/pokemonApi";
import { TYPE_COLOURS } from "../../constants/typeColours";

export default function Search() {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchTerm.trim()) {
      setError("Please enter a Pokemon name");
      setPokemon(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await getPokemon(searchTerm);
      setPokemon(data);
    } catch (err) {
      setError("Pokemon not found!");
      setPokemon(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      {/*Search Form */}
      <Box component="form" onSubmit={handleSearch} sx={{ mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            padding: "8px 8px 8px 16px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
            transition: "all 0.3s ease",
            "&:hover": {
              boxShadow: "0 6px 16px rgba(0, 0, 0, 0.12)",
            },
            "&:focus-within": {
              boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
            },
          }}
        >
          <TextField
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search your Pokémon!"
            variant="standard"
            size="medium"
            fullWidth
            InputProps={{
              disableUnderline: true,
            }}
            sx={{
              "& .MuiInput-input": {
                fontSize: "16px",
                color: "#333",
                "&::placeholder": {
                  color: "#aaa",
                  opacity: 1,
                },
              },
            }}
          />
          <Button
            type="submit"
            disabled={loading}
            sx={{
              height: 48,
              width: 48,
              minWidth: 48,
              borderRadius: "4px",
              backgroundColor: "#FF6B6B",
              color: "#fff",
              p: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#FF5252",
                boxShadow: "0 4px 12px rgba(255, 107, 107, 0.4)",
              },
              "&:disabled": {
                backgroundColor: "#FFB3B3",
              },
            }}
          >
            {loading ? (
              "..."
            ) : (
              <SearchIcon sx={{ fontSize: 24, color: "#ffffff" }} />
            )}
          </Button>
        </Box>
      </Box>

      {/* Loading State */}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Error State */}
      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      {/* Pokemon Details */}
      {!loading && pokemon && (
        <Card sx={{ boxShadow: "none" }}>
          {/* Pokemon Image */}
          <CardMedia
            component="img"
            height="160"
            image={pokemon.sprites?.front_default}
            alt={pokemon.name}
            sx={{
              objectFit: "contain",
              padding: 2,
            }}
          />

          {/*Pokemon Details */}
          <CardContent>
            {/* Pokemon ID */}
            <Typography
              variant="body2"
              color="#555"
              fontWeight="bold"
              sx={{ mb: 2 }}
            >
              #{pokemon.id}
            </Typography>

            {/* Pokemon Name */}
            <Typography
              variant="h5"
              component="h2"
              sx={{
                mb: 3,
                fontWeight: "bold",
                textTransform: "capitalize",
              }}
            >
              {pokemon.name}
            </Typography>

            {/* Pokemon Types */}
            <Box sx={{ mb: 2 }}>
              <Stack
                direction="row"
                spacing={1}
                sx={{ justifyContent: "center" }}
              >
                {pokemon.types.map((typeSlot) => (
                  <Chip
                    key={typeSlot.type.name}
                    label={typeSlot.type.name}
                    sx={{
                      borderRadius: "4px",
                      background: TYPE_COLOURS[typeSlot.type.name] || "#ccc",
                      color: TYPE_COLOURS[typeSlot.type.name],
                      "& .MuiChip-label": {
                        filter: "brightness(0.5)",
                      },
                      fontWeight: "bold",
                      textTransform: "capitalize",
                      mb: 2,
                    }}
                  />
                ))}
              </Stack>
            </Box>
          </CardContent>
        </Card>
      )}
    </Container>
  );
}
