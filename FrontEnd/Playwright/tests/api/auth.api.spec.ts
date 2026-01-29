import { test, expect } from '@playwright/test';
import { AuthApi } from 'Playwright/api/AuthApi';
import { UserApi } from 'Playwright/api/UserApi';
import { EventApi } from 'Playwright/api/EventApi';
import { newUser, validUser } from 'Playwright/mockData/UserData';
import { User } from 'Playwright/models/User';
import { createUser, deleteUser } from 'Playwright/helper/auth.helper';


 let email: string;
 let userId : string;
 let authToken: string;

let authApi: AuthApi;
let eventApi : EventApi;
let userApi : UserApi;


let orgUser;
let regularUser;
let otherOrgUser;

test.describe('Authentication API Tests', () => {

  
  
 test.beforeEach(async ({ request }) => {
  authApi = new AuthApi(request);
  orgUser = await createUser(authApi, validUser);

});

  test.afterEach(async ({ request }) => {
    userApi = new UserApi(request);
  /* if (!userId || !authToken) {
      console.log("Skipping delete - missing userId or authToken");
         console.log("userId:", userId);
      return;
    }*/
    await deleteUser(userApi,orgUser.id,orgUser.token);
    
    
  });

 
  
  
  test.describe('Positive Tests (Valid Login)', () => {
    
    test('User Marc02 should login successfully and get token', async () => {

      const response = await authApi.login(validUser.email,validUser.password,200);

      const body = await response.json();
      //Assert 
      expect(body).toHaveProperty('token');
    });

  });

  test.describe('Negative Tests (Invalid Login)', () => {
    
    test('Should return 401 for wrong password', async () => {
      
      const response = await authApi.login(
       validUser.email,
        'wrongpassword',
        401  
      );

      const body = await response.json();
      expect(body).toHaveProperty('error');
      expect(body.error).toContain('Invalid credentials');
    });

    test('Should return 401 for non-existent user', async () => {
      
      const response = await authApi.login(
        'nonexistent@gmail.com',
        'anypassword',
        401
      );

      const body = await response.json();
      expect(body).toHaveProperty('error');
      
    });

    test('Should return 400 for empty email', async () => {
      
      const response = await authApi.login(
        email ,  // Empty email
        'password123',
        422  // Bad request
      );

      const body = await response.json();
      expect(body).toHaveProperty('errors');
    });

    test('Should return 400 for empty password', async () => {
      const response = await authApi.login(
        'test@test.com',
        null,  // Empty password
        422
      );

      const body = await response.json();
      expect(body).toHaveProperty('errors');
    });

  });

  // -----------------------------
  // Positive Register Test
  // -----------------------------
  test('Should register a new user successfully', async ({request}) => {
    const userApi = new UserApi(request);
    const response = await authApi.register(newUser);

    expect(response.status()).toBe(200);

    const body = await response.json();                                                                                                                           
    
    expect(body).toHaveProperty('user');
    expect(body.user).toHaveProperty('id');
    
          
    const loginResponse = await authApi.login(
      newUser.email,
      newUser.password,
      200
    );
    const loginBody = await loginResponse.json();
    console.log(loginBody.token);
    const deleteToken = loginBody.token;
    
    await userApi.deleteUser(loginBody.user.id, deleteToken);
  });

  // -----------------------------
  // Negative Register Tests
  // -----------------------------

  test('Should fail when email already exists', async ({ request }) => {
    const authApi = new AuthApi(request);
    const event = new User({ ...validUser.payload });
    const response = await authApi.register({
     ... event.payload
    });

    expect(response.status()).toBe(409);

   
    
  });

  test('Should fail when password confirmation does not match', async () => {
    const newUserWithInvalidPassword = new User({ ...newUser.payload });
    newUserWithInvalidPassword.update({ password_confirmation: "wrong" });
    
    console.log(newUserWithInvalidPassword, "Before")
    const response = await authApi.register(newUserWithInvalidPassword.payload);
    const body = await response.json();
    console.log(body , "After");
    expect(response.status()).toBe(422);

    
    expect(body).toHaveProperty('errors');
  });

  test('Should fail when required fields are missing', async () => {
    const response = await authApi.register({
      id : null,
      name : "",
      username: '',
      email: '',
      num_tel: '',
      type_utilisateur: '',
      password: '',
      password_confirmation: ''
    });

    expect(response.status()).toBe(422);

    const body = await response.json();
    expect(body).toHaveProperty('errors');
  });

});