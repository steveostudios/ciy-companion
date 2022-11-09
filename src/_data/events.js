const fetch = require("node-fetch");

module.exports = async function () {
  console.log("Fetching data...");

  const data = await fetch(`${process.env.API}/wp-json/wp/v2/events`, {
    headers: {
      'Access-Control-Allow-Origin':'*'
    },
    mode: 'cors'
  })
    .then((res) => res.json())
    .then((json) => json);

    console.log(data)
    return data;
};