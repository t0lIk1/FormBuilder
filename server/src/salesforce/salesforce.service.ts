// src/salesforce/salesforce.service.ts
import { HttpException, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SalesforceService {
  private readonly CLIENT_ID = process.env.SF_CLIENT_ID;
  private readonly CLIENT_SECRET = process.env.SF_CLIENT_SECRET;
  private readonly USERNAME = process.env.SF_USERNAME;
  private readonly PASSWORD = process.env.SF_PASSWORD;

  private readonly AUTH_URL =
    'https://login.salesforce.com/services/oauth2/token';

  async getAccessToken() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const payload = new URLSearchParams({
      grant_type: 'password',
      client_id: this.CLIENT_ID,
      client_secret: this.CLIENT_SECRET,
      username: this.USERNAME,
      password: this.PASSWORD,
    });

    try {
      console.log(this.AUTH_URL);
      console.log(payload);

      const response = await axios.post(this.AUTH_URL, payload);
      console.log(response);
      return {
        accessToken: response.data.access_token,
        instanceUrl: response.data.instance_url,
      };
    } catch (error) {
      console.error(
        'Salesforce auth failed:',
        error.response?.data || error.message,
      );
      throw new HttpException('Failed to authenticate with Salesforce', 500);
    }
  }
}
