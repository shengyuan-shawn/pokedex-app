import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPokemon } from "../api/pokemonApi";
import {
  Container,
  Box,
  TextField,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function Search() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const searchHandler = async (e) => {
    e.preventDefault();

    if (!searchTerm.trim()) {
      setError("Please enter a Pokemon name");
      return;
    }

    setLoading(true);
    setError(null);

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
    <Container maxWidth="sm" sx={{ py: 4 }}>
      {/* Search Form */}
      <Box component="form" onSubmit={searchHandler} sx={{ mb: 4 }}>
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
      </Box>

      {/* Error State */}
      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
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
