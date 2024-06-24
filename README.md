# Universal Auth Package

Universal Auth is a TypeScript package that provides OAuth authentication integration for GitHub. It aims to simplify the process of implementing OAuth authentication in TypeScript projects.

## Features

- **GitHub Authentication:** Authenticate users using GitHub OAuth.
- **Singleton Pattern:** Uses a singleton pattern to ensure a single instance across the application.

## Installation

You can install the package via npm (or yarn):

```bash
npm install @thynclabs/universal-auth
# or
yarn add @thynclabs/universal-auth
```

## Usage
### Initialize GitHub Authentication
To use GitHub OAuth authentication, import the GitHubAuth class from universal-auth:

```typescript
import { GitHubAuth } from '@thynclabs/universal-auth';

const clientId = 'your-github-client-id';
const clientSecret = 'your-github-client-secret';
const redirectUri = 'http://localhost/callback'; // Replace with your actual redirect URI

const githubAuth = GitHubAuth.getInstance(clientId, clientSecret, redirectUri);

// Get authorization URL
const authorizationUrl = githubAuth.getAuthorizationUrl();
console.log('Authorization URL:', authorizationUrl);

// Redirect users to authorizationUrl to initiate GitHub OAuth flow
```

### Handle Callback
After the user authorizes your application, GitHub will redirect them back to your redirectUri with a code parameter. Use this code to fetch the access token:

```typescript
// Assuming 'code' is obtained from query parameters
const code = 'code-from-github'; // Replace with actual code

// Get access token
const accessToken = await githubAuth.getAccessToken(code);
console.log('Access Token:', accessToken);

// Use the access token to fetch user information
const userInfo = await githubAuth.getUserInfo(accessToken);
console.log('User Info:', userInfo);
```

## Configuration
### GitHub Configuration
You need to register your application on GitHub to obtain clientId and clientSecret. Follow these steps:
- Go to GitHub Developer Settings.
- Create a new OAuth application.
- Obtain clientId and clientSecret.
- Set redirectUri to your application's callback URL.

## Contributing
Contributions are welcome! If you encounter any issues or have suggestions for improvements, please open an issue on GitHub. To contribute code, fork the repository and submit a pull request.

## Credits
Universal Auth is maintained by Thync Labs. Special thanks to contributors for their valuable input and contributions.
