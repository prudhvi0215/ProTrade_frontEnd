// export const fetchStocks = () => {
//   let stocks = {};
//   const options = {
//     method: "GET",
//     headers: {
//       "X-RapidAPI-Key": "c674a5d10cmsh7d7fba21856d373p196d8fjsn5e445316ca3f",
//       "X-RapidAPI-Host": "twelve-data1.p.rapidapi.com",
//     },
//   };

//   fetch(
//     "https://twelve-data1.p.rapidapi.com/etf?exchange=Euronext&format=json",
//     options
//   )
//     .then((response) => response.json())
//     .then((response) => {
//         console.log(response)
//         stocks = response.data
//     })
//     .catch((err) => console.error(err));

//   return stocks;
// };

import axios from "axios";

const options = {
  method: "GET",
  url: "https://twelve-data1.p.rapidapi.com/etf",
  params: { exchange: "Euronext", format: "json" },
  headers: {
    "X-RapidAPI-Key": "c674a5d10cmsh7d7fba21856d373p196d8fjsn5e445316ca3f",
    "X-RapidAPI-Host": "twelve-data1.p.rapidapi.com",
  },
};

export const fetchStocks = async () => {
  const { data } = await axios.get(
    "https://twelve-data1.p.rapidapi.com/etf?exchange=Euronext&format=json",
    options
  );
  localStorage.setItem("stockData", JSON.stringify(data.data));
  console.log(data);
};

// axios
//   .get(
//     "https://twelve-data1.p.rapidapi.com/etf?exchange=Euronext&format=json",
//     options
//   )
//   .then(function (response) {
//     console.log(response.data.splice(0,90));
//   })
//   .catch(function (error) {
//     console.error(error);
//   });
