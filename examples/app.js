const { GitHubAuth } = require('../dist');
const dotenv = require('dotenv');
dotenv.config();

// Initialize the singleton instance
const clientId = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;
const redirectUri = 'http://localhost:3000/callback';

const githubAuth = GitHubAuth.getInstance(clientId, clientSecret, redirectUri);
console.log(githubAuth.getAuthorizationUrl());

githubAuth.getAccessToken('code').then(token => console.log(token));

githubAuth.getUserInfo('access-token').then(userInfo => console.log(userInfo));
