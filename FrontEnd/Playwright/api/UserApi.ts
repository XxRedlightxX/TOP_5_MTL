// api/AuthApi.ts
import { APIResponse } from '@playwright/test';
import { BaseApi } from './BaseApi';
import { User, UserPayload } from 'Playwright/models/User';



export class UserApi extends BaseApi {

  async createUser(payload:  UserPayload) {
    return this.post('/api/register', payload);
  }

  async modifyUser(userId : string, payload:  UserPayload, token?: string) {
    return this.put(`/api/user/${userId}`, payload, token);
  }

   async deleteUser(userId: string, token: string) {
    return this.delete(`/api/user/${userId}`,  token);
  }
}