import { Container, Grid, Typography, withStyles } from "@material-ui/core";
import React from "react";
import useStyles from "utils/styles";

export function Page({ children }) {
  const classes = useStyles();

  return (
    <Container className={classes.content}>
      <Grid container spacing={3}>
        {children}
      </Grid>
    </Container>
  );
}

export const Subtitle = withStyles({
  root: {
    color: "grey",
    paddingLeft: "0.25em",
  },
})(Typography);
