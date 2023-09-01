const bcrypt = require('bcrypt');
import {
  generateHashPassword,
  compareHashPasswordWith,
} from '@/lib/hashPassword';
import { findUserByEmail } from '@/lib/userApi';

// Mock the userApi module and bcrypt functions
jest.mock('../../lib/userApi.ts', () => ({
  findUserByEmail: jest.fn(),
}));

// Mock the bcrypt functions
jest.mock('bcrypt', () => ({
  genSalt: jest.fn(),
  hash: jest.fn(),
  compare: jest.fn(),
}));

describe('generateHashPassword', () => {
  beforeEach(() => {
    // Reset the mock implementation and calls before each test
    bcrypt.genSalt.mockReset();
    bcrypt.hash.mockReset();
  });

  it('should generate a hashed password', async () => {
    // Mocking genSalt and hash functions
    bcrypt.genSalt.mockResolvedValue('mockedSalt');
    bcrypt.hash.mockResolvedValue('hashedPassword');

    const password = 'testPassword';
    const hashedPassword = await generateHashPassword(password);

    expect(hashedPassword).toBe('hashedPassword');
    expect(bcrypt.genSalt).toHaveBeenCalledTimes(1);
    expect(bcrypt.genSalt).toHaveBeenCalledWith();
    expect(bcrypt.hash).toHaveBeenCalledTimes(1);
    expect(bcrypt.hash).toHaveBeenCalledWith(password, 'mockedSalt');
  });

  it('should handle bcrypt error', async () => {
    // Mocking genSalt and hash functions to simulate an error
    bcrypt.genSalt.mockRejectedValue(new Error('Mocked error'));

    const password = 'testPassword';

    await expect(generateHashPassword(password)).rejects.toThrow(
      'Mocked error'
    );
    expect(bcrypt.genSalt).toHaveBeenCalledTimes(1);
    expect(bcrypt.genSalt).toHaveBeenCalledWith();
    expect(bcrypt.hash).not.toHaveBeenCalled();
  });
});

describe('compareHashPasswordWith', () => {
  beforeEach(() => {
    // Reset the mock implementations and calls before each test
    bcrypt.compare.mockReset();
    findUserByEmail.mockReset();
  });

  it('should return true if passwords match', async () => {
    // Mocking findUserByEmail and compare functions
    await findUserByEmail.mockResolvedValue([{ password: 'hashedPassword' }]);
    bcrypt.compare.mockResolvedValue(true);

    const email = 'test@example.com';
    const password = 'testPassword';

    const result = await compareHashPasswordWith(email, password);
    expect(result).toBe(true);
    expect(findUserByEmail).toHaveBeenCalledTimes(1);
    expect(findUserByEmail).toHaveBeenCalledWith(email);
    expect(bcrypt.compare).toHaveBeenCalledTimes(1);
    expect(bcrypt.compare).toHaveBeenCalledWith(password, 'hashedPassword');
  });

  it('should return false if passwords do not match', async () => {
    // Mocking findUserByEmail and compare functions
    findUserByEmail.mockResolvedValue([{ password: 'hashedPassword' }]);
    bcrypt.compare.mockResolvedValue(false);

    const email = 'test@example.com';
    const password = 'testPassword';

    const result = await compareHashPasswordWith(email, password);

    expect(result).toBe(false);
    expect(findUserByEmail).toHaveBeenCalledTimes(1);
    expect(findUserByEmail).toHaveBeenCalledWith(email);
    expect(bcrypt.compare).toHaveBeenCalledTimes(1);
    expect(bcrypt.compare).toHaveBeenCalledWith(password, 'hashedPassword');
  });
  it('should handle bcrypt error', async () => {
    // Mocking findUserByEmail and compare functions to simulate an error
    findUserByEmail.mockResolvedValue([{ password: 'hashedPassword' }]);
    bcrypt.compare.mockRejectedValue(new Error('Mocked error'));

    const email = 'test@example.com';
    const password = 'testPassword';

    await expect(compareHashPasswordWith(email, password)).rejects.toThrow(
      'Mocked error'
    );
    expect(findUserByEmail).toHaveBeenCalledTimes(1);
    expect(findUserByEmail).toHaveBeenCalledWith(email);
    expect(bcrypt.compare).toHaveBeenCalledTimes(1);
    expect(bcrypt.compare).toHaveBeenCalledWith(password, 'hashedPassword');
  });
});
