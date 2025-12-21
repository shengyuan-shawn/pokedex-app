import Header from "./components/Header";
import Search from "./components/Search";
import './App.css'
import PokemonListPage from "./components/HomePage";

function App() {
  return (
    <>
      <Header></Header>
      <Search></Search>
      <PokemonListPage></PokemonListPage>
    </>
  )
}

export default App