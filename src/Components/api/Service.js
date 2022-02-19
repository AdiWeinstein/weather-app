export const BASE_URL = "http://dataservice.accuweather.com";
export const API_KEY = "4TC5zpT6cjh0mHLyl5aY3Uou89nyP3NI";

// http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=JOymLgzV2N7AsWWQyW3Kb78FC4ZQbRqz&q=tel%20aviv

export const callAPI = (url, param) => {
    console.log( "hello");
    const autocompleteURL = `${BASE_URL}/${url}?apikey=${API_KEY}&q=${param}`;
    const fullURL = `${BASE_URL}/${url}?apikey=${API_KEY}`;
    let urlString;
    if(param){
         urlString = autocompleteURL
    }else{
        urlString = fullURL
    }
    console.log("urlString>>>>>", urlString);
    return fetch(urlString) 
   .then((response) => {
        if (response.ok) {
            console.log(response);
          return response.json();
          
        } else {
            console.log(response);
          throw new Error('could not fetch the dats for that resourse');

        }
      })
        // .then((response) => response.json())
        .catch((error) => {
            console.log(error,"error")
        });
}
