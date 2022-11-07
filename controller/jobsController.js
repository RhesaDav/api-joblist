const axios = require("axios");

module.exports.getJobList = async (req, res) => {
  const url = "http://dev3.dansmultipro.co.id/api/recruitment/positions.json";
  let response = await fetch(url, { method: "GET" }).then((result) =>
    result.json()
  );
  res.status(200).json(response);
};

module.exports.getJobDetail = async (req, res) => {
  const id = req.params.id;
  const url = `http://dev3.dansmultipro.co.id/api/recruitment/positions/${id}`;
  const options = {
    method: "GET",
  };
  fetch(url, options)
    .then((res) => res.json())
    .catch((err) => console.error("error:" + err));
  try {
    let response = await fetch(url, options);
    response = await response.json();
    res.status(200).json({
      total: response.length,
      jobs: response,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `Internal Server Error.` });
  }
};