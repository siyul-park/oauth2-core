const JobManager = require('./job-manager');

class DefaultJobManager extends JobManager {
  constructor() {
    super();

    this.jobs = new Map();
  }

  async register(id, handler, timeout) {
    this.jobs.set(id, setTimeout(handler, timeout));
  }

  async delete(id) {
    const jobId = this.jobs.get(id);

    clearTimeout(jobId);
    this.jobs.delete(id);
  }
}

module.exports = DefaultJobManager;
