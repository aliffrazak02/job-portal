import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

// Set required env vars for tests (no .env file is loaded in the test runner)
process.env.JWT_SECRET = 'test-secret-key-for-vitest';
process.env.JWT_EXPIRES_IN = '1h';

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});
