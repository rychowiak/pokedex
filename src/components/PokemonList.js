import { useState, useEffect } from "react";
import getPokemons from "../services/getPokemons";
import Card from "./Cards";
import PokemonLimit from "./PokemonLimit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const INITIAL_PAGE = 0;

export default function PokemonList() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [page, setPage] = useState(INITIAL_PAGE);
  const [limit, setLimit] = useState(5);

  useEffect(
    function () {
      getPokemons({ limit, page }).then((pokemon) => setAllPokemons(pokemon));
    },
    [limit, page]
  );

  const handleNextPage = () => {
    setPage(page + 1);
  };
  const handlePrevPage = () => {
    if (page === 0) return;
    setPage(page - 1);
  };

  const handlePokemonLimit = (e) => {
    const limitValue = parseInt(e.target.innerText);
    setPage(INITIAL_PAGE);
    setLimit(limitValue);
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
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="bg-blue-500 rounded-md text-white m-2 px-3 py-1 cursor-pointer"
            onClick={handlePrevPage}
          />
          <FontAwesomeIcon
            icon={faChevronRight}
            className="bg-blue-500 rounded-md text-white m-2 px-3 py-1 cursor-pointer"
            onClick={handleNextPage}
          />
        </div>
      )}
    </>
  );
}
