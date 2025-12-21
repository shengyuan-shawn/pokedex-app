import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Card,
  Chip,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CircularProgress,
  Stack,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { getPokemonList, getPokemon } from "../api/pokemonApi";
import { TYPE_COLOURS } from "../../constants/typeColours";

export default function PokemonListPage() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pokemonsPerPage = 20;

  // Get Pokemon ID
  const getPokemonId = (url) => {
    const parts = url.split("/");
    return parts[parts.length - 2];
  };

  // Fetch Pokemon List
  const fetchPokemonList = async (page) => {
    setLoading(true);

    try {
      const offset = page * pokemonsPerPage;
      const data = await getPokemonList(pokemonsPerPage, offset);

      setTotalPages(Math.ceil(data.count / pokemonsPerPage));

      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon) => {
          const details = await getPokemon(pokemon.name);
          return details;
        })
      );

      setPokemonList(pokemonDetails);
      setCurrentPage(page);
    } catch (err) {
      setError("Pokemon are lost!", err);
    } finally {
      setLoading(false);
    }
  };

  // Set Fetch Pagination
  useEffect(() => {
    fetchPokemonList(0);
  }, []);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      fetchPokemonList(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      fetchPokemonList(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Loading State */}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Pokemon Grid */}
      {!loading && pokemonList.length > 0 && (
        <>
          <Grid
            container
            spacing={3}
            sx={{ mb: 4, justifyContent: "space-evenly" }}
          >
            {pokemonList.map((pokemon) => (
              <Grid item xs={12} sm={4} md={4} lg={3} key={pokemon.id}>
                <Card
                  sx={{
                    boxShadow: "none",
                    borderRadius: "16px",
                    transition: "all 0.2s ease",
                    cursor: "pointer",
                    minWidth: "200px",
                    display: "flex",
                    flexDirection: "column",
                    "&:hover": {
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                      transform: "translateY(-4px)",
                    },
                  }}
                >
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
                  <CardContent sx={{ textAlign: "center" }}>
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
                        sx={{ justifyContent: "center" }}
                        direction="row"
                        spacing={1}
                      >
                        {pokemon.types.map((typeSlot) => (
                          <Chip
                            key={typeSlot.type.name}
                            label={typeSlot.type.name}
                            sx={{
                              borderRadius: "4px",
                              background:
                                TYPE_COLOURS[typeSlot.type.name] || "#ccc",
                              color: TYPE_COLOURS[typeSlot.type.name],
                              "& .MuiChip-label": {
                                filter: "brightness(0.5)",
                              },
                              fontWeight: "bold",
                              textTransform: "capitalize",
                              //   mb: 2,
                            }}
                          />
                        ))}
                      </Stack>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 4,
              mt: 4,
            }}
          >
            <Button
              onClick={handlePreviousPage}
              disabled={currentPage === 0}
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
              }}
              startIcon={<ArrowBackIcon sx={{ fontSize: "18px" }} />}
            />

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                p: "8px 20px",
                backgroundColor: "#f9f9f9",
                borderRadius: "8px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: "700",
                  color: "#0066cc",
                }}
              >
                {currentPage + 1}
              </Typography>
              <Typography sx={{ fontSize: "16px", color: "#999" }}>
                OF
              </Typography>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: "700",
                  color: "#333",
                }}
              >
                {totalPages}
              </Typography>
            </Box>

            <Button
              onClick={handleNextPage}
              disabled={currentPage === totalPages - 1}
              sx={{
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                padding: "12px 20px",
                minWidth: "140px",
                minHeight: "40px",
                color: "#0066cc",
                transition: "all 0.3s ease",
                "& .MuiButton-endIcon": {
                  m: 0,
                },
                "&:hover:not(:disabled)": {
                  backgroundColor: "#f5f5f5",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
                },
                "&:disabled": {
                  color: "#ccc",
                  border: "1px solid #f0f0f0",
                },
              }}
              endIcon={<ArrowForwardIcon sx={{ fontSize: "18px" }} />}
            />
          </Box>
        </>
      )}
    </Container>
  );
}
