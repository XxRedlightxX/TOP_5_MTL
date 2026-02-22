import { test, expect } from '@playwright/test';
import { AuthApi } from 'Playwright/api/AuthApi';
import { UserApi } from 'Playwright/api/UserApi';
import { EventApi } from 'Playwright/api/EventApi';
import { newUser, validOtherOrgUser, validUser } from 'Playwright/mockData/UserData';
import { User } from 'Playwright/models/User';
import { createUser, deleteUser } from 'Playwright/helper/auth.helper';
import { HttpStatus } from 'Playwright/helper/api/statusCodes';

let email: string;
let authApi: AuthApi;
let userApi: UserApi;

let otherUserOrg: any;
let orgUser: any;
let currentUserData: any;

test.describe('Authentication API Tests', () => {

  test.describe.configure({ mode: 'serial' });

  // -----------------------------
  // Setup and Teardown
  // -----------------------------
  test.beforeEach(async ({ request }) => {
    authApi = new AuthApi(request);
    const id = `${Date.now()}_${test.info().workerIndex}_${crypto.randomUUID()}`;
        
    currentUserData = {
      ...validUser,
      email: `test_${Date.now()}_${Math.floor(Math.random() * 1000)}${id}@example.com`,
      username: `${id}${validUser.username}_${Math.floor(Math.random() * 1000)}`
    };

    // Register two users via API
    orgUser = await createUser(authApi, currentUserData as User);
    otherUserOrg = await createUser(authApi, validOtherOrgUser);
  });

  test.afterEach(async ({ request }) => {
    userApi = new UserApi(request);

    // Clean up created users
    await deleteUser(userApi, orgUser.id, orgUser.token);
    await deleteUser(userApi, otherUserOrg.id, otherUserOrg.token);
  });

  // -----------------------------
  // Positive Login Tests
  // -----------------------------
  test.describe('Positive Tests (Valid Login)', () => {
    test('Scenario: User logs in successfully with valid credentials', async () => {
      // Given: a registered user
      // When: the user logs in with correct email and password
      const response = await authApi.login(currentUserData.email, currentUserData.password, 200);

      // Then: the response should contain a valid token
      const body = await response.json();
      expect(response.status()).toBe(HttpStatus.OK);
      expect(body).toHaveProperty('token');
      
    });
  });

  // -----------------------------
  // Negative Login Tests
  // -----------------------------
  test.describe('Negative Tests (Invalid Login)', () => {
    test('Scenario: Login fails with wrong password', async () => {
      // Given: a registered user
      // When: the user logs in with a wrong password
      const response = await authApi.login(orgUser.email, 'wrongpassword', HttpStatus.UNAUTHORIZED);

      // Then: the API should return an error for invalid credentials and 401 Unauthorized
      const body = await response.json();
      expect(body).toHaveProperty('error');
      expect(body.error).toContain('Invalid credentials');
    });

    test('Scenario: Login fails for non-existent user', async () => {
      // Given: a non-existent user email
      // When: a login attempt is made
      const response = await authApi.login('nonexistent@gmail.com', 'anypassword', HttpStatus.UNAUTHORIZED);

      // Then: the API should return an error
      const body = await response.json();
      expect(body).toHaveProperty('error');
    });

    test('Scenario: Login fails with empty email', async () => {
      // Given: a user provides empty email
      // When: a login attempt is made
      const response = await authApi.login(email, 'password123', HttpStatus.UNPROCESSABLE_ENTITY);

      // Then: the API should return validation errors
      const body = await response.json();
      expect(body).toHaveProperty('errors');
    });

    test('Scenario: Login fails with empty password', async () => {
      // Given: a user provides empty password
      // When: a login attempt is made
      const response = await authApi.login('test@test.com', null, HttpStatus.UNPROCESSABLE_ENTITY);

      // Then: the API should return validation errors
      const body = await response.json();
      expect(body).toHaveProperty('errors');
    });
  });

  // -----------------------------
  // Positive Register Test
  // -----------------------------
  test('Scenario: User registers successfully', async ({ request }) => {
    const userApi = new UserApi(request);

    // Given: a new user payload
    // When: the user registers via the API
    const response = await authApi.register(newUser);

    // Then: the response should be successful and contain user data
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('user');
    expect(body.user).toHaveProperty('id');

    // And: the user can log in immediately after registration
    const loginResponse = await authApi.login(newUser.email, newUser.password, HttpStatus.OK);
    const loginBody = await loginResponse.json();

    // Cleanup: delete the registered user
    await userApi.deleteUser(loginBody.user.id, loginBody.token);
  });

  // -----------------------------
  // Negative Register Tests
  // -----------------------------
  test('Scenario: Registration fails when email already exists', async ({ request }) => {
    const authApi = new AuthApi(request);
    const user = new User({ ...validOtherOrgUser.payload });

    // Given: a user with an existing email
    // When: registration is attempted with the same email
    const response = await authApi.register({ ...user.payload });

    // Then: the API should return a conflict status
    expect(response.status()).toBe(HttpStatus.CONFLICT);
  });

  test('Scenario: Registration fails when password confirmation does not match', async () => {
    const newUserWithInvalidPassword = new User({ ...newUser.payload });
    newUserWithInvalidPassword.update({ password_confirmation: "wrong" });

    // Given: a new user with mismatched password confirmation
    // When: registration is attempted
    const response = await authApi.register(newUserWithInvalidPassword.payload);
    const body = await response.json();

    // Then: the API should return validation errors
    expect(response.status()).toBe(HttpStatus.UNPROCESSABLE_ENTITY);
    expect(body).toHaveProperty('errors');
  });

  test('Scenario: Registration fails when required fields are missing', async () => {
    // Given: a payload with all required fields missing
    const response = await authApi.register({
      id: null,
      name: "",
      username: '',
      email: '',
      num_tel: '',
      type_utilisateur: '',
      password: '',
      password_confirmation: ''
    });

    // Then: the API should return validation errors
    expect(response.status()).toBe(HttpStatus.UNPROCESSABLE_ENTITY);
    const body = await response.json();
    expect(body).toHaveProperty('errors');
  });
});
