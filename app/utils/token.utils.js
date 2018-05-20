const jwt = require('jsonwebtoken');

function createToken(auth) {
  return jwt.sign({
    id: auth.id
  }, 'nightlife-app-secret', {
    expiresIn: 60 * 120
  })
}

module.exports = {
  generateToken: function(req, res, next) {
    req.session.token = createToken(req.auth);
    return next();
  },
  sendToken: function(req, res) {
    res.setHeader('x-auth-token', req.session.token);
    res.cookie('token', req.session.token);
    return res.status(200).send(JSON.stringify(req.user));
  }
};
