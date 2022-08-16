const { getFromRedis } = require('../service/dashboard-service');

module.exports = {
  getDashboardData: async (req, res) => {
    try {
      const response = await getFromRedis();
      res.status(200).json(response);
    } catch (e) {
      res.status(500).json(e.res);
    }
  },
};
