'use strict';

const yelp = require('yelp-fusion');
const YELP_API_KEY = process.env.YELP_API_KEY;
const client = yelp.client(YELP_API_KEY);

async function getVenues(location) {
  const keys = ["id", "name", "image_url", "url", "rating"];
  const searchOptions = {
    location: location,
    categories: "nightlife"
  };
  return client.search(searchOptions)
      .then(response => {
        let venues = response.jsonBody.businesses;
        return venues.map(venue => keys.reduce((obj, key) => {
          obj[key] = venue[key];
          return obj;
        }, {}));
      });
}

module.exports = async (req, res) => {
  const location = req.body.location;
  return res.json({ 'venues': await getVenues(location) });
};
