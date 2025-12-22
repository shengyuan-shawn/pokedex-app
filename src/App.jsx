import Header from "./components/Header";
import Search from "./components/Search";
import PokemonListPage from "./components/HomePage";
import Footer from "./components/Footer";
import './App.css'

function App() {
  return (
    <>
      <Header></Header>
      <Search></Search>
      <PokemonListPage></PokemonListPage>
      <Footer></Footer>
    </>
  )
}

export default App