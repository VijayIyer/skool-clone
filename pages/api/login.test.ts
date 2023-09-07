import { NextApiRequest, NextApiResponse } from 'next';
import login from './login';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { Collection, Document, MongoClient } from 'mongodb';  // Import the MongoDB driver

dotenv.config({ path: '.env.local' });

let db;
let userCollection: Collection<Document>;

// Connect to the database before all tests
beforeAll(async () => {
    const client = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    db = client.db();  // Assuming you're connecting to the default database
    userCollection = db.collection('users');
});

describe('Login API Route', () => {
    // Insert a user document into the database before each test
    beforeEach(async () => {
        const hashedPassword = await bcrypt.hash('validpassword', 10);  // Hash the password before inserting
        await userCollection.insertOne({
            email: 'valid@test.com',
            password: hashedPassword,
            // ... other fields ...
        });
    });

    it('should return 401 for invalid credentials', async () => {
        const req = {
            body: {
                email: 'test@test.com',
                password: 'wrongpassword',
            },
        } as NextApiRequest;
        
        const res = {
            status: jest.fn(() => res),
            json: jest.fn(),
        } as unknown as NextApiResponse;
        
        await login(req, res);
        
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: 'Invalid credentials' });
    });

    it('should return 200 for valid credentials', async () => {
        const req = {
            body: {
                email: 'valid@test.com',
                password: 'validpassword',
            },
        } as NextApiRequest;

        const res = {
            status: jest.fn(() => res),
            json: jest.fn(),
        } as unknown as NextApiResponse;

        await login(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Logged in successfully' }));
    });
    
    // Clean up the inserted user after each test
    afterEach(async () => {
        await userCollection.deleteOne({ email: 'valid@test.com' });
    });
});



// import { NextApiRequest, NextApiResponse } from 'next';
// import login from './login';
// import compareHashPasswordWith from './login';
// import dotenv from 'dotenv';


// dotenv.config({ path: '.env.local' });


// describe('Login API Route', () => {
//   it('should return 401 for invalid credentials', async () => {
//     const req = {
//       body: {
//         email: 'test@test.com',
//         password: 'wrongpassword',
//       },
//     } as NextApiRequest;
    
//     const res = {
//       status: jest.fn(() => res),
//       json: jest.fn(),
//     } as unknown as NextApiResponse;
    
//     await login(req, res);
    
//     expect(res.status).toHaveBeenCalledWith(401);
//     expect(res.json).toHaveBeenCalledWith({ error: 'Invalid credentials' });
//   });
  
// });


