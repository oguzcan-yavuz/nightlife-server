'use strict';

const yelp = require('yelp-fusion');
const YELP_API_KEY = process.env.YELP_API_KEY;
const client = yelp.client(YELP_API_KEY);
const getGoingPeople = require('./goingPeople.js').getGoingPeople;

function parseVenues(venues) {
  // Just parse the keys we specified. Also get goingPeople
  // for each venue from DB and return their count in "goingPeople" property.
  const keys = ["id", "name", "image_url", "url", "rating"];
  return Promise.all(venues.map(async venue => {
    let goingPeopleRes = await getGoingPeople(venue.id);
    let count = (goingPeopleRes !== null) ? goingPeopleRes.goingPeople.length : 0;
    return keys.reduce((obj, key) => {
      obj[key] = venue[key];
      return obj;
    }, { "goingPeople": count })
  }))
}

async function getVenues(location) {
  const searchOptions = {
    location: location,
    categories: "nightlife"
  };
  return client.search(searchOptions)
      .then(response => {
        let venues = response.jsonBody.businesses;
        return parseVenues(venues);
      });
}

module.exports = async (req, res) => {
  const location = req.body.location;
  return res.json({ 'venues': await getVenues(location) });
};
