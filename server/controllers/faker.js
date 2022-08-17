const {
  insertFakeUserToMongoDB,
  cleanUpDB,
} = require('../services/fake-user-service');

module.exports = {
  generateFakeUser: async (req, res) => {
    // Guess a small number if request body is empty
    const requestedFakeUserCount = req.body.userCount
      ? req.body.userCount
      : 1000;

    try {
      const response = await insertFakeUserToMongoDB(requestedFakeUserCount);
      return res.json(response);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  },

  clearDatabase: async (req, res) => {
    try {
      const response = await cleanUpDB();
      res.json(response);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  },
};
