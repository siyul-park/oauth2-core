class ActiveToken {
  constructor(token, maximumAccessCount) {
    this.id = token.jti;
    this.accessCount = 0;
    this.maximumAccessCount = maximumAccessCount;
  }
}


module.exports = ActiveToken;
