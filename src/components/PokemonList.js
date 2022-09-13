import { useState, useEffect } from "react";
import Card from "./Cards";
import { API_URL } from "../services/settings";

const INITIAL_PAGE = 0;

export default function PokemonList() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [page, setPage] = useState(INITIAL_PAGE);

  const limit = 5;
  const apiURL = `${API_URL}?offset=${page * limit}&limit=${limit}`;

  const getPokemons = async () => {
    const res = await fetch(apiURL);
    const data = await res.json();
    console.log(data);

    function getPokemonObject(results) {
      results.map(async (p) => {
        const response = await fetch(`${API_URL}/${p.name}`);
        const data = await response.json();

        setAllPokemons((prevState) => {
          prevState = [...prevState, data];
          prevState.sort((a, b) => (a.id > b.id ? 1 : -1));
          return prevState;
        });
      });
    }
    getPokemonObject(data.results);
  };

  useEffect(function () {
    getPokemons();
  }, []);

  useEffect(
    function () {
      if (page === INITIAL_PAGE) return;
      getPokemons();
    },
    [page]
  );

  // console.log(allPokemons);

  const handleNextPage = () => {
    setPage(page + 1);
  };

  return (
    <>
      {!allPokemons ? (
        <h1>Loading</h1>
      ) : (
        <div className="App">
          <h1 className="font-semibold text-blue-400 underline">PokeDex</h1>
          <h4>Gotta catch 'em all!</h4>
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
