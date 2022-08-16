const { User } = require('../models/User');
const { userCreated, userDeleted } = require('./update-event-service');
const {
  deleteFromRedis,
  removeManyFromRedis,
} = require('./redis-state-change');
const ObjectId = require('mongodb').ObjectId;

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
        // 'username' already exist.
        return resolve(true);
      }

      // 'username' not exist.
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

async function deleteUserFromDB(id) {
  if (!id) {
    return {
      res: {
        success: false,
        message: 'Invalid request. user id is required!',
      },
    };
  }
  try {
    const res = await User.findByIdAndDelete(id);
    if (!res) {
      // failed to delete the user
      return { success: false };
    }

    // Update redis state for instant change
    deleteFromRedis(id);

    // Re-order database state
    userDeleted();

    // user deleted successfully
    return { success: true };
  } catch (e) {
    return {
      res: {
        success: false,
        message: 'Internal server error!',
      },
    };
  }
}

async function deleteManyUserFromDB(ids) {
  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return {
      res: {
        success: false,
        message: 'Invalid request. user id is required!',
      },
    };
  }
  try {
    const objectIds = ids.map((val) => ObjectId(val));
    const res = await User.deleteMany({ _id: { $in: objectIds } });
    if (!res.ok) {
      // failed to delete users
      return { success: false };
    }
    
    // Update redis state for instant change
    removeManyFromRedis(ids);

    // Re-order database state
    userDeleted();

    // users deleted successfully
    return { success: true };
  } catch (e) {
    return {
      res: {
        success: false,
        message: 'Internal server error!',
      },
    };
  }
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

module.exports = { addNewUser, deleteUserFromDB, deleteManyUserFromDB };
