// GitHubAuth.test.ts

import { GitHubAuth } from './github';

describe('GitHubAuth', () => {
  const clientId = 'your-client-id';
  const clientSecret = 'your-client-secret';
  const redirectUri = 'http://localhost/callback'; // Replace with your actual redirect URI

  let githubAuth: GitHubAuth;

  beforeEach(() => {
    githubAuth = GitHubAuth.getInstance(clientId, clientSecret, redirectUri);
  });

  describe('getAuthorizationUrl', () => {
    it('should return a valid authorization URL', () => {
      const authorizationUrl = githubAuth.getAuthorizationUrl();
      expect(authorizationUrl).toContain('github.com/login/oauth/authorize');
      expect(authorizationUrl).toContain(`client_id=${clientId}`);
      expect(authorizationUrl).toContain(`redirect_uri=${encodeURIComponent(redirectUri)}`);
    });
  });

  describe('getAccessToken', () => {
    it('should fetch an access token', async () => {
      jest.spyOn(githubAuth['axiosInstance'], 'post').mockResolvedValueOnce({
        data: { access_token: 'mock-access-token' },
      } as any);

      const code = 'mock-code';
      const accessToken = await githubAuth.getAccessToken(code);

      expect(accessToken).toEqual('mock-access-token');
    });
  });

  describe('getUserInfo', () => {
    it('should fetch user info with a valid access token', async () => {
      const mockAccessToken = 'mock-access-token';

      jest.spyOn(githubAuth['axiosInstance'], 'get').mockResolvedValueOnce({
        data: { login: 'mock-username', id: 123456 },
      } as any);

      const userInfo = await githubAuth.getUserInfo(mockAccessToken);

      expect(userInfo.login).toEqual('mock-username');
      expect(userInfo.id).toEqual(123456);
    });
  });
});
