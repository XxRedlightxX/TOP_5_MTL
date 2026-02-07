import { AuthApi } from "Playwright/api/AuthApi";
import { UserApi } from "Playwright/api/UserApi";
import { User } from "Playwright/models/User";
import { test, expect } from '@playwright/test';

export async function createUser(authApi: AuthApi, userData : User) {
  const res = await authApi.register(userData);
  if (!res.ok()) {
    const errorBody = await res.text();
    console.error(`API Error ${res.status()}: ${errorBody}`);
  }
  expect(res.ok()).toBeTruthy();
  const body = await res.json();
  console.log(body, "user created");
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