// src/utils/index.ts

// It is critical that APP_SECRET is loaded from environment variables
// in your application's main entry file (e.g., src/app.ts) using dotenv.config().
// This file should NOT hardcode the secret.

// This utility function is safe because process.env will have been populated
// by dotenv.config() in app.ts before this module is imported.
export function getAppSecret(): string {
  if (!process.env.APP_SECRET) {
    // In a real production environment, this should be a fatal error
    // as it indicates a critical misconfiguration.
    // For development, you might throw an error or use a fallback for testing,
    // but the best practice is to ensure it's always set.
    console.error('CRITICAL ERROR: APP_SECRET is not defined in environment variables!');
    // Throwing an error here will cause the app to crash if APP_SECRET is missing,
    // which is desirable behavior to prevent security vulnerabilities.
    throw new Error('Application secret is missing. Please set APP_SECRET in your .env file.');
  }
  return process.env.APP_SECRET;
}

// You can add other utility functions here
export function someOtherUtilityFunction(value: string): string {
  return value.toUpperCase();
}