const redisDB = require('../utils/redis-client');
const { getFromMongoDB } = require('./update-event-service');

// This method will give data from redis.
// If for the first time data is null then it will fetch data from
// MongoDB and serve it also it will store that data
// in redis for to serve upcomming request.
async function getFromRedis() {
  return new Promise(async (resolve, reject) => {
    const redisData = await redisDB.Client.get('dashboard');
    if (redisData) {
      resolve({ success: true, data: JSON.parse(redisData) });
    } else {
      try {
        // When redis is empty rebuild dashboard data
        const dashboardData = await getFromMongoDB();

        // STORE IT TO REDIS
        await redisDB.Client.set('dashboard', JSON.stringify(dashboardData));

        resolve({ success: true, data: dashboardData });
      } catch (e) {
        console.log(e);
        reject({ res: { message: 'Internal server error' } });
      }
    }
  });
}

module.exports = { getFromRedis };
