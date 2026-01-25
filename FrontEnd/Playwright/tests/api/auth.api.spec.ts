import { test, expect } from '@playwright/test';
import { AuthApi } from 'Playwright/api/AuthApi';
import { UserApi } from 'Playwright/api/UserApi';
import { newUser, validUser } from 'Playwright/mockData/UserData';

/*const VALID_USER = {
  username : "brother",
  email: 'JohnBrown@gmail.com',
  num_tel: '5142229495',
  type_utilisateur: 'organisateur',
  password: '123',
  password_confirmation: '123'

};

const ANOTHER_VALID_USER = {
  email: 'JohnBrown@gmail.com',  
  password: '123'
};

const INVALID_CREDENTIALS = {
  email: 'Marc02@gmail.com',
  password: 'wrongpassword'
};*/

 let email: string;
 let userId : string;
 let authToken: string;
// let authApi: AuthApi;

test.describe('Authentication API Tests', () => {
  
 test.beforeEach(async ({ request }) => {

  const authApi = new AuthApi(request);
  const userApi = new UserApi(request);
  const response = await authApi.register(validUser);
  const body = await response.json();
  userId = body.user.id;
  
  // Login and get token immediately
  
  const loginResponse = await authApi.login(
    validUser.email,
    validUser.password,
    200
  );
  console.log(loginResponse, "HR")
  const loginBody = await loginResponse.json();
  authToken = loginBody.token;

   console.log('Created user ID:', userId);
});

  test.afterEach(async ({ request }) => {
   if (!userId || !authToken) {
      console.log("Skipping delete - missing userId or authToken");
         console.log("userId:", userId);
      return;
    }
    const userApi = new UserApi(request);
    const test = await userApi.deleteUser(userId, authToken);
    const body = await test.json();
    console.log(body, "li");
  });

 
  
  
  test.describe('Positive Tests (Valid Login)', () => {
    
    test('User Marc02 should login successfully and get token', async ({ request }) => {
     const authApi = new AuthApi(request);
      const response = await authApi.login(
       validUser.email,
        validUser.password,
        200 
      );

      const body = await response.json();
      console.log(body);
      expect(body).toHaveProperty('token');
      
    });

  });

  test.describe('Negative Tests (Invalid Login)', () => {
    
    test('Should return 401 for wrong password', async ({ request }) => {
      const authApi = new AuthApi(request);
      const response = await authApi.login(
       validUser.email,
        'wrongpassword',
        401  
      );

      const body = await response.json();
      expect(body).toHaveProperty('error');
      expect(body.error).toContain('Invalid credentials');
    });

    test('Should return 401 for non-existent user', async ({ request }) => {
      const authApi = new AuthApi(request);
      const response = await authApi.login(
        'nonexistent@gmail.com',
        'anypassword',
        401
      );

      const body = await response.json();
      expect(body).toHaveProperty('error');
      
    });

    test('Should return 400 for empty email', async ({ request }) => {
      const authApi = new AuthApi(request);
      const response = await authApi.login(
        email ,  // Empty email
        'password123',
        422  // Bad request
      );

      const body = await response.json();
      expect(body).toHaveProperty('errors');
    });

    test('Should return 400 for empty password', async ({ request }) => {
      const authApi = new AuthApi(request);
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
  test('Should register a new user successfully', async ({ request }) => {
    const authApi = new AuthApi(request);
   
    const timestamp = Date.now();
      const randomSuffix = Math.random().toString(36).substring(7);

      const registrationUser = {
        id : null,
        username: `newuser_${timestamp}_${randomSuffix}`,
        email: `register_${timestamp}_${randomSuffix}@gmail.com`,
        num_tel: '514' + Math.floor(Math.random() * 10000000).toString().padStart(7, '0'),
        type_utilisateur: 'organisateur',
        password: '123',
        password_confirmation: '123'
      };
    const response = await authApi.register(registrationUser);

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body).toHaveProperty('user');
    expect(body.user).toHaveProperty('id');
    //expect(body.user.email).toBe(email);

    const userApi = new UserApi(request);
          // Need to login first to get token for deletion
          const loginResponse = await authApi.login(
            registrationUser.email,
            registrationUser.password,
            200
          );
          const loginBody = await loginResponse.json();
          const deleteToken = loginBody.token;
          
          await userApi.deleteUser(body.user.id, deleteToken);
  });

  // -----------------------------
  // Negative Register Tests
  // -----------------------------

  test('Should fail when email already exists', async ({ request }) => {
    const authApi = new AuthApi(request);

    const response = await authApi.register({
      id: null,
      username: 'duplicate',
      email: validUser.email, // existing user
      num_tel: '5142229495',
      type_utilisateur: 'organisateur',
      password: '123',
      password_confirmation: '123'
    });

    expect(response.status()).toBe(409);

    const body = await response.json();
    
  });

  test('Should fail when password confirmation does not match', async ({ request }) => {
    const authApi = new AuthApi(request);

    const response = await authApi.register({
      id: null,
      username: 'max67',
      email: `test_${Date.now()}@gmail.com`,
      num_tel: '5142229495',
      type_utilisateur: 'organisateur',
      password: '123',
      password_confirmation: 'wrong'
    });

    expect(response.status()).toBe(422);

    const body = await response.json();
    expect(body).toHaveProperty('errors');
  });

  test('Should fail when required fields are missing', async ({ request }) => {
    const authApi = new AuthApi(request);
    const response = await authApi.register({
      id : null,
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