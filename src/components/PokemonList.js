import { useState, useEffect } from "react";
import getPokemons from "../services/getPokemons";
import Card from "./Cards";
import { API_URL } from "../services/settings";
import PokemonLimit from "./PokemonLimit";

const INITIAL_PAGE = 0;

export default function PokemonList() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [page, setPage] = useState(INITIAL_PAGE);
  const [limit, setLimit] = useState(5);

  // let apiURL = `${API_URL}?offset=${page * limit}&limit=${limit}`;

  useEffect(
    function () {
      getPokemons({ page, limit }).then((pokemon) => setAllPokemons(pokemon));
    },
    [page]
  );
  // console.log(allPokemons);

  useEffect(
    function () {
      if (page === INITIAL_PAGE) return;
      getPokemons().then((data) => data);
    },
    [page]
  );

  const handleNextPage = () => {
    setPage(page + 1);
  };
  const handlePokemonLimit = (e) => {
    console.log(e.target.value);
  };

  return (
    <>
      {!allPokemons ? (
        <h1>Loading</h1>
      ) : (
        <div className="App">
          <h1 className="font-semibold text-blue-400 underline">PokeDex</h1>
          <h4>Gotta catch 'em all!</h4>
          <PokemonLimit limit={limit} handleLimit={handlePokemonLimit} />
          <div className="m-0 p-0 pt-100px flex">
            <Card pokemon={allPokemons} />
          </div>
          <button
            className="bg-blue-500 rounded-md text-white m-2 px-3 py-1"
            onClick={handleNextPage}
          >
            Go to next page
          </button>
        </div>
      )}
    </>
  );
}
