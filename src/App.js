import { useState, useEffect } from "react";
import "./App.css";
import { API_URL } from "./services/settings";
import getPokemons from "./services/getPokemons";
import getUrl from "./services/getUrl";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [url, setUrl] = useState([]);

  useEffect(function () {
    getUrl().then((url) => {
      setUrl(url);
      for (let i = 0; i < url.length; i++) {
        fetch(url[i])
          .then((res) => res.json())
          .then((data) => {
            // console.log(data);
            setPokemons((prevState) => {
              prevState = [...prevState, data];
              prevState.sort((a, b) => (a.id > b.id ? 1 : -1));
              return prevState;
            });
          });
      }
    });
  }, []);

  return (
    <div className="App">
      <h1 className="font-semibold text-blue-400 underline">PokeDex</h1>
      <h4>Gotta catch 'em all!</h4>
      <div className="m-0 p-0 pt-100px flex">
        <div className="flex flex-wrap p-4 ">
          {pokemons.map((p) => (
            <div
              key={p.id}
              className="flex flex-col justify-around items-center w-300px shadow-md shadow-black rounded-xl py-2 px-0 my-3 mx-4 box-border "
            >
              <div className="card-image ">
                <img
                  src={p.sprites.other["official-artwork"].front_default}
                  alt="pokemon img"
                  className="w-52 bg-gray-200"
                />
              </div>
              <div>
                <div className="font-semibold text-lg">{p.name}</div>
                <div>{p.types[0].type.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
