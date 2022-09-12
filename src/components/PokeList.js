import { useEffect, useState } from "react";
import { API_URL } from "../services/settings";
import Card from "./Cards";

export default function PokeList() {
  const [allPokemons, setAllPokemons] = useState([]);

  useEffect(function () {
    getPokemons();
  }, []);

  const getPokemons = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();

    getPokemonObject(data.results);

    function getPokemonObject(results) {
      results.map(async (p) => {
        const res = await fetch(`${API_URL}/${p.name}`);
        const data = await res.json();
        setAllPokemons((prevState) => {
          prevState = [...prevState, data];
          prevState.sort((a, b) => (a.id > b.id ? 1 : -1));
          return prevState;
        });
      });
    }
  };
  console.log(allPokemons);

  const handleNextPage = () => {};

  return (
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
  );
}
