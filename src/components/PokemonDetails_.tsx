import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPokemon } from "../api/pokemon_api";
import {
  Container,
  Box,
  Stack,
  Button,
  CardMedia,
  CardContent,
  Card,
  Chip,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { TYPE_COLOURS } from "../../constants/typeColours";

export default function PokemonDetail() {
  const { pokemonName } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!pokemonName) {
      setError("Pokemon not specified!");
      setLoading(false);
      return;
    }

    const fetchPokemon = async () => {
      try {
        const data = await getPokemon(pokemonName);
        if (!data) {
          setError("Pokemon not found!");
          setLoading(false);
        } else {
          setPokemon(data);
          setError(null);
        }
      } catch {
        console.error("Failed to fetch pokemon: ", err);
        setError("Failed to load Pokemon. Please try again.");
        setPokemon(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [pokemonName]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !pokemon) {
    <Button
      onClick={() => navigate("/pokemon")}
      sx={{
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        p: "12px 20px",
        minWidth: "140px",
        minHeight: "40px",
        color: "#0066cc",
        transition: "all 0.3s ease",
        "& .MuiButton-startIcon": {
          m: 0,
        },
        "&:hover:not(:disabled)": {
          backgroundColor: "#f5f5f5",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
        },
        "&:disabled": {
          color: "#ccc",
          border: "2px solid #f0f0f0",
        },
        my: 3,
      }}
      startIcon={<ArrowBackIcon sx={{ fontSize: "18px" }} />}
    />;
  }

  return (
    <Container maxWidth="md">
      <Button
        onClick={() => navigate("/pokemon")}
        sx={{
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          p: "12px 20px",
          minWidth: "140px",
          minHeight: "40px",
          color: "#0066cc",
          transition: "all 0.3s ease",
          "& .MuiButton-startIcon": {
            m: 0,
          },
          "&:hover:not(:disabled)": {
            backgroundColor: "#f5f5f5",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
          },
          "&:disabled": {
            color: "#ccc",
            border: "2px solid #f0f0f0",
          },
          my: 3,
        }}
        startIcon={<ArrowBackIcon sx={{ fontSize: "18px" }} />}
      />

      {/* Pokemon Card */}
      <Card sx={{ boxShadow: "none" }}>
        {/* Pokemon Image */}
        <CardMedia
          component="img"
          height="240"
          image={pokemon.sprites?.front_default}
          alt={pokemon.name}
          sx={{
            objectFit: "contain",
            px: 2,
            pt: 3,
          }}
        />

        {/*Pokemon Details */}
        <CardContent sx={{ px: 4 }}>
          {/* Pokemon ID */}
          <Typography
            variant="body1"
            color="#555"
            fontWeight="bold"
            sx={{ mb: 2 }}
          >
            #{String(pokemon.id).padStart(3, "0")}{" "}
          </Typography>

          {/* Pokemon Name */}
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{
              mb: 3,
              textTransform: "capitalize",
            }}
          >
            {(pokemon.name).replace(/-/g, " ")}
          </Typography>

          {/* Pokemon Types */}
          <Box sx={{ pb: 3 }}>
            <Stack
              direction="row"
              spacing={2}
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
                    py: 2.4,
                    px: 2,
                    fontSize: "14px"
                  }}
                />
              ))}
            </Stack>
          </Box>

          {/* Pokemon Height & Weight */}
          <Box sx={{ pb: 3 }}>
            <Stack
              direction="row"
              spacing={2}
              sx={{ justifyContent: "center" }}
            >
              <Typography
                variant="body1"
                fontWeight="bold"
                color="#000"
                sx={{ mb: 1 }}
              >
                Height: {(pokemon.height / 10).toFixed(1)} m
              </Typography>
              <Typography
                variant="body1"
                fontWeight="bold"
                color="#000"
                sx={{ mb: 1 }}
              >
                Weight: {(pokemon.weight / 10).toFixed(1)} kg
              </Typography>
            </Stack>
          </Box>

          {/* Pokemon Abilities */}
          {pokemon.stats && pokemon.stats.length > 0 && (
            <Stack spacing={2} sx={{ borderTop: "3px solid #0066cc", py: 3 }}>
              <Typography variant="body1" fontWeight="bold">
                Stats
              </Typography>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: 2,
                }}
              >
                {pokemon.stats.map((stat) => (
                  <Box
                    key={stat.stat.name}
                    sx={{
                      backgroundColor: "#f4f4f4",
                      padding: "12px",
                      borderRadius: "8px",
                    }}
                  >
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      sx={{ mb: 1 }}
                      textTransform={"capitalize"}
                    >
                      {stat.stat.name}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: "bold", color: "#0066cc" }}
                      >
                        {stat.base_stat}
                      </Typography>
                      {/* Progress bar */}
                      <Box
                        sx={{
                          flex: 1,
                          height: "6px",
                          backgroundColor: "#bbb",
                          borderRadius: "3px",
                          overflow: "hidden",
                        }}
                      >
                        <Box
                          sx={{
                            height: "100%",
                            width: `${(stat.base_stat / 100) * 100}%`,
                            backgroundColor: "#0066cc",
                            transition: "width 0.3s ease",
                          }}
                        />
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Stack>
          )}

          {pokemon.moves && pokemon.moves.length > 0 && (
            <Stack spacing={2} sx={{ borderTop: "3px solid #0066cc", py: 3 }}>
              <Typography variant="body1" fontWeight="bold">
                Moves
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: 2,
                }}
              >
                {pokemon.moves.slice(0, 6).map(
                  (
                    move, // slice(0, 6) - get first 6
                  ) => (
                    <Box
                      key={move.move.name}
                      sx={{
                        backgroundColor: "#f0f0f0",
                        padding: "12px",
                        borderRadius: "8px",
                      }}
                    >
                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        sx={{
                          textTransform: "capitalize",
                        }}
                      >
                        {move.move.name}
                      </Typography>
                    </Box>
                  ),
                )}
              </Box>
            </Stack>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}
