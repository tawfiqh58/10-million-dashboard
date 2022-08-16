const { addNewUser } = require('../service/user-service');

module.exports = {
  createUser: async (req, res) => {
    try {
      const response = await addNewUser(req.body);
      return res.status(200).json(response);
    } catch (e) {
      res.status(500).json(e.res);
    }
  },
};
