import React, { useEffect } from 'react';
import { Page } from 'components/common/Page';
import { Grid, Typography, Button } from '@material-ui/core';
import {
  Authenticator,
  ThemeProvider,
  useAuthenticator,
  useTheme,
} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router';
import config from 'config';

export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  let from = (location.state?.from?.pathname || "/") + location.state?.from?.search;
  
  // In demo mode, automatically redirect to the destination
  useEffect(() => {
    if (config.isDemoMode) {
      console.log("Demo mode: auto-authenticating and navigating to ", from);
      navigate(from, { replace: true });
    }
  }, [config.isDemoMode, navigate, from]);
  
  // Only use real authenticator in non-demo mode
  const { route } = config.isDemoMode ? { route: 'authenticated' } : useAuthenticator((context) => [context.route]);
  
  useEffect(() => {
    if (route === "authenticated" && !config.isDemoMode) {
      // navigate(-1);
      console.log("navigating back to ", from);
      navigate(from, { replace: true });
    }
  }, [route, navigate, from]);


  const { tokens } = useTheme();
  const theme = {
    name: 'Amplify Auth Theme',
    tokens: {
      colors: {
        font: {
          interactive: {
            value: tokens.colors.black.value,
          },
        },
        brand: {
          primary: {
            '10': tokens.colors.red['20'],
            '20': tokens.colors.red['20'],
            '40': tokens.colors.red['40'],
            '60': tokens.colors.red['60'],
            '80': tokens.colors.red['80'],
            '90': tokens.colors.red['90'],
            '100': tokens.colors.red['100'],
          },
        },
      },
    },
  };

  return (
    <Page>
      <Grid item xs={12}>
        <ThemeProvider theme={theme}>
          <Authenticator></Authenticator>
        </ThemeProvider>
      </Grid>
    </Page>
  );
}
