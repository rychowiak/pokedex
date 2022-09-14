import { useState, useEffect } from "react";
import getPokemons from "../services/getPokemons";
import Card from "./Cards";
import { API_URL } from "../services/settings";

const INITIAL_PAGE = 0;

export default function PokemonList() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [page, setPage] = useState(INITIAL_PAGE);
  const [limit, setLimit] = useState();

  let apiURL = `${API_URL}?offset=${page * limit}&limit=${limit}`;

  useEffect(
    function () {
      getPokemons(apiURL).then((data) => {
        data.results.map(async (p) => {
          const response = await fetch(`${API_URL}/${p.name}`);
          const data = await response.json();

          setAllPokemons((prevState) => {
            prevState = [...prevState, data];
            prevState.sort((a, b) => (a.id > b.id ? 1 : -1));
            return prevState;
          });
        });
      });
    },
    [apiURL]
  );

  useEffect(
    function () {
      if (page === INITIAL_PAGE) return;
      getPokemons(apiURL).then((data) => data);
    },
    [apiURL, page]
  );

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
