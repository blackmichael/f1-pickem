// Demo mode authentication wrapper
// Provides mock authentication that bypasses AWS Cognito in demo mode

import { mockUser } from 'mocks/mockData';
import config from 'config';

// Create a mock Amplify context for demo mode
export const createDemoAuthContext = () => {
  return {
    route: 'authenticated',
    authStatus: 'authenticated',
    user: mockUser,
  };
};

// Hook to get the appropriate authenticator based on demo mode
export const useDemoAuthenticator = (realAuthenticator) => {
  if (config.isDemoMode) {
    return createDemoAuthContext();
  }
  return realAuthenticator;
};

// Demo mode authentication functions
export const getDemoUser = async () => {
  if (!config.isDemoMode) {
    throw new Error('getDemoUser should only be called in demo mode');
  }
  return mockUser;
};
