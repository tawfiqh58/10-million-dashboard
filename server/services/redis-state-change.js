const redisDB = require('../utils/redis-client');

const deleteFromRedis = async (id) => {
  try {
    const _dashboardData = await redisDB.Client.get('dashboard');
    const redisDashboard = JSON.parse(_dashboardData);

    // Remove user from redis
    const updateUserList = redisDashboard.topActiveUsers.filter(
      (data) => data._id != id
    );
    redisDashboard.topActiveUsers = updateUserList;

    // Update redis state
    await redisDB.Client.set('dashboard', JSON.stringify(redisDashboard));

    // Broadcast new changes
    global.io.emit('dashboard', { success: true, data: redisDashboard });
  } catch (e) {
    console.log(e);
  }
};

const removeManyFromRedis = async (deletedIds) => {
  try {
    const _dashboardData = await redisDB.Client.get('dashboard');
    const redisDashboard = JSON.parse(_dashboardData);

    // Remove users from redis
    const updateUserList = redisDashboard.topActiveUsers.filter(
      (data) => !deletedIds.includes(data._id)
    );
    redisDashboard.topActiveUsers = updateUserList;

    // Update redis state
    await redisDB.Client.set('dashboard', JSON.stringify(redisDashboard));

    // Broadcast new changes
    global.io.emit('dashboard', { success: true, data: redisDashboard });
  } catch (e) {
    console.log(e);
  }
};

module.exports = { deleteFromRedis, removeManyFromRedis };
