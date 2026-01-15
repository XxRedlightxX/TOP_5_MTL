// api/BaseApi.ts
import { APIRequestContext, expect } from '@playwright/test';

export class BaseApi {
  protected request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async get(url: string) {
    const response = await this.request.get(url);
    expect(response.ok()).toBeTruthy();
    return response;
  }

  async post(
    url: string, 
    body: any, 
    options: { expectedStatus?: number } = {}
  ) {
    const { expectedStatus } = options;
    const response = await this.request.post(url, { 
      data: body,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (expectedStatus !== undefined) {
      expect(response.status()).toBe(expectedStatus);
    }
    
    return response;
  }

  async delete(url: string, token?: string) {
   const response = await this.request.delete(url, {
    headers: token ? {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    } : {
      'Accept': 'application/json'
    }
  });
    if (!response.ok()) {
      console.error(`Delete failed at ${url} with status: ${response.status()}`);
      console.error(`Response Body: ${await response.text()}`);
  }
  console.log(token)
  expect(response.ok()).toBeTruthy();
    return response;
  }
}
