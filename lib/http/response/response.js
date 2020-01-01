const queryString = require('query-string');

class Response {
  constructor(options) {
    Object.assign(this, options);

    if (!this.status) this.status = 200;
    if (!this.headers) this.headers = {};
  }

  set(key, value) {
    this.headers[key] = value;
  }

  get(key) {
    return this.headers[key];
  }

  redirect(uri) {
    if (this.status === 302) return this;

    this.status = 302;

    if (this.body) {
      this.set('Location', `${uri}?${queryString.stringify(this.body)}`);
      this.body = null;
    } else this.set('Location', uri);

    return this;
  }
}

module.exports = Response;
