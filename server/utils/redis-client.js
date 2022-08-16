const redis = require('redis');

class RedisClient {
  constructor() {
    this.Client = null;
  }

  async connect({ host, port, password }) {
    this.Client = redis.createClient({ host, port, password });
    await this.Client.connect();
    return this.Client;
  }
  
  async defaultConn() {
    this.Client = redis.createClient();
    await this.Client.connect();
    return this.Client;
  }
}

module.exports = new RedisClient();
