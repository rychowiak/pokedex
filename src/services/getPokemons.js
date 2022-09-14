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
  const { limit = 5, page = 0 } = props;
  const apiURL = `${API_URL}?offset=${page * limit}&limit=${limit}`;

  const response = await fetch(apiURL).then((res) => res.json());
  return await getPokemonObject(response).then((values) => Promise.all(values));
}
