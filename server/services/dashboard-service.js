const redisDB = require('../utils/redis-client');
const { getFromMongoDB } = require('./update-event-service');

// This method will get data from redis.
// If first time data is empty then it will fetch data from
// MongoDB and return also store it in redis cache.
async function getDashboardData() {
  return new Promise(async (resolve, reject) => {
    const redisData = await redisDB.Client.get('dashboard');

    if (redisData) {
      // send data from redis cache
      return resolve({ success: true, data: JSON.parse(redisData) });
    } else {
      try {
        // When redis is empty rebuild dashboard data
        const dashboardData = await getFromMongoDB();

        // Store update status in redis cache
        await redisDB.Client.set('dashboard', JSON.stringify(dashboardData));

        return resolve({ success: true, data: dashboardData });
      } catch (e) {
        console.log(e);
        reject({
          success: false,
          message: 'Internal server error',
        });
      }
    }
  });
}

module.exports = { getDashboardData };
