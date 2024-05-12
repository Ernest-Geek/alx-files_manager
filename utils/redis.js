// utils/redis.js

const redis = require('redis');

class RedisClient {
  constructor() {
    // Create a Redis client
    this.client = redis.createClient();

    // Handle Redis client errors
    this.client.on('error', (error) => {
      console.error('Redis error:', error);
    });
  }

  async isAlive() {
    // Check if the connection to Redis is alive
    return new Promise((resolve) => {
      this.client.ping((error, response) => {
        if (error) {
          resolve(false);
        } else {
          resolve(response === 'PONG');
        }
      });
    });
  }

  async get(key) {
    // Get the value stored in Redis for the given key
    return new Promise((resolve, reject) => {
      this.client.get(key, (error, value) => {
        if (error) {
          reject(error);
        } else {
          resolve(value);
        }
      });
    });
  }

  async set(key, value, duration) {
    // Store the value in Redis with an expiration duration
    return new Promise((resolve, reject) => {
      this.client.set(key, value, 'EX', duration, (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async del(key) {
    // Delete the value stored in Redis for the given key
    return new Promise((resolve, reject) => {
      this.client.del(key, (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response === 1);
        }
      });
    });
  }
}

// Create and export an instance of RedisClient
const redisClient = new RedisClient();
module.exports = redisClient;

