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
      <div>
        {pokemons.map((p) => (
          <div className="flex justify-center ">
            <img src={p.sprites.front_default} alt="pokemon img" />
            <div>{p.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
