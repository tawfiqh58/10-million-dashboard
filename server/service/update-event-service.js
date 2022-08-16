const redisDB = require('../utils/redis-client');
const { User } = require('../models/User');

const TOP_10_CONTRIES = 10;
const TOP_15_USER = 15;

const userCreated = async () => {
  try {
    const dashboardData = await getFromMongoDB();

    // STORE IT TO REDIS
    await redisDB.Client.set('dashboard', JSON.stringify(dashboardData));

    // BROADCAST DASHBOARD UPDATE
    global.io.emit('dashboard', { success: true, data: dashboardData });
  } catch (e) {
    console.log(e);
  }
};

// Mongodb current status
const getFromMongoDB = () => {
  return new Promise(async (resolve, reject) => {
    let now = new Date();
    let oneDayTs = new Date();
    let lastWeekTs = new Date();
    let lastMonthTs = new Date();

    oneDayTs.setDate(now.getDate() - 1);
    lastWeekTs.setDate(now.getDate() - 7);
    lastMonthTs.setMonth(now.getMonth() - 1);

    oneDayTs = oneDayTs.getTime();
    lastWeekTs = lastWeekTs.getTime();
    lastMonthTs = lastMonthTs.getTime();

    try {
      // get top 10 countris by user count
      const topCountriesByUser = await User.aggregate([
        { $sortByCount: '$country' },
        { $limit: TOP_10_CONTRIES },
      ]);

      // get device counts
      const devicesCount = await User.aggregate([{ $sortByCount: '$device' }]);

      // get gender counts
      const genderCount = await User.aggregate([{ $sortByCount: '$gender' }]);

      // get top 15 user by usage time
      const topActiveUsers = await User.aggregate([
        { $sort: { totalActive: -1 } },
        { $limit: TOP_15_USER },
      ]);

      // get DAU/WAU/MAU
      const userActiveStatus = await User.aggregate([
        {
          $project: {
            lastWeek: {
              $cond: [{ $gt: ['$lastActive', lastWeekTs] }, 1, 0],
            },
            lastMonth: {
              $sum: {
                $cond: [{ $gt: ['$lastActive', lastMonthTs] }, 1, 0],
              },
            },
            lastDay: {
              $sum: {
                $cond: [{ $gt: ['$lastActive', oneDayTs] }, 1, 0],
              },
            },
            all: { $sum: 1 },
          },
        },
        {
          $group: {
            _id: null,
            weekly: { $sum: '$lastWeek' },
            monthly: { $sum: '$lastMonth' },
            daily: { $sum: '$lastDay' },
            total: { $sum: '$all' },
          },
        },
      ]);
      const dashboardData = {
        topCountriesByUser,
        devicesCount,
        genderCount,
        topActiveUsers,
        userActiveStatus: userActiveStatus[0],
      };

      resolve(dashboardData);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};
module.exports = { getFromMongoDB, userCreated };
