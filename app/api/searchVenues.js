'use strict';

const yelp = require('yelp-fusion');
const YELP_API_KEY = process.env.YELP_API_KEY;
const client = yelp.client(YELP_API_KEY);
const getVenue = require('./goingPeople.js').getVenue;

function parseVenues(venues) {
  // Just parse the keys we specified. Also get goingPeople
  // for each venue from DB and return their count in "goingPeople" property.
  const keys = ["id", "name", "image_url", "url", "rating"];
  return Promise.all(venues.map(async venue => {
    let getVenueRes = await getVenue(venue.id);
    let count = (getVenueRes !== null) ? getVenueRes.goingPeople.length : 0;
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
  // set location value into session
  req.session.location = location;
  return res.json({ 'venues': await getVenues(location) });
};
