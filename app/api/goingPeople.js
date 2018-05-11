'use strict';

const venue = require('../models/venue.js');

async function getGoingPeople(venueId) {
  let query = { venueId: venueId };
  return await venue.findOne(query);
}

async function isGoing(venueId, userId) {
  let goingPeople = await getGoingPeople(venueId);
  return goingPeople.indexOf(userId) !== -1
}

async function addGoingPeople(req, res) {
  // await venue.insertMany([{ venueId: "XE45D1tUfjJg1I5AN8cylw", goingPeople: ["mahmut", "osman"]}, {venueId: "J_4lCEEaTG6qUsu8SloOUQ", goingPeople: ["murtaza"]}]);
  // let venueId = req.body.venueId;
  // if(isGoing(venueId, req.user.twitter.id)) {
  //   // push the user to goingPeople and return the new goingPeople
  // } else {
  //   // pull the user from goingPeople and return the new goingPeople
  // }
  console.log(req.user);
  console.log(req.body);
  res.json({ test: "it's working?" });
}

module.exports = { getGoingPeople, addGoingPeople };
