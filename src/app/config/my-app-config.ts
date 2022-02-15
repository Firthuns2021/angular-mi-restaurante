export default {
  oidc: {
    clientId: '0oa2321mmdJPqfCDi5d7', // clientID de Okta
    issuer: 'https://dev-78030815.okta.com/oauth2/default', // Okta domain
    redirectUri: 'http://localhost:4200/login/callback',
    scopes: ['openid', 'profile', 'email']
  }
};
