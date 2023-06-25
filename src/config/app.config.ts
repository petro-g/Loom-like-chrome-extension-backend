const env = process.env.NODE_ENV;

/**
 * Provides configurations related to whole server app
 */
export const APP_CONFIG = {
  host: process.env.API_HOST || '0.0.0.0',
  port: +(process.env.PORT || 3001),
  env,
  sendErrorStacks: process.env.SEND_RESPONSE_ERROR_STACK === 'true',
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  isProduction: env === 'production',
  isDevelopment: env === 'development',
  isDebug: env === 'debug',
  isTest: env === 'test',
};
