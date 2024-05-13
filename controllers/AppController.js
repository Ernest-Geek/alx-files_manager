const { isAlive: isRedisAlive } = require('../utils/redis');
const { nbUsers, nbFiles } = require('../utils/db');

exports.getStatus = async (req, res) => {
  try {
    const redisStatus = await isRedisAlive();
    const dbStatus = await nbUsers() && await nbFiles();
    res.status(200).json({ redis: redisStatus, db: dbStatus });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getStats = async (req, res) => {
  try {
    const usersCount = await nbUsers();
    const filesCount = await nbFiles();
    res.status(200).json({ users: usersCount, files: filesCount });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
