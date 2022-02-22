export const BASE_URL = "http://dataservice.accuweather.com";
export const API_KEY = "qPKcuUtqA1AUcJc6w1omln77IAASYU1L";

export const callAPI = (url, param) => {
  const autocompleteURL = `${BASE_URL}/${url}?apikey=${API_KEY}&q=${param}`;
  const fullURL = `${BASE_URL}/${url}?apikey=${API_KEY}`;
  let urlString;
  if (param) {
    urlString = autocompleteURL;
  } else {
    urlString = fullURL;
  }

  return fetch(urlString)
    .then((response) => {
      if (response.ok) {
        console.log(response);
        return response.json();
      } else {
        console.log(response);
        throw new Error("could not fetch the dats for that resourse");
      }
    })
    .catch((error) => {
      console.log(error, "error");
    });
};
