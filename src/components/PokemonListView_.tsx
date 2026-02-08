import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
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
import { getPokemonList, getPokemon } from "../api/pokemon_api";
import { getContrastTextColor, POKEMON_TYPE_COLORS } from "../../constants/type_colours";

export default function PokemonListPage() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pokemonsPerPage = 20;
  const navigate = useNavigate();

  const fetchPokemonList = async (page) => {
    setLoading(true);
    try {
      const offset = page * pokemonsPerPage;
      const data = await getPokemonList(pokemonsPerPage, offset);

      setTotalPages(Math.ceil(data.count / pokemonsPerPage));

      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon) => getPokemon(pokemon.name)),
      );

      setPokemonList(pokemonDetails);
      setCurrentPage(page);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemonList(0);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <Container maxWidth={false} sx={{ py: 4 }}>
      {/* Loading */}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Pokemon Grid */}
      {!loading && pokemonList.length > 0 && (
        <>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
                xl: "repeat(5, 1fr)",
              },
              gap: 3,
              mb: 6,
            }}
          >
            {pokemonList.map((pokemon) => (
              <Card
                key={pokemon.id}
                onClick={() => navigate(`/pokemon/${pokemon.name}`)}
                sx={{
                  boxShadow: "none",
                  borderRadius: "14px",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.2s ease",
                  height: "100%",
                  "&:hover": {
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                    transform: "translateY(-4px)",
                  },
                }}
              >
                {/* Image */}
                <CardMedia
                  component="img"
                  height="160"
                  image={pokemon.sprites?.front_default}
                  alt={pokemon.name}
                  sx={{ objectFit: "contain", p: 2 }}
                />

                {/* Content */}
                <CardContent sx={{ textAlign: "center", flexGrow: 1 }}>
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    color="#555"
                    sx={{ mb: 2 }}
                  >
                    #{pokemon.id}
                  </Typography>

                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    textTransform="capitalize"
                    sx={{ mb: 3 }}
                  >
                    {pokemon.name.replace(/-/g, " ")}
                  </Typography>

                  <Stack direction="row" spacing={1} justifyContent="center">
                    {pokemon.types.map((typeSlot) => (
                      <Chip
                        key={typeSlot.type.name}
                        label={typeSlot.type.name}
                        sx={{
                          borderRadius: "4px",
                          background:
                            POKEMON_TYPE_COLORS[typeSlot.type.name] || "#ccc",
                          color: getContrastTextColor(POKEMON_TYPE_COLORS[typeSlot.type.name]),
                          fontWeight: "bold",
                          textTransform: "capitalize",
                          "& .MuiChip-label": {
                            filter: "brightness(0.9)",
                          },
                        }}
                      />
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Box>

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
              sx={{
                "& .MuiButton-startIcon": {
                  m: 0,
                },
              }}
              onClick={() => fetchPokemonList(currentPage - 1)}
              disabled={currentPage === 0}
              startIcon={<ArrowBackIcon />}
            />

            <Typography fontWeight="bold">
              {currentPage + 1} / {totalPages}
            </Typography>

            <Button
              sx={{
                "& .MuiButton-endIcon": {
                  m: 0,
                },
              }}
              onClick={() => fetchPokemonList(currentPage + 1)}
              disabled={currentPage === totalPages - 1}
              endIcon={<ArrowForwardIcon />}
            />
          </Box>
        </>
      )}
    </Container>
  );
}
