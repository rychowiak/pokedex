import { API_URL } from "./settings";

const apiResponse = (apiResponse) => {
  const { results } = apiResponse;
  const resultsUrl = results.map((p) => p.url);
  return resultsUrl;
};

export default async function getUrl() {
  return await fetch(API_URL)
    .then((res) => res.json())
    .then(apiResponse);
}
