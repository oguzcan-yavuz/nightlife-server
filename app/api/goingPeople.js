'use strict';

const Venue = require('../models/venue.js');

async function getVenue(venueId) {
  let query = { venueId: venueId };
  return Venue.findOne(query);
}

async function updateDb(venueId, isGoing, userId) {
  let query = { venueId: venueId };
  let doc = (isGoing) ? { $pull: { goingPeople: userId } } : { $push: { goingPeople: userId } };
  let options = { new: true, fields: { _id: 0, goingPeople: 1 } };
  return Venue.findOneAndUpdate(query, doc, options);
}

async function insertDb(venueId, userId) {
  return Venue.insertMany({ venueId: venueId, goingPeople: [userId] });
}

async function getCount(venueId, userId) {
  let venue = await getVenue(venueId);
  let count;
  if(venue !== null) {
    let isGoing = venue.goingPeople.indexOf(userId) !== -1;
    let goingPeople = await updateDb(venueId, isGoing, userId);
    count = (goingPeople !== null) ? goingPeople.goingPeople.length : 0;
  } else {
    await insertDb(venueId, userId);
    count = 1;
  }
  return count;
}

async function updateGoingPeople(req, res) {
  let venueId = req.body.venueId;
  let userId = req.body.userId;
  let count = await getCount(venueId, userId);
  res.json({ goingPeopleCount: count });
}

module.exports = { getVenue, updateGoingPeople };
