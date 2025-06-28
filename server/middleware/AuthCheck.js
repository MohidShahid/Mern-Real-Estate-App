const { expressjwt: jwt } = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const jwtCheck = jwt({
  secret: jwksRsa.expressJwtSecret({
    jwksUri: 'https://dev-x11slbyeoa5rtcf1.us.auth0.com/.well-known/jwks.json',
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5
  }),
  audience: 'mern-real-estate-api',
  issuer: 'https://dev-x11slbyeoa5rtcf1.us.auth0.com/',
  algorithms: ['RS256']
});

module.exports = jwtCheck;