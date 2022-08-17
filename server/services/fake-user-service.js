const { faker } = require('@faker-js/faker');
const { User } = require('../models/User');
const redisDB = require('../utils/redis-client');
const { userCreated } = require('./update-event-service');

// Device variations of users
const DEVICES = ['Desktop', 'Mobile', 'Tablet'];

const TEN_MILLION_USER = 1000000;

// A small chuck of fake user
const SMALL_CHUNK = 10000;

// This method will generate a chunk of fake user
// depending on the total db user count and given
// fake user count
function _generateFakeUser(currentDBUserCount, fakeUserCount) {
  const fakeUserArray = [];
  const now = Date.now();

  // Serial Number is used for safety because
  // User name must be uniq other wise mongodb will give error
  let dummySerialNo = currentDBUserCount;

  for (let i = 0; i < fakeUserCount; i++) {
    dummySerialNo++;

    const fn = faker.name.fullName();
    // generate uniq fake email
    const email =
      fn.replace(/ /g, '').toLowerCase() + dummySerialNo + '@gmail.com';
    // generate uniq fake username
    const username = fn.split(' ')[0].toLowerCase() + '_' + dummySerialNo;

    fakeUserArray.push({
      fullName: fn,
      username: username,
      password: faker.random.alpha(10),
      email: email,
      country: faker.address.country(),
      gender: faker.name.gender(true),
      device: DEVICES[Math.floor(Math.random() * (3 - 0))],
      lastActive: now - Math.floor(Math.random() * 1000),
      totalActive: Math.floor(Math.random() * 1000000),
    });
  }

  return fakeUserArray;
}

// Bulk fake user insertion method
async function _bulkUserInsertion(dbUserCount, requestedFakeUserCount) {
  return new Promise(async (resolve, reject) => {
    console.log(
      'dbUserCount',
      dbUserCount,
      'requestedFakeUserCount',
      requestedFakeUserCount
    );
    // Split user count to smaller chunk
    const chunkCount = ~~(requestedFakeUserCount / SMALL_CHUNK);
    const extra = requestedFakeUserCount % SMALL_CHUNK;
    console.log('chunks = ', chunkCount, 'extra = ', extra);

    // Keep track of total db user count
    let totalInsertedUserCount = dbUserCount;
    console.log('total chunk', chunkCount);

    try {
      for (let i = 0; i < chunkCount; i++) {
        console.log('chunk', i);
        await User.insertMany(
          _generateFakeUser(totalInsertedUserCount, SMALL_CHUNK)
        );
        totalInsertedUserCount = totalInsertedUserCount + SMALL_CHUNK;
      }
      console.log('chunk', 'completed');
    } catch (e) {
      console.log(e);
      return reject(e);
    }

    // Insert extras
    try {
      await User.insertMany(_generateFakeUser(totalInsertedUserCount, extra));
      return resolve({
        success: true,
        message: 'Successfully inserted fake users!',
      });
    } catch (e) {
      console.log(e);
      return reject(e);
    }
  });
}

// When the count is a big number > SMALL_CHUNK
// this method will send response back before user insertion
// with pending message
async function insertFakeUserToMongoDB(requestedCount) {
  return new Promise(async (resolve, reject) => {
    // First check current database user count
    const currentDBUserCount = await User.countDocuments();

    // If user count exceed 10M then
    // don't allow fake user insertion
    if (currentDBUserCount > TEN_MILLION_USER) {
      return resolve({ message: 'Database already has 10 million user.' });
    }

    if (requestedCount <= SMALL_CHUNK) {
      // NOTE: We are not considering if DB already has <10M user
      // and we get request to add fake user count < SMALL_AMOUNT_FAKE_USER
      // it's ok.

      try {
        const result = await User.insertMany(
          _generateFakeUser(currentDBUserCount, requestedCount)
        );

        // Update dashboard status
        userCreated();

        return resolve({ message: 'Fake user created successfully!' });
      } catch (e) {
        console.log(e);
        return reject(e);
      }
    } else {
      try {
        // Don't let anyone creating unbounded fake user
        // fake user count should be less than or equal 10M.
        const userCreationCount =
          requestedCount <= TEN_MILLION_USER
            ? requestedCount
            : TEN_MILLION_USER;

        // Can't add 10M user at a time so create a async loop
        // remember it will take times to fake user if requestedCount is
        // higher than 'SMALL_AMOUNT_FAKE_USER'

        // This may take time to finish insertion
        _bulkUserInsertion(currentDBUserCount, userCreationCount).then(
          (err, status) => {
            // Ignore error and re-order whatever the DB has.

            // Update dashboard status
            userCreated();
          }
        );

        return resolve({
          message:
            'Your request is accepted. Wait for a moment to complete the process.',
        });
      } catch (e) {
        console.log(e);
        return reject(e);
      }
    }
  });
}

async function cleanUpDB() {
  return new Promise(async (resolve, reject) => {
    try {
      // Clean up mongodb
      const result = await User.deleteMany({});

      // Clean up redis
      await redisDB.Client.set('dashboard', '');

      // Broadcast database status
      global.io.emit('dashboard', { success: true, data: {} });

      return resolve({ success: true, message: 'Database cleaned!' });
    } catch (e) {
      console.log(e);
      return reject(e);
    }
  });
}

module.exports = { insertFakeUserToMongoDB, cleanUpDB, TEN_MILLION_USER };
