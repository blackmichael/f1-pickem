// Custom hook to handle authentication in both real and demo modes
import { useAuthenticator } from "@aws-amplify/ui-react";
import config from "config";
import { mockUser } from "mocks/mockData";

export const useAuth = () => {
  if (config.isDemoMode) {
    // Return mock auth data in demo mode
    return {
      user: mockUser,
      authStatus: 'authenticated',
      route: 'authenticated',
      signOut: () => {
        console.log('Demo mode: sign out (no action)');
      }
    };
  } else {
    // Return real authenticator in production mode
    return useAuthenticator((context) => [context.user, context.authStatus, context.route, context.signOut]);
  }
};
