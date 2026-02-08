import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPokemon, getPokemonList } from "../api/pokemon_api";
import {
  Container,
  Box,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Paper,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

// Utility function to calculate match score
const calculateMatchScore = (pokemonName, searchTerm) => {
  const search = searchTerm.toLowerCase().replace(/ /g, "-");
  const name = pokemonName.toLowerCase();

  // Exact match (100 points)
  if (name === search) {
    return 100;
  }

  // Starts with match (90 points)
  if (name.startsWith(search)) {
    return 90;
  }

  // Contains match (70 points)
  if (name.includes(search)) {
    return 70;
  }

  // Partial match (50 points)
  const searchWithoutHyphen = search.replace(/-/g, "");
  if (name.replace(/-/g, "").includes(searchWithoutHyphen)) {
    return 50;
  }

  return 0;
};

export default function Search() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [allPokemon, setAllPokemon] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllPokemon = async () => {
      try {
        const data = await getPokemonList(1250, 0);
        setAllPokemon(data.results);
      } catch (err) {
        console.error("Error fetching Pokemon list:", err);
      }
    };

    fetchAllPokemon();
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (!value.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const filtered = allPokemon
      .map((pokemon) => ({
        ...pokemon,
        score: calculateMatchScore(pokemon.name, value),
      }))
      .filter((pokemon) => pokemon.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);

    setSuggestions(filtered);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = async (pokemonName) => {
    setLoading(true);
    setError(null);

    try {
      await getPokemon(pokemonName);
      navigate(`/pokemon/${pokemonName}`);
      setSearchTerm("");
      setSuggestions([]);
      setShowSuggestions(false);
    } catch (err) {
      setError("Pokemon not found!");
      setLoading(false);
    }
  };

  const searchHandler = async (e) => {
    e.preventDefault();

    if (!searchTerm.trim()) {
      setError("Please enter a Pokemon name");
      return;
    }

    setLoading(true);
    setError(null);
    setSuggestions([]);
    setShowSuggestions(false);

    try {
      const data = await getPokemon(searchTerm);
      navigate(`/pokemon/${data.name}`);
    } catch (err) {
      setError("Pokemon not found!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ pb: 8 }}>
      {/* Search Form */}
      <Box
        component="form"
        onSubmit={searchHandler}
        sx={{ position: "relative" }}
      >
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
            onChange={handleSearchChange}
            onFocus={() => searchTerm && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder="Search your Pokémon!"
            variant="standard"
            size="medium"
            fullWidth
            disabled={loading}
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
            autoComplete="off"
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
              "&:hover:not(:disabled)": {
                backgroundColor: "#FF5252",
                boxShadow: "0 4px 12px rgba(255, 107, 107, 0.4)",
              },
              "&:disabled": {
                backgroundColor: "#FFB3B3",
                cursor: "not-allowed",
              },
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "#ffffff" }} />
            ) : (
              <SearchIcon sx={{ fontSize: 24, color: "#ffffff" }} />
            )}
          </Button>
        </Box>

        {showSuggestions && suggestions.length > 0 && (
          <Paper
            sx={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              maxHeight: "300px",
              overflowY: "auto",
              zIndex: 10,
              marginTop: "8px",
              borderRadius: "8px",
            }}
          >
            <List sx={{ p: 0 }}>
              {suggestions.map((pokemon) => (
                <ListItemButton
                  key={pokemon.name}
                  onClick={() => handleSuggestionClick(pokemon.name)}
                  sx={{
                    py: 1.5,
                    px: 2,
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                    },
                  }}
                >
                  <ListItemText
                    primary={pokemon.name.replace(/-/g, " ")}
                    sx={{
                      textTransform: "capitalize",
                      "& .MuiListItemText-primary": {
                        fontSize: "14px",
                        fontWeight: "500",
                      },
                    }}
                  />
                </ListItemButton>
              ))}
            </List>
          </Paper>
        )}
      </Box>

      {/* Error State */}
      {error && (
        <Alert severity="error" sx={{ mb: 4, mt: 2 }}>
          {error}
        </Alert>
      )}

      {/* Loading State */}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
}
