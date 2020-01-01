class Request {
  constructor(options) {
    Object.assign(this, options);

    if (!this.headers) this.headers = {};
  }

  set(key, value) {
    this.headers[key] = value;
  }

  get(key) {
    return this.headers[key];
  }
}

module.exports = Request;
