// api/AuthApi.ts
import { User, UserPayload } from 'Playwright/models/User';
import { BaseApi } from './BaseApi';

export class AuthApi extends BaseApi {

  async login(email: string, password: string,pExpectedStatus?: number) {
    return this.post('/api/login', {
      email,
      password
    }, { pExpectedStatus });
  }

  async register(payload: UserPayload | User ) {
    return this.post('/api/register', payload);
  }
}