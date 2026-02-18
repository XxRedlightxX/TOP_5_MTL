import { AuthApi } from "Playwright/api/AuthApi";
import { UserApi } from "Playwright/api/UserApi";
import { User } from "Playwright/models/User";
import {  expect } from '@playwright/test';


/**
 * Creates a new user via the Auth API.
 *
 * @param {AuthApi} authApi - An instance of the AuthApi to make the registration request.
 * @param {User} userData - The user data object containing all required registration fields.
 * @returns {Promise<{id: string, token: string, username: string, email: string, role: string}>} 
 * An object containing the user's ID, auth token, username, email, and role.
 */
export async function createUser(authApi: AuthApi, userData : User) {
  const res = await authApi.register(userData);
  if (!res.ok()) {
    const errorBody = await res.text();
    console.error(`API Error ${res.status()}: ${errorBody}`);
  }
  expect(res.ok()).toBeTruthy();
  const body = await res.json();
  return {
    id: body.user.id,
    token: body.token,
    username: body.user.username,
    email: body.user.email,
    role: body.user.type_utilisateur
  };
}

/**
 * Deletes an existing user via the User API.
 *
 * @param {UserApi} userApi - An instance of the UserApi to perform deletion.
 * @param {string} userId - The unique ID of the user to delete.
 * @param {string} token - The authentication token for performing the delete request.
 * @returns {Promise<void>} Resolves when deletion is successful.
 */
export async function deleteUser(userApi: UserApi, userId: string, token: string) {
  const res = await userApi.deleteUser(userId, token);
  expect(res.ok()).toBeTruthy();
}