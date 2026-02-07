import { Routes, Route } from "react-router-dom";
import { Container, Box } from "@mui/material";
import Header from "./components/Header_";
import Search from "./components/Search_";
import Navigation from "./components/Navigation";
import PokemonListPage from "./components/PokemonListView";
import PokemonDetail from "./components/PokemonDetails_";
import Footer from "./components/Footer_";
import "./App.css";

const PokemonListView = () => (
  <Box>
    <Search />
    <PokemonListPage />
  </Box>
);

function App() {
  return (
    <>
      <Header />
      {/* <Navigation /> */}

      <Container maxWidth="lg" sx={{ py: 4, minHeight: "80vh" }}>
        <Routes>
          {/* Home */}
          <Route path="/" element={<PokemonListView />} />

          {/* Pokemon list */}
          <Route path="/pokemon" element={<PokemonListView />} />

          {/* Pokemon detail */}
          <Route path="/" element={<Search />} />
          <Route path="/pokemon/:pokemonName" element={<PokemonDetail />} />

          {/* Other pages */}
          <Route path="/berries" element={<div>Berries Page Content</div>} />
          <Route path="/items" element={<div>Items Page Content</div>} />
        </Routes>
      </Container>

      <Footer />
    </>
  );
}

export default App;
