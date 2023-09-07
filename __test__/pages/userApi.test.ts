// import mongoose from 'mongoose';
// import { deleteUsers } from '@/lib/userApi';
// import dbConnect from '@/lib/dbConnect';

// beforeAll(async () => {
//   await dbConnect();
// });

// afterEach(async () => {
//   // await deleteUsers();
// });

// afterAll(async () => {
//   // await mongoose.disconnect();
// });

// const baseUrl = 'http://localhost:3000'; // Replace with your app's base URL

// describe('User CRUD API Integration Tests', () => {
//   it('should create a new user', async () => {
//     // const response = await fetch(`${baseUrl}/api/user-signup`, {
//     //   method: 'POST',
//     //   headers: {
//     //     'Content-Type': 'application/json',
//     //   },
//     //   body: JSON.stringify({
//     //     firstName: 'John',
//     //     lastName: 'Doe',
//     //     email: 'john@example.com',
//     //     password: 'password123',
//     //   }),
//     // });
//     // expect(response.status).toBe(201);
//     // const user = await response.json();
//     // expect(user).toHaveProperty('_id');
//   });

//   // it('should return 400 if email is already taken', async () => {
//   //   // Create a user with the same email first
//   //   await fetch(`${baseUrl}/api/users`, {
//   //     method: 'POST',
//   //     headers: {
//   //       'Content-Type': 'application/json',
//   //     },
//   //     body: JSON.stringify({
//   //       firstName: 'John',
//   //       lastName: 'Doe',
//   //       email: 'john@example.com',
//   //       password: 'password123',
//   //     }),
//   //   });

//   //   // Try to create another user with the same email
//   //   const response = await fetch(`${baseUrl}/api/users`, {
//   //     method: 'POST',
//   //     headers: {
//   //       'Content-Type': 'application/json',
//   //     },
//   //     body: JSON.stringify({
//   //       firstName: 'Jane',
//   //       lastName: 'Smith',
//   //       email: 'john@example.com',
//   //       password: 'anotherpassword',
//   //     }),
//   //   });

//   //   expect(response.status).toBe(400);
//   //   const errorMessage = await response.json();
//   //   expect(errorMessage).toHaveProperty('message', 'Email is already taken');
//   // });

//   // it('should find a user by email', async () => {
//   //   // Create a user first
//   //   await fetch(`${baseUrl}/api/users`, {
//   //     method: 'POST',
//   //     headers: {
//   //       'Content-Type': 'application/json',
//   //     },
//   //     body: JSON.stringify({
//   //       firstName: 'John',
//   //       lastName: 'Doe',
//   //       email: 'john@example.com',
//   //       password: 'password123',
//   //     }),
//   //   });

//   //   const response = await fetch(`${baseUrl}/api/users/john@example.com`, {
//   //     method: 'GET',
//   //   });

//   //   expect(response.status).toBe(200);
//   //   const user = await response.json();
//   //   expect(user).toHaveProperty('email', 'john@example.com');
//   // });

//   // it('should delete a user by email', async () => {
//   //   // Create a user first
//   //   await fetch(`${baseUrl}/api/users`, {
//   //     method: 'POST',
//   //     headers: {
//   //       'Content-Type': 'application/json',
//   //     },
//   //     body: JSON.stringify({
//   //       firstName: 'John',
//   //       lastName: 'Doe',
//   //       email: 'john@example.com',
//   //       password: 'password123',
//   //     }),
//   //   });

//   //   const response = await fetch(`${baseUrl}/api/users/john@example.com`, {
//   //     method: 'DELETE',
//   //   });

//   //   expect(response.status).toBe(204);

//   //   // Check if the user is deleted from the database
//   //   const user = await User.findOne({ email: 'john@example.com' });
//   //   expect(user).toBeNull();
//   // });
// });
