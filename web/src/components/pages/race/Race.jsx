import React, { useEffect, useState } from "react";
import { Page, Subtitle } from "components/common/Page";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import { getLeague, getRaceById } from "store/defaultStore";
import Results from "components/pages/race/Results";
import Picks from "components/pages/race/Picks";
import { AntTab, AntTabs, TabPanel } from "components/common/Tabs";
import { getRace, getPicks, getLeagueSummary } from "store/defaultStore";
import { useDispatch, useSelector } from "react-redux";
import { getLeagues } from "store/actions/leaguesActions";
import { getRaces } from "store/actions/racesActions";

export default function Race(props) {
  const dispatch = useDispatch();
  const leaguesState = useSelector((state) => state.leagues);
  const { leagueLoading, leagueError, leaguesMap } = leaguesState;
  const leagueInfo = leaguesMap.get(props.match.params.leagueId, {});

  const racesState = useSelector((state) => state.races);
  const { loading, error, raceById } = racesState;
  const raceData = raceById[props.match.params.raceId] || {};

  useEffect(() => {
    // only fetch leagues info if it's not available
    if (leaguesMap.size == 0) {
      dispatch(getLeagues());
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(getRaces(leagueInfo.season))
  }, [dispatch, leagueInfo.season]);

  const [tab, setTab] = useState(0);
  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Page>
      <Grid item xs={12}>
        <Typography variant="h3">{raceData.race_name}</Typography>
        <Subtitle>
          {leagueInfo.name} - {leagueInfo.season} Season
        </Subtitle>
      </Grid>
      <Grid item xs={12}>
        <AntTabs value={tab} onChange={handleTabChange} aria-label="views">
          <AntTab label="Picks" />
          <AntTab label="Results" />
        </AntTabs>
        <TabPanel value={tab} index={0}>
          <Picks
            leagueId={props.match.params.leagueId}
            raceId={props.match.params.raceId}
          />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <Results
            leagueId={props.match.params.leagueId}
            raceId={props.match.params.raceId}
          />
        </TabPanel>
      </Grid>
    </Page>
  );
}
