import { AuthApi } from "Playwright/api/AuthApi";
import { UserApi } from "Playwright/api/UserApi";
import { User } from "Playwright/models/User";
import { test, expect } from '@playwright/test';

export async function createUser(authApi: AuthApi, userData : User) {
  const res = await authApi.register(userData);
  expect(res.ok()).toBeTruthy();
  const body = await res.json();

  return {
    id: body.user.id,
    token: body.token,
    role: body.user.type_utilisateur
  };
}


export async function deleteUser(userApi: UserApi, userId: string, token: string) {
  const res = await userApi.deleteUser(userId, token);
  expect(res.ok()).toBeTruthy();
}