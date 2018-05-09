const rp = require('request-promise');

async function getPlaces(location) {
  const options = {};
  let result;
  rp(options)
    .then(response => {
      console.log(response);
    });
  return result;
}

module.exports = async (req, res) => {
  let location = req.body;
  return res.json({ location: location });
};
