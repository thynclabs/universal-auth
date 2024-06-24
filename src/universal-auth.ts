import * as dotenv from 'dotenv';

dotenv.config();

abstract class UniversalAuth {
  protected clientId: string;
  protected clientSecret: string;
  protected redirectUri: string;

  constructor(clientId: string, clientSecret: string, redirectUri: string) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.redirectUri = redirectUri;
  }

  abstract getAuthorizationUrl(): string;
  abstract getAccessToken(code: string): Promise<string>;
  abstract getUserInfo(accessToken: string): Promise<any>;
}

export default UniversalAuth;
