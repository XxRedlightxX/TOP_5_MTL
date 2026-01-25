// api/AuthApi.ts
import { BaseApi } from './BaseApi';
import { User } from 'Playwright/models/User';



export class UserApi extends BaseApi {

  async createUser(payload: User) {
    return this.post('/api/register', payload);
  }

   async deleteUser(userId: string, token: string) {
    return this.delete(`/api/user/${userId}`,  token);
  }
}