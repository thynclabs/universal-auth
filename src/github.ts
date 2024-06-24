import axios, { AxiosInstance } from 'axios';
import UniversalAuth from './universal-auth';

export class GitHubAuth extends UniversalAuth {
  private static instance: GitHubAuth;
  private authBaseUrl: string = 'https://github.com/login/oauth/authorize';
  private tokenUrl: string = 'https://github.com/login/oauth/access_token';
  private userUrl: string = 'https://api.github.com/user';
  private axiosInstance: AxiosInstance;

  private constructor(clientId: string, clientSecret: string, redirectUri: string) {
    super(clientId, clientSecret, redirectUri);
    this.axiosInstance = axios.create();
  }

  public static getInstance(clientId: string, clientSecret: string, redirectUri: string): GitHubAuth {
    if (!GitHubAuth.instance) {
      GitHubAuth.instance = new GitHubAuth(clientId, clientSecret, redirectUri);
    }
    return GitHubAuth.instance;
  }

  getAuthorizationUrl(): string {
    const encodedClientId = encodeURIComponent(this.clientId);
    const encodedRedirectUri = encodeURIComponent(this.redirectUri);
    return `${this.authBaseUrl}?client_id=${encodedClientId}&redirect_uri=${encodedRedirectUri}`;
  }

  async getAccessToken(code: string): Promise<string> {
    const response = await this.axiosInstance.post(this.tokenUrl, {
      client_id: this.clientId,
      client_secret: this.clientSecret,
      code: code,
      redirect_uri: this.redirectUri,
    }, {
      headers: { 'Accept': 'application/json' }
    });

    return response.data.access_token;
  }

  async getUserInfo(accessToken: string): Promise<any> {
    const response = await this.axiosInstance.get(this.userUrl, {
      headers: {
        'Authorization': `token ${accessToken}`,
        'Accept': 'application/json'
      }
    });

    return response.data;
  }
}
