import { API_URL } from "./settings";

const getPokemonObject = async (apiResponse) => {
  const { results } = apiResponse;
  const pokemonObjects = await results.map(async (p) => {
    const response = await fetch(`${API_URL}/${p.name}`).then((res) =>
      res.json()
    );
    return response;
  });
  return pokemonObjects;
};

export default async function getPokemons(props) {
  const { limit, page } = props;
  const apiURL = `${API_URL}?offset=${page * limit}&limit=${limit}`;

  return fetch(apiURL)
    .then((res) => res.json())
    .then(getPokemonObject)
    .then((pokemons) => Promise.all(pokemons));
}
