const { User } = require('../models/User');
const { userCreated } = require('./update-event-service');

async function createUser(data) {
  return new Promise(async (resolve, reject) => {
    try {
      // Create new user
      const usr = new User(data);
      await usr.save();

      // Fire update dashboard event
      userCreated();

      // User created successfully!
      return resolve({
        success: true,
        message: 'User has been created successfully.',
      });
    } catch (e) {
      reject({
        res: {
          success: false,
          message: 'Internal server error!',
        },
      });
    }
  });
}

async function checkUsername(username) {
  return new Promise(async (resolve, reject) => {
    try {
      // Check if username already exist
      const result = await User.findOne({ username: username });

      if (result) {
        // username already exist!
        return resolve(true);
      }

      // username not exist
      return resolve(false);
    } catch (e) {
      reject({
        res: {
          success: false,
          message: 'Internal server error!',
        },
      });
    }
  });
}

async function addNewUser(data) {
  // First need to check if data contain username
  // because username is required and uniq
  if (!data.username) {
    return {
      res: {
        success: false,
        message: 'Invalid request. username is required!',
      },
    };
  }

  try {
    // Check if username already exist
    const usernameExist = await checkUsername(data.username);

    if (usernameExist) {
      // username already exist!
      return { success: false, nameExist: true };
    }

    // Create new user
    const response = await createUser(data);
    return response;
  } catch (e) {
    reject({
      res: {
        success: false,
        message: 'Internal server error!',
      },
    });
  }
}

module.exports = { addNewUser };
