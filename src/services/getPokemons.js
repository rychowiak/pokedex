export default async function getPokemons(url) {
  return fetch(url).then((res) => res.json());
}
