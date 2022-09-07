import axios from "axios";

export default function getPokemons() {
  return axios
    .get("https://pokeapi.co/api/v2/pokemon/")
    .then((res) => res.data);
}
