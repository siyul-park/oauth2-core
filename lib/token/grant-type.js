const subjectType = require('./subject-type');

const grantType = Object.freeze({
  AUTHORIZATION_CODE: subjectType.AUTHORIZATION_CODE,
});

module.exports = grantType;
