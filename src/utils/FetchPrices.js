export const fetchPrices = () => {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "c674a5d10cmsh7d7fba21856d373p196d8fjsn5e445316ca3f",
      "X-RapidAPI-Host": "twelve-data1.p.rapidapi.com",
    },
  };

  fetch(
    "https://twelve-data1.p.rapidapi.com/time_series?symbol=AMZN&interval=1day&outputsize=90&format=json",
    options
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      localStorage.setItem("stockPrices", JSON.stringify(response.values));
    })
    .catch((err) => console.error(err));
};

// const axios = require("axios");

// const options = {
//   method: "GET",
//   url: "https://twelve-data1.p.rapidapi.com/time_series",
//   params: {
//     symbol: "AMZN",
//     interval: "1day",
//     outputsize: "90",
//     format: "json",
//   },
//   headers: {
//     "X-RapidAPI-Key": "c674a5d10cmsh7d7fba21856d373p196d8fjsn5e445316ca3f",
//     "X-RapidAPI-Host": "twelve-data1.p.rapidapi.com",
//   },
// };

// export const fetchData = async () => {
//   const {data} = await axios.get("https://twelve-data1.p.rapidapi.com/time_series", options);
//   return data;
// };
