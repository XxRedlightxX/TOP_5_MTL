// api/BaseApi.ts
import { APIRequestContext, expect } from '@playwright/test';


/**
 * BaseApi provides generic HTTP methods for interacting with REST APIs.
 * All methods automatically include JSON headers and optional authentication.
 */
export class BaseApi {

  protected request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  /**
   * Sends a GET request to the specified URL.
   * @param url - The endpoint URL.
   * @returns A Promise resolving to the API response.
   */
  async get(url: string) {
    const response = await this.request.get(url);
    expect(response.ok()).toBeTruthy();
    return response;
  }


   /**
   * Sends a generic POST request with optional authentication and expected status check.
   * @param url - The endpoint URL.
   * @param body - The request payload to send.
   * @param options - Optional settings.
   *   - pExpectedStatus: Expected HTTP status code (asserted if provided).
   *   - pToken: Optional Bearer token for Authorization header.
   * @returns A Promise resolving to the API response.
   */
  async post(
    url: string, 
    body: any, 
    options: { pExpectedStatus?: number, pToken? :string } = {}
  ) 
  {

    const { pExpectedStatus,  pToken } = options;
   
    const response = await this.request.post(url, { 
      data: body,
     headers:  pToken ? {
      'Authorization': `Bearer ${ pToken}`,
      'Accept': 'application/json',
     
    } : {
      'Accept': 'application/json',
    }
    });
    

    if (pExpectedStatus !== undefined) {
      expect(response.status()).toBe(pExpectedStatus);
      console.log(response.json())
    }
   
    return response;
  }


  /**
   * Sends a DELETE request with optional authentication.
   * Logs an error if the response is not OK.
   * @param url - The endpoint URL.
   * @param token - Optional Bearer token for Authorization header.
   * @returns A Promise resolving to the API response.
   */
  async delete(url: string, token?: string) {
    const response = await this.request.delete(url, {
      headers: token ? {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      } : {
        'Accept': 'application/json'
      }
    });

    /*if (!response.ok()) {
        console.error(`Delete failed at ${url} with status: ${response.status()}`);
        console.error(`Response Body: ${await response.text()}`);
    }*/
    return response;
  }

  /**
   * Sends a POST request used for modifying resources.
   * Logs an error if the response is not OK.
   * @param url - The endpoint URL.
   * @param token - Optional Bearer token for Authorization header.
   * @returns A Promise resolving to the API response.
   */
  async modify(url: string, token?: string) {
      const response = await this.request.post(url, {
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
      return response;
  }

  /**
   * Sends a PUT request with optional authentication.
   * Logs an error if the response is not OK.
   * @param url - The endpoint URL.
   * @param body - The payload to send.
   * @param token - Optional Bearer token for Authorization header.
   * @returns A Promise resolving to the API response.
   */
  async put(url: string,body: any, token?: string, ) {
    const response = await this.request.put(url, {
      data: body,
      headers: token ? {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      } : {
        'Accept': 'application/json'
      }
    });
      /*if (!response.ok()) {
        console.error(`Delete failed at ${url} with status: ${response.status()}`);
        console.error(`Response Body: ${await response.text()}`);
    }*/
    return response;
  }

}
