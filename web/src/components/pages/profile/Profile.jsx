import React from "react";
import {
  Button,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";
import { Page } from "components/common/Page";
import { Subtitle } from "components/common/Subtitle";
import { useAuth } from "hooks/useAuth";

export default function Profile() {
  const { user, signOut } = useAuth();

  return (
    <Page>
      <Grid item xs={12}>
        <Typography variant="h4">Profile</Typography>
        <Subtitle>View your account information</Subtitle>
      </Grid>

      <Divider variant="middle" style={{ borderBottom: "1px solid #e8e8e8", width: "100%", marginBottom: "20px" }} />

      <Grid container item xs={12} spacing={3} style={{ paddingBottom: "2em" }}>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="subtitle2" color="textSecondary" style={{ marginBottom: "0.5em" }}>
            User ID
          </Typography>
          <Typography variant="h6">
            {user?.username || "Not provided"}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="subtitle2" color="textSecondary" style={{ marginBottom: "0.5em" }}>
            Name
          </Typography>
          <Typography variant="h6">
            {user?.attributes?.name || "Not provided"}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="subtitle2" color="textSecondary" style={{ marginBottom: "0.5em" }}>
            Email
          </Typography>
          <Typography variant="h6">
            {user?.attributes?.email || "Not provided"}
          </Typography>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Button 
          onClick={signOut} 
          variant="outlined"
          color="primary"
        >
          Sign Out
        </Button>
      </Grid>
    </Page>
  );
}
