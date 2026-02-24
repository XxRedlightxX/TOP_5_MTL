import { test, expect } from '@playwright/test';
import { AuthApi } from 'Playwright/api/AuthApi';
import { UserApi } from 'Playwright/api/UserApi';
import { EventApi } from 'Playwright/api/EventApi';
import { validUser, validUserWithRegularRole, validOtherOrgUser } from 'Playwright/mockData/UserData';
import { createUser, deleteUser } from 'Playwright/helper/auth.helper';
import { User } from 'Playwright/models/User';

let authApi: AuthApi;
let userApi: UserApi;
let eventApi: EventApi;

let orgUser: any;
let regularUser: any;
let otherOrgUser: any;

test.describe('User Creation API Tests', () => {

test.describe.configure({ mode: 'serial' });

  // -----------------------------
  // Setup and Teardown
  // -----------------------------
  test.beforeEach(async ({ request }) => {
    authApi = new AuthApi(request);
    userApi = new UserApi(request);
    eventApi = new EventApi(request);

    
    // Create test users
    orgUser = await createUser(authApi, validUser);
    otherOrgUser = await createUser(authApi, validOtherOrgUser);
    regularUser = await createUser(authApi, validUserWithRegularRole);
  });

  test.afterEach(async ({ request }) => {
    userApi = new UserApi(request);

    const usersToDelete = [orgUser, regularUser, otherOrgUser].filter(Boolean);

    await Promise.all(
      usersToDelete.map(u =>
        deleteUser(userApi, u.id, u.token).catch(err => console.warn("Cleanup failed for", u.id, err))
      )
    );
  });

  // -----------------------------
  // User Modification Tests
  // -----------------------------

  test('Scenario: Unauthenticated user cannot modify a user', async () => {
    // Given: a user payload with updated name
    const authUser = new User({ ...validUser.payload });
    authUser.update({ name: "Jean-Gabriel" });

    // When: sending PUT request without auth token
    const res = await userApi.modifyUser(null, authUser.payload, "");
    const body = await res.json();

    // Then: API should respond with 401 Unauthorized
    expect(body).toHaveProperty("message", "Unauthenticated.");
    expect(res.status()).toBe(401);
  });

  test('Scenario: Authenticated user modifies own profile successfully', async () => {
    // Given: an authenticated user with updated name
    const authUser = new User({ ...validUser.payload });
    authUser.update({ name: "Jean-Gabriel" });

    // When: sending PUT request with valid token
    const res = await userApi.modifyUser(orgUser.id, authUser.payload, orgUser.token);
    const body = await res.json();

    // Then: API should respond with 202 Accepted and updated name
    expect(body).toHaveProperty("name", "Jean-Gabriel");
    expect(res.status()).toBe(202);
  });

  test('Scenario: Authenticated user cannot modify another user\'s profile', async () => {
    // Given: a payload with updated name
    const authUser = new User({ ...validUser.payload });
    authUser.update({ name: "Jean-Gabriel" });

    // When: sending PUT request using a token for a different user
    const res = await userApi.modifyUser(orgUser.id, authUser.payload, regularUser.token);

    // Then: API should respond with 403 Forbidden
    expect(res.status()).toBe(403);
  });

  test('Scenario: Unauthenticated user cannot modify another user\'s profile', async () => {
    // Given: a payload with updated name
    const authUser = new User({ ...validUser.payload });
    authUser.update({ name: "Jean-Gabriel" });

    // When: sending PUT request without a token
    const res = await userApi.modifyUser(orgUser.id, authUser.payload, "");

    // Then: API should respond with 401 Unauthorized
    expect(res.status()).toBe(401);
  });

  // -----------------------------
  // User Deletion Tests
  // -----------------------------

  test('Scenario: Unauthenticated user cannot delete a user', async () => {
    // When: sending DELETE request without a token
    const res = await userApi.deleteUser(orgUser.id, "");

    // Then: API should respond with 401 Unauthorized
    expect(res.status()).toBe(401);
  });

  test('Scenario: Authenticated user deletes own account successfully', async () => {
    // When: sending DELETE request with valid token
    const res = await userApi.deleteUser(orgUser.id, orgUser.token);

    // Then: API should respond with 200 OK
    expect(res.status()).toBe(200);
  });

  test('Scenario: Authenticated user cannot delete another user\'s account', async () => {
    // When: sending DELETE request for a different user
    const res = await userApi.deleteUser(orgUser.id, regularUser.token);

    // Then: API should respond with 403 Forbidden
    expect(res.status()).toBe(403);
  });

});
