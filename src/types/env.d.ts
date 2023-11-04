declare namespace NodeJS {
  interface ProcessEnv {
    AUTH0_CLIENT_ID: string;
    AUTH0_CLIENT_SECRET: string
    AUTH0_ISSUER: string
    MONGODB_URI: string
  }
}