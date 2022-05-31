import { CircularProgress, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { Subtitle } from './Subtitle';

export function Loadable(props) {
  const { loading, error, children } = props;

  if (loading) {
    return (
      <Grid container item xs={12} justify="center">
        <CircularProgress />
      </Grid>
    )
  } else if (error) {
    return (
      <Grid container item xs={12} justify="center">
          <Subtitle>Unable to load data. Please refresh the page.</Subtitle>
      </Grid>
    )
  } else {
    return children
  }
}