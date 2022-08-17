const { getDashboardData } = require('../services/dashboard-service');

module.exports = {
  getDashboardData: async (req, res) => {
    try {
      const response = await getDashboardData();
      res.status(200).json(response);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  },
};
