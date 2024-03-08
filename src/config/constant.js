const PROD_BASE_URL = process.env.REACT_APP_PROD_BASE_URL;
const DEV_BASE_URL = process.env.REACT_APP_DEV_BASE_URL;

const FIREBASE_API = process.env.REACT_APP_FIREBASE_API;
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECREAT = process.env.REACT_APP_GOOGLE_CLIENT_SECREAT;
const GOOGLE_PROD_OAUTH_REDIRECT_URI =
  process.env.REACT_APP_PROD_GOOGLE_OAUTH_REDIRECT_URI;
const GOOGLE_DEV_OAUTH_REDIRECT_URI =
  process.env.REACT_APP_DEV_GOOGLE_OAUTH_REDIRECT_URI;
const NODE_ENV = process.env.NODE_ENV;
const PROD = "production";

const BASE_URL = NODE_ENV === PROD ? PROD_BASE_URL : DEV_BASE_URL;
const SOCKET_SERVER_URL =
  NODE_ENV === PROD
    ? process.env.REACT_APP_PROD_SOCKET_URL
    : process.env.REACT_APP_DEV_SOCKET_URL;

const GOOGLE_OAUTH_REDIRECT_URI =
  NODE_ENV === PROD
    ? GOOGLE_PROD_OAUTH_REDIRECT_URI
    : GOOGLE_DEV_OAUTH_REDIRECT_URI;

export {
  PROD_BASE_URL,
  DEV_BASE_URL,
  FIREBASE_API,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECREAT,
  GOOGLE_PROD_OAUTH_REDIRECT_URI,
  GOOGLE_DEV_OAUTH_REDIRECT_URI,
  NODE_ENV,
  BASE_URL,
  GOOGLE_OAUTH_REDIRECT_URI,
  SOCKET_SERVER_URL,
};
