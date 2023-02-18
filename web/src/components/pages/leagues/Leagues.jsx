import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";
import { Page } from "components/common/Page";
import LinkButton from "components/common/LinkButton";
import { getLeagues } from "store/actions/leaguesActions";
import { getLeaguesResource } from "utils/resources";
import { Subtitle } from "components/common/Subtitle";
import { Loadable } from "components/common/Loadable";
import { useAuthenticator } from "@aws-amplify/ui-react";

export default function Leagues(props) {
  const dispatch = useDispatch();
  const { user } = useAuthenticator((context) => [context.user]);
  const leaguesState = useSelector((state) => state.leagues);
  const { loading, error, leaguesList } = leaguesState;

  useEffect(() => {
    if (user?.username) {
      dispatch(getLeagues(user?.username));
    }
  }, [dispatch]);

  let leaguesComponents = leaguesList
  .sort((a, b) => ("" + a.season + a.name).localeCompare(b.season + b.name))
  .reverse()
  .map((league) => (
    <LeagueSelector data={league} key={league.id} />
  ));

  const emptyListPlaceholder = (
    <Grid item xs={12} style={{paddingBottom: "2em", paddingTop: "1.5em"}}>
        <Typography variant="h6">Nothing to see here!</Typography>
    </Grid>
  );

  return (
    <Page>
      <Grid item xs={12}>
        <Typography variant="h4">Leagues</Typography>
        <Subtitle>Select a league or create a new one</Subtitle>
      </Grid>

      <Divider variant="middle" style={{ borderBottom: "1px solid #e8e8e8", width: "100%", marginBottom: "20px" }} />

      <Grid container item xs={12} direction="column">
        <Loadable loading={loading} error={error}>
          {leaguesComponents.length !== 0 ? leaguesComponents : emptyListPlaceholder}
        </Loadable>
      </Grid>

      <Grid item xs={12}>
        <LinkButton
          text="Create New League"
          to="/leagues/new"
          variant="outlined"
          color="primary"
        />
      </Grid>
    </Page>
  );
}

function LeagueSelector(props) {
  const data = props.data;

  return (
    <Grid item>
      <LinkButton
        text={data.name}
        subtext={data.season + " season"}
        to={getLeaguesResource(data.id)}
        variant="contained"
        color="primary"
        width="200px"
      />
    </Grid>
  )
}
