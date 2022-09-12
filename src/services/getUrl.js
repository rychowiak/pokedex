import { API_URL } from "./settings";

const apiResponse = (apiResponse) => {
  const { results, next, previous } = apiResponse;
  // console.log(results, next, previous);
  const resultsUrl = results.map((p) => p.url);
  return { next, previous, resultsUrl };
};

export default function getUrl(props) {
  /* const { page = 0, limit = 20 } = props;
  const apiURL = `${API_URL}?offset=${limit * page}&limit=20`; */

  return fetch(API_URL)
    .then((res) => res.json())
    .then(apiResponse);
}
