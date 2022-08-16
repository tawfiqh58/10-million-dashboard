const { addNewUser,deleteUserFromDB,deleteManyUserFromDB } = require('../services/user-service');

module.exports = {
  createUser: async (req, res) => {
    try {
      const response = await addNewUser(req.body);
      return res.status(200).json(response);
    } catch (e) {
      res.status(500).json(e.res);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const response = await deleteUserFromDB(req.params.id);
      return res.status(200).json(response);
    } catch (e) {
      res.status(500).json(e.res);
    }
  },
  deleteMany: async (req, res) => {
    try {
      const response = await deleteManyUserFromDB(req.body.ids);
      return res.status(200).json(response);
    } catch (e) {
      res.status(500).json(e.res);
    }
  },
};
