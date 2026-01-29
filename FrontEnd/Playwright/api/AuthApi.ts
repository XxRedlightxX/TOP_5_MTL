// api/AuthApi.ts
import { User, UserPayload } from 'Playwright/models/User';
import { BaseApi } from './BaseApi';

type RegisterPayload = {
  username: string;
  email: string;
  num_tel: string;
  type_utilisateur: string;
  password: string;
  password_confirmation: string;
};

export class AuthApi extends BaseApi {

  async login(email: string, password: string,expectedStatus?: number) {
    return this.post('/api/login', {
      email,
      password
    }, { expectedStatus });
  }

  async register(payload: UserPayload | User ) {
    return this.post('/api/register', payload);
  }
}