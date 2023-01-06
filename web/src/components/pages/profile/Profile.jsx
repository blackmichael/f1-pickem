import React from "react";
import {
  Button,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";
import { Page } from "components/common/Page";
import { useAuthenticator } from "@aws-amplify/ui-react";

export default function Profile() {
  const { user, signOut } = useAuthenticator((context) => [context.user]);

  console.log(user?.attributes);

  return (
    <Page>
      <Grid item xs={12}>
        <Typography variant="h4">Profile</Typography>
      </Grid>

      <Divider variant="middle" style={{ borderBottom: "1px solid #e8e8e8", width: "100%", marginBottom: "20px" }} />

      <Grid item xs={12} style={{paddingBottom: "1.5em"}}>
        <Typography variant="body1">
          Name
        </Typography>
        <Typography variant="body2">
          {user?.attributes?.name}
        </Typography>
        <Typography variant="body1">
          Email
        </Typography>
        <Typography variant="body2">
          {user?.attributes?.email}
        </Typography>
        <Typography variant="body1">
          ID
        </Typography>
        <Typography variant="body2">
          {user?.username}
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Button onClick={signOut} variant="contained">Sign Out</Button>
      </Grid>
    </Page>
  );
}
