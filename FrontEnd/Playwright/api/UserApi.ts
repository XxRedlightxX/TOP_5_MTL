// api/AuthApi.ts
import { APIResponse } from '@playwright/test';
import { BaseApi } from './BaseApi';
import { User, UserPayload } from 'Playwright/models/User';



export class UserApi extends BaseApi {

/**
 * Registers a new user.
 * 
 * @param payload - The user data to register (username, email, password, role, etc.).
 * @returns A Promise resolving to the API response.
 */
  async createUser(payload:  UserPayload) {
    return this.post('/api/register', payload);
  }

  /**
   * Modifies an existing user.
   *
   * @param userId - The unique ID of the user to modify.
   * @param payload - The updated user data (username, email, password, role, etc.).
   * @param token - Optional authentication token for the API request.
   * @returns A Promise resolving to the API response.
  */
  async modifyUser(pUserId : string, pPayload:  UserPayload, pToken?: string) {
    return this.put(`/api/user/${pUserId}`, pPayload, pToken);
  }

   async deleteUser(pUserId: string, pToken: string) {
    return this.delete(`/api/user/${pUserId}`,  pToken);
  }
}